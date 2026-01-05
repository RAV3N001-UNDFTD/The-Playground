// 项目管理逻辑
import { api } from './api.js';

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

// 从 API 加载项目
async function loadProjects() {
    try {
        const projects = await api.getProjects();
        return projects;
    } catch (error) {
        console.error('加载项目失败:', error);
        // 如果 API 不可用，返回空数组或使用本地数据
        return [];
    }
}

// 创建项目卡片
function createProjectCard(project, index) {
    const card = document.createElement('a');
    card.href = project.link || `#project-${project.id}`;
    card.className = 'project-card card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const content = document.createElement('div');
    content.className = 'project-card-content';
    
    // 顶部：类型和状态
    const metaRow = document.createElement('div');
    metaRow.className = 'project-meta';
    
    // 项目类型徽章
    if (project.type && projectTypes[project.type]) {
        const typeBadge = document.createElement('span');
        typeBadge.className = 'project-type badge badge-outline';
        typeBadge.textContent = `${projectTypes[project.type].icon} ${projectTypes[project.type].label}`;
        typeBadge.style.color = projectTypes[project.type].color;
        typeBadge.style.borderColor = projectTypes[project.type].color;
        metaRow.appendChild(typeBadge);
    }
    
    // 项目状态
    if (project.status && projectStatus[project.status]) {
        const statusBadge = document.createElement('span');
        statusBadge.className = 'project-status badge badge-outline';
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
    icon.textContent = project.icon || '📦';
    const titleText = document.createElement('span');
    titleText.textContent = project.title;
    title.appendChild(icon);
    title.appendChild(titleText);
    
    // 描述
    const description = document.createElement('div');
    description.className = 'project-description';
    description.textContent = project.description || '';
    
    // 技术栈
    if (project.tech_stack && project.tech_stack.length > 0) {
        const techStack = document.createElement('div');
        techStack.className = 'project-tech-stack';
        const techLabel = document.createElement('span');
        techLabel.className = 'tech-label';
        techLabel.textContent = '技术栈: ';
        techStack.appendChild(techLabel);
        
        project.tech_stack.forEach((tech, i) => {
            const techItem = document.createElement('span');
            techItem.className = 'tech-item';
            techItem.textContent = tech;
            techStack.appendChild(techItem);
            if (i < project.tech_stack.length - 1) {
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
            tagElement.className = 'project-tag badge badge-secondary';
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

// 初始化项目列表
async function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    try {
        const projects = await loadProjects();
        
        // 如果 API 返回空数组，使用本地数据作为后备
        if (projects.length === 0) {
            // 可以在这里添加本地项目数据作为后备
            console.log('使用本地项目数据');
        }
        
        projects.forEach((project, index) => {
            const card = createProjectCard(project, index);
            projectsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('初始化项目失败:', error);
    }
}

// 导出函数
export { loadProjects, createProjectCard, initProjects, projectTypes, projectStatus };

