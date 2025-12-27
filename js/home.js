// 主页交互逻辑

// 项目数据
const projects = [
    {
        title: '宝宝胎动记录器',
        icon: '❤️',
        description: '专为孕期设计的胎动记录工具，帮助准妈妈记录和追踪宝宝的胎动情况。',
        link: 'projects/fetal-movement/index.html',
        tags: ['健康', '工具', '记录']
    }
    // 可以在这里添加更多项目
];

// 初始化项目卡片
function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        projectsGrid.appendChild(card);
    });
}

// 创建项目卡片
function createProjectCard(project, index) {
    const card = document.createElement('a');
    card.href = project.link;
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const content = document.createElement('div');
    content.className = 'project-card-content';
    
    // 标题
    const title = document.createElement('div');
    title.className = 'project-title';
    const icon = document.createElement('span');
    icon.className = 'project-icon';
    icon.textContent = project.icon;
    const titleText = document.createElement('span');
    titleText.textContent = project.title;
    title.appendChild(icon);
    title.appendChild(titleText);
    
    // 描述
    const description = document.createElement('div');
    description.className = 'project-description';
    description.textContent = project.description;
    
    // 标签
    const tags = document.createElement('div');
    tags.className = 'project-tags';
    project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'project-tag';
        tagElement.textContent = tag;
        tags.appendChild(tagElement);
    });
    
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(tags);
    card.appendChild(content);
    
    return card;
}

// 平滑滚动（如果需要）
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
} else {
    initProjects();
}

// 添加页面可见性检测，优化性能
document.addEventListener('visibilitychange', () => {
    // 当页面不可见时，可以暂停动画以节省资源
    // three.js 动画会继续运行，但可以通过 visibility API 优化
});

