// Hero Section Shader 背景系统
// 使用原生 WebGL 实现高性能 shader 背景

let gl = null;
let shaderProgram = null;
let canvas = null;
let heroAnimationId = null; // 重命名以避免与 background.js 的 animationId 冲突
let startTime = Date.now();
let positionBuffer = null;

// 参数配置（默认值）- 确保在脚本加载时立即初始化
if (!window.heroShaderParams) {
    window.heroShaderParams = {
        // 渐变
        colorStart: [246, 69, 69],      // #F64545
        colorEnd: [225, 246, 100],      // #E1F664
        gradientAngle: 36,               // 度
        
        // 光晕
        glowIntensity: 0.5,
        glowSpeed: 0.5,
        glowCount: 3,
        
        // 噪点
        noiseIntensity: 0.3,
        noiseScale: 2.0,
        
        // 动画
        flowSpeed: 1.0,
        
        // 鼠标交互
        mouseHighlightIntensity: 0.5,
        mouseHighlightRadius: 0.3
    };
    console.log('Hero Shader 参数已初始化:', window.heroShaderParams);
}

// 鼠标位置（归一化坐标 -1 到 1）
let mousePos = { x: 0, y: 0 };
let mouseActive = false;

// Vertex Shader 源码
const vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_uv = (a_position + 1.0) * 0.5;
    }
`;

// Fragment Shader 源码
const fragmentShaderSource = `
    precision mediump float;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_mouseActive;
    
    // 渐变参数
    uniform vec3 u_colorStart;
    uniform vec3 u_colorEnd;
    uniform float u_gradientAngle;
    
    // 光晕参数
    uniform float u_glowIntensity;
    uniform float u_glowSpeed;
    uniform float u_glowCount;
    
    // 噪点参数
    uniform float u_noiseIntensity;
    uniform float u_noiseScale;
    
    // 动画参数
    uniform float u_flowSpeed;
    
    // 鼠标交互参数
    uniform float u_mouseHighlightIntensity;
    uniform float u_mouseHighlightRadius;
    
    varying vec2 v_uv;
    
    // 简单的噪点函数
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    // 2D 噪点（简化版 Perlin 噪点）
    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // 分形噪点
    float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 0.0;
        
        for (int i = 0; i < 4; i++) {
            value += amplitude * noise(st);
            st *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }
    
    void main() {
        vec2 uv = v_uv;
        vec2 st = uv * u_noiseScale;
        
        // 计算渐变方向（36度转换为弧度）
        float angle = radians(u_gradientAngle);
        vec2 gradientDir = vec2(cos(angle), sin(angle));
        
        // 计算渐变因子（基于 UV 坐标在渐变方向上的投影）
        float gradientFactor = dot(uv - 0.5, gradientDir) + 0.5;
        gradientFactor = clamp(gradientFactor, 0.0, 1.0);
        
        // 混合起始色和结束色
        vec3 gradientColor = mix(u_colorStart, u_colorEnd, gradientFactor);
        
        // 计算光晕效果（多个径向渐变叠加）
        // 注意：GLSL 不允许在循环条件中使用 uniform 变量，所以展开循环
        vec3 glowColor = vec3(0.0);
        float time = u_time * u_flowSpeed;
        
        // 使用固定数量的光晕（最多6个），根据 u_glowCount 决定是否启用
        float glowCount = clamp(u_glowCount, 1.0, 6.0);
        
        // 光晕 0
        if (glowCount > 0.5) {
            float i = 0.0;
            vec2 glowCenter = vec2(
                0.5 + sin(time * u_glowSpeed + i * 2.0) * 0.3,
                0.5 + cos(time * u_glowSpeed * 0.7 + i * 1.5) * 0.3
            );
            float dist = distance(uv, glowCenter);
            float glow = 1.0 / (1.0 + dist * 3.0);
            glow = pow(glow, 2.0);
            vec3 glowTint = mix(u_colorStart, u_colorEnd, i / 6.0);
            glowColor += glow * glowTint * u_glowIntensity;
        }
        
        // 光晕 1
        if (glowCount > 1.5) {
            float i = 1.0;
            vec2 glowCenter = vec2(
                0.5 + sin(time * u_glowSpeed + i * 2.0) * 0.3,
                0.5 + cos(time * u_glowSpeed * 0.7 + i * 1.5) * 0.3
            );
            float dist = distance(uv, glowCenter);
            float glow = 1.0 / (1.0 + dist * 3.0);
            glow = pow(glow, 2.0);
            vec3 glowTint = mix(u_colorStart, u_colorEnd, i / 6.0);
            glowColor += glow * glowTint * u_glowIntensity;
        }
        
        // 光晕 2
        if (glowCount > 2.5) {
            float i = 2.0;
            vec2 glowCenter = vec2(
                0.5 + sin(time * u_glowSpeed + i * 2.0) * 0.3,
                0.5 + cos(time * u_glowSpeed * 0.7 + i * 1.5) * 0.3
            );
            float dist = distance(uv, glowCenter);
            float glow = 1.0 / (1.0 + dist * 3.0);
            glow = pow(glow, 2.0);
            vec3 glowTint = mix(u_colorStart, u_colorEnd, i / 6.0);
            glowColor += glow * glowTint * u_glowIntensity;
        }
        
        // 光晕 3
        if (glowCount > 3.5) {
            float i = 3.0;
            vec2 glowCenter = vec2(
                0.5 + sin(time * u_glowSpeed + i * 2.0) * 0.3,
                0.5 + cos(time * u_glowSpeed * 0.7 + i * 1.5) * 0.3
            );
            float dist = distance(uv, glowCenter);
            float glow = 1.0 / (1.0 + dist * 3.0);
            glow = pow(glow, 2.0);
            vec3 glowTint = mix(u_colorStart, u_colorEnd, i / 6.0);
            glowColor += glow * glowTint * u_glowIntensity;
        }
        
        // 光晕 4
        if (glowCount > 4.5) {
            float i = 4.0;
            vec2 glowCenter = vec2(
                0.5 + sin(time * u_glowSpeed + i * 2.0) * 0.3,
                0.5 + cos(time * u_glowSpeed * 0.7 + i * 1.5) * 0.3
            );
            float dist = distance(uv, glowCenter);
            float glow = 1.0 / (1.0 + dist * 3.0);
            glow = pow(glow, 2.0);
            vec3 glowTint = mix(u_colorStart, u_colorEnd, i / 6.0);
            glowColor += glow * glowTint * u_glowIntensity;
        }
        
        // 光晕 5
        if (glowCount > 5.5) {
            float i = 5.0;
            vec2 glowCenter = vec2(
                0.5 + sin(time * u_glowSpeed + i * 2.0) * 0.3,
                0.5 + cos(time * u_glowSpeed * 0.7 + i * 1.5) * 0.3
            );
            float dist = distance(uv, glowCenter);
            float glow = 1.0 / (1.0 + dist * 3.0);
            glow = pow(glow, 2.0);
            vec3 glowTint = mix(u_colorStart, u_colorEnd, i / 6.0);
            glowColor += glow * glowTint * u_glowIntensity;
        }
        
        // 叠加光晕到渐变
        vec3 baseColor = gradientColor + glowColor;
        
        // 生成噪点纹理
        float noiseValue = fbm(st + time * 0.1);
        noiseValue = noiseValue * 2.0 - 1.0; // 转换为 -1 到 1
        vec3 noiseColor = baseColor * (1.0 + noiseValue * u_noiseIntensity);
        
        // 鼠标高亮效果
        vec3 finalColor = noiseColor;
        if (u_mouseActive > 0.5) {
            float mouseDist = distance(uv, u_mouse);
            float highlight = 1.0 / (1.0 + mouseDist / u_mouseHighlightRadius);
            highlight = pow(highlight, 2.0);
            
            // 增强鼠标区域的亮度和饱和度
            vec3 highlightColor = mix(finalColor, u_colorStart, highlight * u_mouseHighlightIntensity * 0.3);
            finalColor = mix(finalColor, highlightColor, highlight * u_mouseHighlightIntensity);
        }
        
        // 确保颜色值在有效范围内
        finalColor = clamp(finalColor, 0.0, 255.0);
        
        // 转换为 0-1 范围（因为输入是 0-255）
        gl_FragColor = vec4(finalColor / 255.0, 1.0);
    }
`;

// 创建并编译 shader
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const errorLog = gl.getShaderInfoLog(shader);
        console.error('Shader 编译错误:', errorLog);
        gl.deleteShader(shader);
        return null;
    }
    
    return shader;
}

// 创建 shader program
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const errorLog = gl.getProgramInfoLog(program);
        console.error('Program 链接错误:', errorLog);
        gl.deleteProgram(program);
        return null;
    }
    
    return program;
}

// 初始化 WebGL
function initShader() {
    canvas = document.getElementById('hero-shader-canvas');
    console.log('[Hero Shader] Canvas 查找结果:', canvas ? '找到' : '未找到', canvas);
    if (!canvas) {
        console.error('[Hero Shader] Canvas 元素未找到！请检查 HTML 中是否存在 id="hero-shader-canvas" 的元素');
        return false;
    }
    
    // 尝试使用 WebGL 2.0，回退到 WebGL 1.0
    gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const contextType = canvas.getContext('webgl2') ? 'WebGL 2.0' : (gl ? 'WebGL 1.0' : 'none');
    console.log('[Hero Shader] WebGL Context:', contextType, gl ? '成功' : '失败');
    if (!gl) {
        console.error('[Hero Shader] WebGL 不支持！浏览器可能不支持 WebGL 或上下文创建失败');
        return false;
    }
    
    // 创建 shader
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
        return false;
    }
    
    // 创建 program
    shaderProgram = createProgram(gl, vertexShader, fragmentShader);
    if (!shaderProgram) {
        return false;
    }
    
    // 创建全屏四边形
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1
    ]), gl.STATIC_DRAW);
    
    // 设置视口和尺寸
    resizeCanvas();
    console.log('[Hero Shader] Canvas 尺寸:', canvas.width, 'x', canvas.height);
    
    // 初始化鼠标交互
    initMouseInteraction();
    
    // 加载保存的配置
    loadConfig();
    console.log('[Hero Shader] 参数配置:', window.heroShaderParams);
    
    // 开始动画
    console.log('[Hero Shader] 开始动画循环...');
    animate();
    
    console.log('[Hero Shader] 初始化完成！');
    
    return true;
}

// 调整 canvas 尺寸
function resizeCanvas() {
    if (!canvas || !gl) {
        return;
    }
    
    const heroSection = canvas.parentElement;
    if (!heroSection) {
        return;
    }
    
    const rect = heroSection.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    gl.viewport(0, 0, canvas.width, canvas.height);
}

// 初始化鼠标交互
function initMouseInteraction() {
    if (!canvas) return;
    
    const heroSection = canvas.parentElement;
    if (!heroSection) return;
    
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        // 转换为 0-1 范围的 UV 坐标（与 shader 中的 uv 一致）
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height; // Y 轴翻转
        
        mousePos.x = x;
        mousePos.y = y;
        mouseActive = true;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        mouseActive = false;
    });
    
    // 触摸支持
    heroSection.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = heroSection.getBoundingClientRect();
            // 转换为 0-1 范围的 UV 坐标（与 shader 中的 uv 一致）
            const x = (touch.clientX - rect.left) / rect.width;
            const y = 1.0 - (touch.clientY - rect.top) / rect.height; // Y 轴翻转
            
            mousePos.x = x;
            mousePos.y = y;
            mouseActive = true;
        }
    }, { passive: true });
    
    heroSection.addEventListener('touchend', () => {
        mouseActive = false;
    });
}

// 更新 uniform 变量
function updateUniforms() {
    if (!gl || !shaderProgram) return false;
    
    const params = window.heroShaderParams;
    if (!params) {
        console.error('heroShaderParams 未定义，使用默认值');
        // 初始化默认参数
        window.heroShaderParams = {
            colorStart: [246, 69, 69],   // #F64545
            colorEnd: [225, 246, 100],   // #E1F664
            gradientAngle: 36,
            glowIntensity: 0.5,
            glowSpeed: 0.5,
            glowCount: 3,
            noiseIntensity: 0.3,
            noiseScale: 2.0,
            flowSpeed: 1.0,
            mouseHighlightIntensity: 0.5,
            mouseHighlightRadius: 0.3
        };
        return updateUniforms(); // 重试
    }
    const time = (Date.now() - startTime) / 1000.0;
    
    gl.useProgram(shaderProgram);
    
    // 获取 uniform 位置
    const uniforms = {
        u_time: gl.getUniformLocation(shaderProgram, 'u_time'),
        u_resolution: gl.getUniformLocation(shaderProgram, 'u_resolution'),
        u_mouse: gl.getUniformLocation(shaderProgram, 'u_mouse'),
        u_mouseActive: gl.getUniformLocation(shaderProgram, 'u_mouseActive'),
        u_colorStart: gl.getUniformLocation(shaderProgram, 'u_colorStart'),
        u_colorEnd: gl.getUniformLocation(shaderProgram, 'u_colorEnd'),
        u_gradientAngle: gl.getUniformLocation(shaderProgram, 'u_gradientAngle'),
        u_glowIntensity: gl.getUniformLocation(shaderProgram, 'u_glowIntensity'),
        u_glowSpeed: gl.getUniformLocation(shaderProgram, 'u_glowSpeed'),
        u_glowCount: gl.getUniformLocation(shaderProgram, 'u_glowCount'),
        u_noiseIntensity: gl.getUniformLocation(shaderProgram, 'u_noiseIntensity'),
        u_noiseScale: gl.getUniformLocation(shaderProgram, 'u_noiseScale'),
        u_flowSpeed: gl.getUniformLocation(shaderProgram, 'u_flowSpeed'),
        u_mouseHighlightIntensity: gl.getUniformLocation(shaderProgram, 'u_mouseHighlightIntensity'),
        u_mouseHighlightRadius: gl.getUniformLocation(shaderProgram, 'u_mouseHighlightRadius')
    };
    
    // 设置 uniform 值
    gl.uniform1f(uniforms.u_time, time);
    gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.u_mouse, mousePos.x, mousePos.y);
    gl.uniform1f(uniforms.u_mouseActive, mouseActive ? 1.0 : 0.0);
    gl.uniform3f(uniforms.u_colorStart, params.colorStart[0], params.colorStart[1], params.colorStart[2]);
    gl.uniform3f(uniforms.u_colorEnd, params.colorEnd[0], params.colorEnd[1], params.colorEnd[2]);
    gl.uniform1f(uniforms.u_gradientAngle, params.gradientAngle);
    gl.uniform1f(uniforms.u_glowIntensity, params.glowIntensity);
    gl.uniform1f(uniforms.u_glowSpeed, params.glowSpeed);
    gl.uniform1f(uniforms.u_glowCount, params.glowCount);
    gl.uniform1f(uniforms.u_noiseIntensity, params.noiseIntensity);
    gl.uniform1f(uniforms.u_noiseScale, params.noiseScale);
    gl.uniform1f(uniforms.u_flowSpeed, params.flowSpeed);
    gl.uniform1f(uniforms.u_mouseHighlightIntensity, params.mouseHighlightIntensity);
    gl.uniform1f(uniforms.u_mouseHighlightRadius, params.mouseHighlightRadius);
    
    return true;
}

// 渲染循环
function animate() {
    if (!gl || !shaderProgram || !positionBuffer) {
        return;
    }
    
    heroAnimationId = requestAnimationFrame(animate);
    
    // 更新 uniform
    updateUniforms();
    
    // 设置 attribute
    const positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    if (positionLocation === -1) {
        return;
    }
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // 绘制
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

// 保存配置到 localStorage
function saveConfig() {
    try {
        localStorage.setItem('heroShaderConfig', JSON.stringify(window.heroShaderParams));
        console.log('Hero Shader 配置已保存');
    } catch (e) {
        console.error('保存配置失败:', e);
    }
}

// 从 localStorage 加载配置
function loadConfig() {
    try {
        const saved = localStorage.getItem('heroShaderConfig');
        if (saved) {
            const config = JSON.parse(saved);
            Object.assign(window.heroShaderParams, config);
            console.log('Hero Shader 配置已加载');
        }
    } catch (e) {
        console.error('加载配置失败:', e);
    }
}

// 重置为默认值
function resetToDefaults() {
    window.heroShaderParams = {
        colorStart: [246, 69, 69],       // #F64545
        colorEnd: [225, 246, 100],       // #E1F664
        gradientAngle: 36,
        glowIntensity: 0.5,
        glowSpeed: 0.5,
        glowCount: 3,
        noiseIntensity: 0.3,
        noiseScale: 2.0,
        flowSpeed: 1.0,
        mouseHighlightIntensity: 0.5,
        mouseHighlightRadius: 0.3
    };
    saveConfig();
}

// 导出函数供外部调用
window.saveHeroShaderConfig = saveConfig;
window.loadHeroShaderConfig = loadConfig;
window.resetHeroShaderConfig = resetToDefaults;

// 响应窗口大小变化
let resizeObserver = null;
function setupResizeObserver() {
    if (!canvas) return;
    
    const heroSection = canvas.parentElement;
    if (!heroSection) return;
    
    if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });
        resizeObserver.observe(heroSection);
    } else {
        // 回退方案
        window.addEventListener('resize', () => {
            resizeCanvas();
        });
    }
}

// 清理资源
function disposeShader() {
    if (heroAnimationId) {
        cancelAnimationFrame(heroAnimationId);
        heroAnimationId = null;
    }
    
    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }
    
    if (gl && shaderProgram) {
        gl.deleteProgram(shaderProgram);
        shaderProgram = null;
    }
    
    gl = null;
    canvas = null;
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (initShader()) {
                setupResizeObserver();
            }
        }, 100);
    });
} else {
    setTimeout(() => {
        if (initShader()) {
            setupResizeObserver();
        }
    }, 100);
}

// 页面卸载时清理
window.addEventListener('beforeunload', disposeShader);
