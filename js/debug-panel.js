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
    syncSliderValues();
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



