// 调试面板控制逻辑

let debugPanel = null;
let isPanelVisible = false;

// 初始化调试面板
function initDebugPanel() {
    debugPanel = document.getElementById('debugPanel');
    if (!debugPanel) return;
    
    // 绑定关闭按钮
    const closeBtn = document.getElementById('closeDebugPanel');
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleDebugPanel);
    }
    
    // 绑定滑块事件
    setupSliders();
    
    // 绑定快捷键 (Option + T 或 Alt + T)
    document.addEventListener('keydown', handleKeyDown);
}

// 处理键盘事件
function handleKeyDown(event) {
    // Mac: Option (Alt) + T, Windows/Linux: Alt + T
    if ((event.altKey || event.metaKey) && event.key.toLowerCase() === 't') {
        event.preventDefault();
        toggleDebugPanel();
    }
    
    // ESC 键关闭面板
    if (event.key === 'Escape' && isPanelVisible) {
        toggleDebugPanel();
    }
}

// 切换调试面板显示/隐藏
function toggleDebugPanel() {
    if (!debugPanel) return;
    
    isPanelVisible = !isPanelVisible;
    
    if (isPanelVisible) {
        debugPanel.classList.add('active');
    } else {
        debugPanel.classList.remove('active');
    }
}

// 设置滑块控件
function setupSliders() {
    // 力场半径
    const forceRadiusSlider = document.getElementById('forceRadius');
    const forceRadiusValue = document.getElementById('forceRadiusValue');
    if (forceRadiusSlider && forceRadiusValue) {
        forceRadiusSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            forceRadiusValue.textContent = value;
            if (window.forceParams) {
                window.forceParams.radius = value;
            }
        });
    }
    
    // 推力强度
    const forceStrengthSlider = document.getElementById('forceStrength');
    const forceStrengthValue = document.getElementById('forceStrengthValue');
    if (forceStrengthSlider && forceStrengthValue) {
        forceStrengthSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            forceStrengthValue.textContent = value.toFixed(1);
            if (window.forceParams) {
                window.forceParams.strength = value;
            }
        });
    }
    
    // 最大形变
    const maxDeformationSlider = document.getElementById('maxDeformation');
    const maxDeformationValue = document.getElementById('maxDeformationValue');
    if (maxDeformationSlider && maxDeformationValue) {
        maxDeformationSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            maxDeformationValue.textContent = value.toFixed(2);
            if (window.forceParams) {
                window.forceParams.maxDeformation = value;
            }
        });
    }
    
    // 平滑因子
    const smoothFactorSlider = document.getElementById('smoothFactor');
    const smoothFactorValue = document.getElementById('smoothFactorValue');
    if (smoothFactorSlider && smoothFactorValue) {
        smoothFactorSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            smoothFactorValue.textContent = value.toFixed(2);
            if (window.forceParams) {
                window.forceParams.smoothFactor = value;
            }
        });
    }
}

// 同步滑块值与当前参数
function syncSliderValues() {
    if (!window.forceParams) return;
    
    const forceRadiusSlider = document.getElementById('forceRadius');
    const forceRadiusValue = document.getElementById('forceRadiusValue');
    if (forceRadiusSlider && forceRadiusValue) {
        forceRadiusSlider.value = window.forceParams.radius;
        forceRadiusValue.textContent = window.forceParams.radius;
    }
    
    const forceStrengthSlider = document.getElementById('forceStrength');
    const forceStrengthValue = document.getElementById('forceStrengthValue');
    if (forceStrengthSlider && forceStrengthValue) {
        forceStrengthSlider.value = window.forceParams.strength;
        forceStrengthValue.textContent = window.forceParams.strength.toFixed(1);
    }
    
    const maxDeformationSlider = document.getElementById('maxDeformation');
    const maxDeformationValue = document.getElementById('maxDeformationValue');
    if (maxDeformationSlider && maxDeformationValue) {
        maxDeformationSlider.value = window.forceParams.maxDeformation;
        maxDeformationValue.textContent = window.forceParams.maxDeformation.toFixed(2);
    }
    
    const smoothFactorSlider = document.getElementById('smoothFactor');
    const smoothFactorValue = document.getElementById('smoothFactorValue');
    if (smoothFactorSlider && smoothFactorValue) {
        smoothFactorSlider.value = window.forceParams.smoothFactor;
        smoothFactorValue.textContent = window.forceParams.smoothFactor.toFixed(2);
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // 等待forceParams初始化
        setTimeout(() => {
            initDebugPanel();
            syncSliderValues();
        }, 100);
    });
} else {
    setTimeout(() => {
        initDebugPanel();
        syncSliderValues();
    }, 100);
}

