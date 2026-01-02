// 主页交互逻辑

// 项目数据
const projects = [
    {
        title: '宝宝胎动记录器',
        icon: '❤️',
        description: '专为孕期设计的胎动记录工具，帮助准妈妈记录和追踪宝宝的胎动情况。',
        link: 'projects/fetal-movement/index.html',
        type: 'app', // 项目类型: app, animation, tool, note, experiment
        status: 'completed', // 状态: active, completed, archived
        techStack: ['HTML5', 'CSS3', 'JavaScript'],
        tags: ['健康', '工具', '记录'],
        date: '2025-12-21',
        inspiration: '为怀孕的老婆记录胎动的需求'
    }
    // 可以在这里添加更多项目
];

// 项目类型配置
const projectTypes = {
    app: { label: '应用', color: '#4a90e2', icon: '📱' },
    animation: { label: '动效', color: '#e24a90', icon: '🎨' },
    tool: { label: '工具', color: '#90e24a', icon: '🔧' },
    note: { label: '笔记', color: '#e2904a', icon: '📝' },
    experiment: { label: '实验', color: '#904ae2', icon: '🧪' }
};

// 项目状态配置
const projectStatus = {
    active: { label: '进行中', color: '#4a90e2' },
    completed: { label: '已完成', color: '#90e24a' },
    archived: { label: '已归档', color: '#888888' }
};

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
    
    // 顶部：类型和状态
    const metaRow = document.createElement('div');
    metaRow.className = 'project-meta';
    
    // 项目类型徽章
    if (project.type && projectTypes[project.type]) {
        const typeBadge = document.createElement('span');
        typeBadge.className = 'project-type';
        typeBadge.textContent = `${projectTypes[project.type].icon} ${projectTypes[project.type].label}`;
        typeBadge.style.color = projectTypes[project.type].color;
        typeBadge.style.borderColor = projectTypes[project.type].color;
        metaRow.appendChild(typeBadge);
    }
    
    // 项目状态
    if (project.status && projectStatus[project.status]) {
        const statusBadge = document.createElement('span');
        statusBadge.className = 'project-status';
        statusBadge.textContent = projectStatus[project.status].label;
        statusBadge.style.color = projectStatus[project.status].color;
        statusBadge.style.borderColor = projectStatus[project.status].color;
        metaRow.appendChild(statusBadge);
    }
    
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
    
    // 技术栈
    if (project.techStack && project.techStack.length > 0) {
        const techStack = document.createElement('div');
        techStack.className = 'project-tech-stack';
        const techLabel = document.createElement('span');
        techLabel.className = 'tech-label';
        techLabel.textContent = '技术栈: ';
        techStack.appendChild(techLabel);
        
        project.techStack.forEach((tech, i) => {
            const techItem = document.createElement('span');
            techItem.className = 'tech-item';
            techItem.textContent = tech;
            techStack.appendChild(techItem);
            if (i < project.techStack.length - 1) {
                const separator = document.createElement('span');
                separator.textContent = ' • ';
                separator.style.color = 'rgba(255, 255, 255, 0.4)';
                techStack.appendChild(separator);
            }
        });
        content.appendChild(techStack);
    }
    
    // 标签
    if (project.tags && project.tags.length > 0) {
        const tags = document.createElement('div');
        tags.className = 'project-tags';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'project-tag';
            tagElement.textContent = tag;
            tags.appendChild(tagElement);
        });
        content.appendChild(tags);
    }
    
    // 底部信息：日期和灵感
    const footer = document.createElement('div');
    footer.className = 'project-footer';
    
    if (project.date) {
        const dateElement = document.createElement('span');
        dateElement.className = 'project-date';
        dateElement.textContent = project.date;
        footer.appendChild(dateElement);
    }
    
    if (project.inspiration) {
        const inspirationElement = document.createElement('span');
        inspirationElement.className = 'project-inspiration';
        inspirationElement.textContent = `💡 ${project.inspiration}`;
        footer.appendChild(inspirationElement);
    }
    
    content.appendChild(metaRow);
    content.appendChild(title);
    content.appendChild(description);
    if (footer.children.length > 0) {
        content.appendChild(footer);
    }
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




