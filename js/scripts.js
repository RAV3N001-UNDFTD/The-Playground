let count = 0;
const recordBtn = document.getElementById('recordBtn');
const saveBtn = document.getElementById('saveBtn');
const viewHistoryBtn = document.getElementById('viewHistoryBtn');
const backBtn = document.getElementById('backBtn');
const countDisplay = document.getElementById('count');
const historyList = document.getElementById('historyList');
const mainPage = document.getElementById('mainPage');
const historyPage = document.getElementById('historyPage');

// 加载历史记录
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('fetalMovements')) || [];
    historyList.innerHTML = '';
    // 按日期降序排序
    history.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.date} ${item.time}：${item.count} 次胎动`;
        historyList.appendChild(li);
    });
}

// 记录胎动
recordBtn.addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
});

// 保存记录
saveBtn.addEventListener('click', () => {
    if (count === 0) {
        alert('还没有记录胎动哦～');
        return;
    }
    const now = new Date();
    const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const history = JSON.parse(localStorage.getItem('fetalMovements')) || [];
    history.push({ date, time, count });
    localStorage.setItem('fetalMovements', JSON.stringify(history));
    alert(`保存成功！宝宝今天${count}次胎动，好活跃哦～休息会儿吧❤️`);
    count = 0;
    countDisplay.textContent = 0;
});

// 查看历史
viewHistoryBtn.addEventListener('click', () => {
    loadHistory();
    mainPage.style.display = 'none';
    historyPage.style.display = 'block';
});

// 返回首页
backBtn.addEventListener('click', () => {
    mainPage.style.display = 'flex';
    historyPage.style.display = 'none';
});