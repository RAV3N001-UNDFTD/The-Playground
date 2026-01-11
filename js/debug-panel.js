// 调试面板控制逻辑

let debugPanel = null;
let isPanelVisible = false;
let keydownHandlerAttached = false;

// 初始化调试面板
function initDebugPanel() {
    debugPanel = document.getElementById('debugPanel');
    if (!debugPanel) {
        console.warn('调试面板元素未找到');
        return;
    }
    
    // 绑定关闭按钮
    const closeBtn = document.getElementById('closeDebugPanel');
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleDebugPanel);
    }
    
    // 绑定滑块事件
    setupSliders();
    
    // 绑定快捷键（确保只绑定一次）
    if (!keydownHandlerAttached) {
        document.addEventListener('keydown', handleKeyDown, true); // 使用捕获阶段
        keydownHandlerAttached = true;
        console.log('调试面板快捷键已绑定');
    }
}

// 处理键盘事件
function handleKeyDown(event) {
    // 如果焦点在输入框、文本区域或其他可输入元素上，不触发快捷键
    const target = event.target;
    const isInputElement = target.tagName === 'INPUT' || 
                          target.tagName === 'TEXTAREA' || 
                          target.isContentEditable;
    
    // 检测修饰键组合
    const hasCtrl = event.ctrlKey;
    const hasCmd = event.metaKey;
    const hasShift = event.shiftKey;
    const hasAlt = event.altKey;
    const modifierPressed = (hasCtrl || hasCmd) && hasShift;
    
    // 检测反引号键（多种方式兼容）
    const key = event.key;
    const keyCode = event.keyCode || event.which;
    const code = event.code;
    
    // 反引号的多种可能值
    const isBacktick = key === '`' || 
                      key === 'Backquote' || 
                      keyCode === 192 || 
                      code === 'Backquote' ||
                      (keyCode === 192 && !hasShift); // 某些键盘布局下
    
    // 检测 Ctrl/Cmd + Shift + `（反引号）
    if (modifierPressed && isBacktick) {
        event.preventDefault();
        event.stopPropagation();
        console.log('调试面板快捷键触发');
        toggleDebugPanel();
        return;
    }
    
    // 备用快捷键：Ctrl/Cmd + Shift + D（如果反引号不行）
    if (modifierPressed && (key.toLowerCase() === 'd' || keyCode === 68)) {
        event.preventDefault();
        event.stopPropagation();
        console.log('调试面板备用快捷键触发');
        toggleDebugPanel();
        return;
    }
    
    // ESC 键关闭面板
    if (event.key === 'Escape' && isPanelVisible) {
        event.preventDefault();
        toggleDebugPanel();
    }
}

// 切换调试面板显示/隐藏
function toggleDebugPanel() {
    // 如果debugPanel未初始化，尝试重新获取
    if (!debugPanel) {
        debugPanel = document.getElementById('debugPanel');
        if (!debugPanel) {
            console.error('调试面板元素未找到，无法切换。请检查HTML中是否存在id="debugPanel"的元素');
            console.log('当前页面URL:', window.location.href);
            console.log('尝试重新初始化...');
            ensureInit();
            return;
        }
    }
    
    isPanelVisible = !isPanelVisible;
    
    if (isPanelVisible) {
        debugPanel.classList.add('active');
        console.log('调试面板已打开');
    } else {
        debugPanel.classList.remove('active');
        console.log('调试面板已关闭');
    }
}

// 导出到全局，方便在控制台测试
window.toggleDebugPanel = toggleDebugPanel;
window.showDebugPanel = () => {
    if (!isPanelVisible) toggleDebugPanel();
};
window.hideDebugPanel = () => {
    if (isPanelVisible) toggleDebugPanel();
};

// 将 hex 颜色转换为 RGB 数组
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [254, 176, 254];
}

// 将 RGB 数组转换为 hex 颜色
function rgbToHex(rgb) {
    return '#' + rgb.map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// 设置滑块控件
function setupSliders() {
    // Hero Shader 控制
    if (!window.heroShaderParams) {
        window.heroShaderParams = {
            colorStart: [254, 176, 254],
            colorEnd: [93, 247, 164],
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
    }
    
    // 渐变起始色
    const heroColorStart = document.getElementById('heroColorStart');
    if (heroColorStart) {
        heroColorStart.value = rgbToHex(window.heroShaderParams.colorStart);
        heroColorStart.addEventListener('input', (e) => {
            window.heroShaderParams.colorStart = hexToRgb(e.target.value);
        });
    }
    
    // 渐变结束色
    const heroColorEnd = document.getElementById('heroColorEnd');
    if (heroColorEnd) {
        heroColorEnd.value = rgbToHex(window.heroShaderParams.colorEnd);
        heroColorEnd.addEventListener('input', (e) => {
            window.heroShaderParams.colorEnd = hexToRgb(e.target.value);
        });
    }
    
    // 渐变角度
    const heroGradientAngle = document.getElementById('heroGradientAngle');
    const heroGradientAngleValue = document.getElementById('heroGradientAngleValue');
    if (heroGradientAngle && heroGradientAngleValue) {
        heroGradientAngle.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            heroGradientAngleValue.textContent = value;
            window.heroShaderParams.gradientAngle = value;
        });
    }
    
    // 光晕强度
    const heroGlowIntensity = document.getElementById('heroGlowIntensity');
    const heroGlowIntensityValue = document.getElementById('heroGlowIntensityValue');
    if (heroGlowIntensity && heroGlowIntensityValue) {
        heroGlowIntensity.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            heroGlowIntensityValue.textContent = value.toFixed(1);
            window.heroShaderParams.glowIntensity = value;
        });
    }
    
    // 光晕速度
    const heroGlowSpeed = document.getElementById('heroGlowSpeed');
    const heroGlowSpeedValue = document.getElementById('heroGlowSpeedValue');
    if (heroGlowSpeed && heroGlowSpeedValue) {
        heroGlowSpeed.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            heroGlowSpeedValue.textContent = value.toFixed(1);
            window.heroShaderParams.glowSpeed = value;
        });
    }
    
    // 光晕数量
    const heroGlowCount = document.getElementById('heroGlowCount');
    const heroGlowCountValue = document.getElementById('heroGlowCountValue');
    if (heroGlowCount && heroGlowCountValue) {
        heroGlowCount.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            heroGlowCountValue.textContent = value;
            window.heroShaderParams.glowCount = value;
        });
    }
    
    // 噪点强度
    const heroNoiseIntensity = document.getElementById('heroNoiseIntensity');
    const heroNoiseIntensityValue = document.getElementById('heroNoiseIntensityValue');
    if (heroNoiseIntensity && heroNoiseIntensityValue) {
        heroNoiseIntensity.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            heroNoiseIntensityValue.textContent = value.toFixed(2);
            window.heroShaderParams.noiseIntensity = value;
        });
    }
    
    // 噪点缩放
    const heroNoiseScale = document.getElementById('heroNoiseScale');
    const heroNoiseScaleValue = document.getElementById('heroNoiseScaleValue');
    if (heroNoiseScale && heroNoiseScaleValue) {
        heroNoiseScale.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            heroNoiseScaleValue.textContent = value.toFixed(1);
            window.heroShaderParams.noiseScale = value;
        });
    }
    
    // 流动速度
    const heroFlowSpeed = document.getElementById('heroFlowSpeed');
    const heroFlowSpeedValue = document.getElementById('heroFlowSpeedValue');
    if (heroFlowSpeed && heroFlowSpeedValue) {
        heroFlowSpeed.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            heroFlowSpeedValue.textContent = value.toFixed(1);
            window.heroShaderParams.flowSpeed = value;
        });
    }
    
    // 鼠标高亮强度
    const heroMouseHighlightIntensity = document.getElementById('heroMouseHighlightIntensity');
    const heroMouseHighlightIntensityValue = document.getElementById('heroMouseHighlightIntensityValue');
    if (heroMouseHighlightIntensity && heroMouseHighlightIntensityValue) {
        heroMouseHighlightIntensity.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            heroMouseHighlightIntensityValue.textContent = value.toFixed(2);
            window.heroShaderParams.mouseHighlightIntensity = value;
        });
    }
    
    // 鼠标高亮半径
    const heroMouseHighlightRadius = document.getElementById('heroMouseHighlightRadius');
    const heroMouseHighlightRadiusValue = document.getElementById('heroMouseHighlightRadiusValue');
    if (heroMouseHighlightRadius && heroMouseHighlightRadiusValue) {
        heroMouseHighlightRadius.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            heroMouseHighlightRadiusValue.textContent = value.toFixed(2);
            window.heroShaderParams.mouseHighlightRadius = value;
        });
    }
    
    // 保存按钮
    const heroShaderSaveBtn = document.getElementById('heroShaderSaveBtn');
    if (heroShaderSaveBtn) {
        heroShaderSaveBtn.addEventListener('click', () => {
            if (window.saveHeroShaderConfig) {
                window.saveHeroShaderConfig();
                // 显示保存成功提示
                const originalText = heroShaderSaveBtn.textContent;
                heroShaderSaveBtn.textContent = '已保存！';
                heroShaderSaveBtn.style.opacity = '0.7';
                setTimeout(() => {
                    heroShaderSaveBtn.textContent = originalText;
                    heroShaderSaveBtn.style.opacity = '1';
                }, 1500);
            }
        });
    }
    
    // 重置按钮
    const heroShaderResetBtn = document.getElementById('heroShaderResetBtn');
    if (heroShaderResetBtn) {
        heroShaderResetBtn.addEventListener('click', () => {
            if (window.resetHeroShaderConfig) {
                window.resetHeroShaderConfig();
                syncHeroShaderValues();
                // 显示重置成功提示
                const originalText = heroShaderResetBtn.textContent;
                heroShaderResetBtn.textContent = '已重置！';
                heroShaderResetBtn.style.opacity = '0.7';
                setTimeout(() => {
                    heroShaderResetBtn.textContent = originalText;
                    heroShaderResetBtn.style.opacity = '1';
                }, 1500);
            }
        });
    }
}

// 同步 Hero Shader 参数值
function syncHeroShaderValues() {
    if (!window.heroShaderParams) return;
    
    const params = window.heroShaderParams;
    
    // 颜色选择器
    const heroColorStart = document.getElementById('heroColorStart');
    if (heroColorStart) {
        heroColorStart.value = rgbToHex(params.colorStart);
    }
    
    const heroColorEnd = document.getElementById('heroColorEnd');
    if (heroColorEnd) {
        heroColorEnd.value = rgbToHex(params.colorEnd);
    }
    
    // 渐变角度
    const heroGradientAngle = document.getElementById('heroGradientAngle');
    const heroGradientAngleValue = document.getElementById('heroGradientAngleValue');
    if (heroGradientAngle && heroGradientAngleValue) {
        heroGradientAngle.value = params.gradientAngle;
        heroGradientAngleValue.textContent = params.gradientAngle;
    }
    
    // 光晕强度
    const heroGlowIntensity = document.getElementById('heroGlowIntensity');
    const heroGlowIntensityValue = document.getElementById('heroGlowIntensityValue');
    if (heroGlowIntensity && heroGlowIntensityValue) {
        heroGlowIntensity.value = params.glowIntensity;
        heroGlowIntensityValue.textContent = params.glowIntensity.toFixed(1);
    }
    
    // 光晕速度
    const heroGlowSpeed = document.getElementById('heroGlowSpeed');
    const heroGlowSpeedValue = document.getElementById('heroGlowSpeedValue');
    if (heroGlowSpeed && heroGlowSpeedValue) {
        heroGlowSpeed.value = params.glowSpeed;
        heroGlowSpeedValue.textContent = params.glowSpeed.toFixed(1);
    }
    
    // 光晕数量
    const heroGlowCount = document.getElementById('heroGlowCount');
    const heroGlowCountValue = document.getElementById('heroGlowCountValue');
    if (heroGlowCount && heroGlowCountValue) {
        heroGlowCount.value = params.glowCount;
        heroGlowCountValue.textContent = params.glowCount;
    }
    
    // 噪点强度
    const heroNoiseIntensity = document.getElementById('heroNoiseIntensity');
    const heroNoiseIntensityValue = document.getElementById('heroNoiseIntensityValue');
    if (heroNoiseIntensity && heroNoiseIntensityValue) {
        heroNoiseIntensity.value = params.noiseIntensity;
        heroNoiseIntensityValue.textContent = params.noiseIntensity.toFixed(2);
    }
    
    // 噪点缩放
    const heroNoiseScale = document.getElementById('heroNoiseScale');
    const heroNoiseScaleValue = document.getElementById('heroNoiseScaleValue');
    if (heroNoiseScale && heroNoiseScaleValue) {
        heroNoiseScale.value = params.noiseScale;
        heroNoiseScaleValue.textContent = params.noiseScale.toFixed(1);
    }
    
    // 流动速度
    const heroFlowSpeed = document.getElementById('heroFlowSpeed');
    const heroFlowSpeedValue = document.getElementById('heroFlowSpeedValue');
    if (heroFlowSpeed && heroFlowSpeedValue) {
        heroFlowSpeed.value = params.flowSpeed;
        heroFlowSpeedValue.textContent = params.flowSpeed.toFixed(1);
    }
    
    // 鼠标高亮强度
    const heroMouseHighlightIntensity = document.getElementById('heroMouseHighlightIntensity');
    const heroMouseHighlightIntensityValue = document.getElementById('heroMouseHighlightIntensityValue');
    if (heroMouseHighlightIntensity && heroMouseHighlightIntensityValue) {
        heroMouseHighlightIntensity.value = params.mouseHighlightIntensity;
        heroMouseHighlightIntensityValue.textContent = params.mouseHighlightIntensity.toFixed(2);
    }
    
    // 鼠标高亮半径
    const heroMouseHighlightRadius = document.getElementById('heroMouseHighlightRadius');
    const heroMouseHighlightRadiusValue = document.getElementById('heroMouseHighlightRadiusValue');
    if (heroMouseHighlightRadius && heroMouseHighlightRadiusValue) {
        heroMouseHighlightRadius.value = params.mouseHighlightRadius;
        heroMouseHighlightRadiusValue.textContent = params.mouseHighlightRadius.toFixed(2);
    }
}

// 确保元素存在的初始化函数
function ensureInit() {
    const panel = document.getElementById('debugPanel');
    if (!panel) {
        console.warn('调试面板元素尚未加载，100ms后重试...');
        setTimeout(ensureInit, 100);
        return;
    }
    
    // 元素存在，执行初始化
    initDebugPanel();
    syncHeroShaderValues();
    console.log('调试面板初始化完成');
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // 等待DOM和脚本完全加载
        setTimeout(ensureInit, 200);
    });
} else {
    // DOM已经加载，直接初始化
    setTimeout(ensureInit, 200);
}

// 备用初始化：如果上面的方法失败，在window.onload时再试一次
window.addEventListener('load', () => {
    if (!debugPanel) {
        console.log('使用window.onload备用初始化');
        ensureInit();
    }
});



