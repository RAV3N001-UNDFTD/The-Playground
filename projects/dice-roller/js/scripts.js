// 骰子投掷器逻辑

// 投掷历史存储
let rollHistory = JSON.parse(localStorage.getItem('diceRollHistory') || '[]');

// 骰子类型配置
const diceTypes = {
    4: 'd4',
    6: 'd6',
    8: 'd8',
    10: 'd10',
    12: 'd12',
    20: 'd20'
};

// 投掷单个骰子
function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

// 投掷多个骰子
function rollMultipleDice(count, sides, modifier = 0) {
    const results = [];
    for (let i = 0; i < count; i++) {
        results.push(rollDice(sides));
    }
    const sum = results.reduce((a, b) => a + b, 0);
    const total = sum + modifier;
    
    return {
        results,
        sum,
        modifier,
        total,
        count,
        sides
    };
}

// 显示投掷结果
function displayResult(result, type = 'single') {
    const resultDisplay = document.getElementById('resultDisplay');
    resultDisplay.innerHTML = '';
    
    if (type === 'single') {
        const label = document.createElement('div');
        label.className = 'dice-result-label';
        label.textContent = `投掷 ${diceTypes[result.sides] || `d${result.sides}`}`;
        
        const value = document.createElement('div');
        value.className = 'dice-result';
        value.textContent = result.value;
        
        resultDisplay.appendChild(label);
        resultDisplay.appendChild(value);
    } else {
        const label = document.createElement('div');
        label.className = 'dice-result-label';
        label.textContent = `投掷 ${result.count}d${result.sides}${result.modifier !== 0 ? (result.modifier > 0 ? `+${result.modifier}` : result.modifier) : ''}`;
        
        const value = document.createElement('div');
        value.className = 'dice-result';
        value.textContent = result.total;
        
        const details = document.createElement('div');
        details.className = 'dice-result-details';
        details.textContent = `详情: [${result.results.join(', ')}]${result.modifier !== 0 ? ` ${result.modifier > 0 ? '+' : ''}${result.modifier}` : ''} = ${result.total}`;
        
        resultDisplay.appendChild(label);
        resultDisplay.appendChild(value);
        resultDisplay.appendChild(details);
    }
}

// 添加到历史记录
function addToHistory(result, type = 'single') {
    const historyItem = {
        id: Date.now(),
        type: type,
        result: type === 'single' ? result.value : result.total,
        details: type === 'single' 
            ? { sides: result.sides, diceType: diceTypes[result.sides] || `d${result.sides}` }
            : { count: result.count, sides: result.sides, modifier: result.modifier, rolls: result.results },
        timestamp: new Date().toISOString()
    };
    
    rollHistory.unshift(historyItem);
    
    // 限制历史记录数量（最多保留 50 条）
    if (rollHistory.length > 50) {
        rollHistory = rollHistory.slice(0, 50);
    }
    
    localStorage.setItem('diceRollHistory', JSON.stringify(rollHistory));
    updateHistoryDisplay();
}

// 更新历史记录显示
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    if (rollHistory.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'text-center text-muted-foreground';
        emptyMsg.textContent = '暂无历史记录';
        historyList.appendChild(emptyMsg);
        return;
    }
    
    rollHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const header = document.createElement('div');
        header.className = 'history-item-header';
        
        const type = document.createElement('span');
        type.className = 'history-item-type';
        if (item.type === 'single') {
            type.textContent = item.details.diceType || `d${item.details.sides}`;
        } else {
            const modifierText = item.details.modifier !== 0 
                ? (item.details.modifier > 0 ? `+${item.details.modifier}` : item.details.modifier)
                : '';
            type.textContent = `${item.details.count}d${item.details.sides}${modifierText}`;
        }
        
        const time = document.createElement('span');
        time.className = 'history-item-time';
        const date = new Date(item.timestamp);
        time.textContent = date.toLocaleTimeString('zh-CN');
        
        header.appendChild(type);
        header.appendChild(time);
        
        const result = document.createElement('div');
        result.className = 'history-item-result';
        result.textContent = item.result;
        
        const details = document.createElement('div');
        details.className = 'history-item-details';
        if (item.type === 'multiple') {
            details.textContent = `[${item.details.rolls.join(', ')}]${item.details.modifier !== 0 ? ` ${item.details.modifier > 0 ? '+' : ''}${item.details.modifier}` : ''} = ${item.result}`;
        }
        
        historyItem.appendChild(header);
        historyItem.appendChild(result);
        if (item.type === 'multiple') {
            historyItem.appendChild(details);
        }
        
        historyList.appendChild(historyItem);
    });
}

// 清空历史记录
function clearHistory() {
    if (confirm('确定要清空所有历史记录吗？')) {
        rollHistory = [];
        localStorage.removeItem('diceRollHistory');
        updateHistoryDisplay();
    }
}

// 初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    // 标准骰子按钮
    document.querySelectorAll('.dice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sides = parseInt(btn.dataset.sides);
            const result = { value: rollDice(sides), sides };
            displayResult(result, 'single');
            addToHistory(result, 'single');
        });
    });
    
    // 自定义骰子按钮
    document.getElementById('customDiceBtn').addEventListener('click', () => {
        const sides = parseInt(document.getElementById('customSides').value);
        if (sides < 2 || sides > 100) {
            alert('面数必须在 2-100 之间');
            return;
        }
        const result = { value: rollDice(sides), sides };
        displayResult(result, 'single');
        addToHistory(result, 'single');
    });
    
    // 多骰子组合按钮
    document.getElementById('rollMultipleBtn').addEventListener('click', () => {
        const count = parseInt(document.getElementById('diceCount').value);
        const sides = parseInt(document.getElementById('diceSides').value);
        const modifier = parseInt(document.getElementById('modifier').value) || 0;
        
        if (count < 1 || count > 10) {
            alert('数量必须在 1-10 之间');
            return;
        }
        if (sides < 2 || sides > 100) {
            alert('面数必须在 2-100 之间');
            return;
        }
        
        const result = rollMultipleDice(count, sides, modifier);
        displayResult(result, 'multiple');
        addToHistory(result, 'multiple');
    });
    
    // 清空历史按钮
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    
    // 初始化历史记录显示
    updateHistoryDisplay();
});

