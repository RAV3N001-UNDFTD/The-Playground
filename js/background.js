// Three.js 背景动画 - 几何图形风格
let scene, camera, renderer;
let geometries = [];
let lines = [];
let animationId;

// 鼠标交互相关变量
let mousePosition = new THREE.Vector3(0, 0, 0);
let mouseTarget = new THREE.Vector3(0, 0, 0);
let mouse = new THREE.Vector2();

// 力场参数（可动态调整）
let forceParams = {
    radius: 15,        // 力场影响半径
    strength: 2,       // 推力强度
    maxDeformation: 0.3, // 最大形变比例
    smoothFactor: 0.1   // 平滑插值因子
};

// 导出参数对象供调试面板使用
window.forceParams = forceParams;

// 初始化场景
function initBackground() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    
    // 创建场景
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    
    // 创建相机
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // 创建几何图形
    createGeometries();
    
    // 创建线条网络
    createLineNetwork();
    
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // 添加点光源
    const pointLight1 = new THREE.PointLight(0x4a90e2, 1, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xe24a90, 1, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);
    
    // 初始化鼠标交互
    initMouseInteraction();
    
    // 开始动画
    animate();
    
    // 响应窗口大小变化
    window.addEventListener('resize', onWindowResize);
}

// 创建几何图形
function createGeometries() {
    const colors = [0x4a90e2, 0xe24a90, 0x90e24a, 0xe2904a, 0x904ae2];
    
    // 创建多个多面体
    const geometryConfigs = [
        { type: 'octahedron', size: 2, position: [-15, 10, -10] },
        { type: 'icosahedron', size: 1.5, position: [15, -10, -15] },
        { type: 'tetrahedron', size: 1.8, position: [0, 15, -5] },
        { type: 'dodecahedron', size: 1.2, position: [-20, -15, -20] },
        { type: 'octahedron', size: 1.5, position: [20, 5, -12] },
        { type: 'icosahedron', size: 1.3, position: [-10, -20, -8] }
    ];
    
    geometryConfigs.forEach((geo, index) => {
        let geometry;
        switch(geo.type) {
            case 'octahedron':
                geometry = new THREE.OctahedronGeometry(geo.size);
                break;
            case 'icosahedron':
                geometry = new THREE.IcosahedronGeometry(geo.size);
                break;
            case 'tetrahedron':
                geometry = new THREE.TetrahedronGeometry(geo.size);
                break;
            case 'dodecahedron':
                geometry = new THREE.DodecahedronGeometry(geo.size);
                break;
            default:
                geometry = new THREE.OctahedronGeometry(geo.size);
        }
        
        const material = new THREE.MeshPhongMaterial({
            color: colors[index % colors.length],
            transparent: true,
            opacity: 0.7,
            wireframe: false,
            shininess: 100
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(geo.position[0], geo.position[1], geo.position[2]);
        
        // 保存原始位置用于力场计算
        const originalPosition = new THREE.Vector3(
            geo.position[0],
            geo.position[1],
            geo.position[2]
        );
        
        // 添加随机旋转速度
        mesh.userData = {
            originalPosition: originalPosition,
            targetPosition: originalPosition.clone(),
            currentPosition: originalPosition.clone(),
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            scaleSpeed: 0.001,
            baseScale: 1,
            scaleDirection: Math.random() > 0.5 ? 1 : -1,
            forceScale: 1 // 力场影响的缩放
        };
        
        scene.add(mesh);
        geometries.push(mesh);
    });
}

// 创建线条网络
function createLineNetwork() {
    const points = [];
    const pointCount = 20;
    
    // 生成随机点
    for (let i = 0; i < pointCount; i++) {
        points.push(new THREE.Vector3(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 30 - 10
        ));
    }
    
    // 创建线条连接
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.3
    });
    
    // 连接附近的点
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const distance = points[i].distanceTo(points[j]);
            if (distance < 15) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    points[i],
                    points[j]
                ]);
                const line = new THREE.Line(geometry, lineMaterial);
                scene.add(line);
                lines.push(line);
            }
        }
    }
    
    // 保存点用于动画
    lines.userData = { points: points };
}

// 初始化鼠标交互
function initMouseInteraction() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    
    // 鼠标移动事件
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    
    // 触摸事件支持（移动端）
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
}

// 鼠标移动事件处理
function onMouseMove(event) {
    updateMousePosition(event.clientX, event.clientY);
}

// 触摸移动事件处理
function onTouchMove(event) {
    if (event.touches.length > 0) {
        const touch = event.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
    }
}

// 鼠标离开事件处理
function onMouseLeave() {
    // 重置鼠标位置到中心，让几何图形恢复
    mouseTarget.set(0, 0, 0);
}

// 更新鼠标位置（转换为3D坐标）
function updateMousePosition(clientX, clientY) {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    // 转换为归一化设备坐标 (-1 到 1)
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    
    // 将2D鼠标坐标转换为3D空间坐标
    // 使用相机的视野和位置来计算3D坐标
    // 假设鼠标在z=0的平面上（与几何图形大致相同的深度）
    const fov = camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * Math.abs(camera.position.z);
    const width = height * camera.aspect;
    
    // 计算3D空间中的位置（在z=0平面上）
    const x = (mouse.x * width) / 2;
    const y = (mouse.y * height) / 2;
    const z = 0; // 与几何图形大致相同的深度
    
    const pos = new THREE.Vector3(x, y, z);
    
    // 平滑更新鼠标目标位置
    mouseTarget.lerp(pos, 0.2);
}

// 计算力场对几何图形的影响
function calculateForceField(mesh) {
    if (!mesh.userData || !mesh.userData.originalPosition) return;
    
    const originalPos = mesh.userData.originalPosition;
    const distance = originalPos.distanceTo(mouseTarget);
    
    // 如果距离超出力场范围，恢复原始状态
    if (distance > forceParams.radius) {
        mesh.userData.targetPosition.copy(originalPos);
        mesh.userData.forceScale = 1;
        return;
    }
    
    // 计算力场强度（使用反比例衰减）
    const forceIntensity = Math.max(0, 1 - distance / forceParams.radius);
    const forcePower = Math.pow(forceIntensity, 2); // 平方衰减，更平滑
    
    // 计算推力方向（从鼠标指向几何图形）
    const direction = new THREE.Vector3()
        .subVectors(originalPos, mouseTarget)
        .normalize();
    
    // 计算推力大小
    const pushDistance = forceParams.strength * forcePower;
    
    // 计算目标位置（原始位置 + 推力）
    const targetPos = originalPos.clone().add(
        direction.multiplyScalar(pushDistance)
    );
    
    mesh.userData.targetPosition.copy(targetPos);
    
    // 计算形变（缩放）
    // 距离越近，形变越大
    const deformation = forceParams.maxDeformation * forcePower;
    mesh.userData.forceScale = 1 + deformation;
}

// 应用力场效果到几何图形
function applyForceField(mesh) {
    if (!mesh.userData) return;
    
    // 平滑插值到目标位置
    mesh.userData.currentPosition.lerp(
        mesh.userData.targetPosition,
        forceParams.smoothFactor
    );
    
    // 更新网格位置
    mesh.position.copy(mesh.userData.currentPosition);
    
    // 应用形变（缩放）
    const baseScale = mesh.userData.baseScale;
    const forceScale = mesh.userData.forceScale;
    mesh.scale.setScalar(baseScale * forceScale);
}

// 动画循环
function animate() {
    animationId = requestAnimationFrame(animate);
    
    // 平滑更新鼠标位置
    mousePosition.lerp(mouseTarget, 0.1);
    
    // 旋转几何图形并应用力场效果
    geometries.forEach((mesh) => {
        if (mesh.userData) {
            // 计算力场影响
            calculateForceField(mesh);
            
            // 应用力场效果
            applyForceField(mesh);
            
            // 旋转动画
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;
            
            // 基础缩放动画（与力场缩放叠加）
            mesh.userData.baseScale += mesh.userData.scaleSpeed * mesh.userData.scaleDirection;
            if (mesh.userData.baseScale > 1.2 || mesh.userData.baseScale < 0.8) {
                mesh.userData.scaleDirection *= -1;
            }
        }
    });
    
    // 相机轻微旋转
    const time = Date.now() * 0.0005;
    camera.position.x = Math.cos(time) * 5;
    camera.position.y = Math.sin(time * 0.7) * 5;
    camera.lookAt(0, 0, 0);
    
    renderer.render(scene, camera);
}

// 响应窗口大小变化
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
}

// 清理资源
function disposeBackground() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    geometries.forEach((mesh) => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) mesh.material.dispose();
        scene.remove(mesh);
    });
    
    lines.forEach((line) => {
        if (line.geometry) line.geometry.dispose();
        if (line.material) line.material.dispose();
        scene.remove(line);
    });
    
    if (renderer) {
        renderer.dispose();
    }
    
    geometries = [];
    lines = [];
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackground);
} else {
    initBackground();
}

// 页面卸载时清理
window.addEventListener('beforeunload', disposeBackground);

