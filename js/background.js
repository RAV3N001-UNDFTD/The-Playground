// Three.js 背景动画 - 几何图形风格
let scene, camera, renderer;
let geometries = [];
let lines = [];
let animationId;

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
        
        // 添加随机旋转速度
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            scaleSpeed: 0.001,
            baseScale: 1,
            scaleDirection: Math.random() > 0.5 ? 1 : -1
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

// 动画循环
function animate() {
    animationId = requestAnimationFrame(animate);
    
    // 旋转几何图形
    geometries.forEach((mesh) => {
        if (mesh.userData) {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;
            
            // 缩放动画
            mesh.userData.baseScale += mesh.userData.scaleSpeed * mesh.userData.scaleDirection;
            if (mesh.userData.baseScale > 1.2 || mesh.userData.baseScale < 0.8) {
                mesh.userData.scaleDirection *= -1;
            }
            mesh.scale.setScalar(mesh.userData.baseScale);
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

