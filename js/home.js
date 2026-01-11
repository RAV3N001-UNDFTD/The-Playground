// 主页交互逻辑
// 注意：此文件已更新为使用 API，但保留本地数据作为后备

// 本地项目数据（作为后备，当 API 不可用时使用）
const localProjects = [
    {
        title: '宝宝胎动记录器',
        icon: '❤️',
        description: '专为孕期设计的胎动记录工具，帮助准妈妈记录和追踪宝宝的胎动情况。',
        link: 'projects/fetal-movement/index.html',
        type: 'app', // 项目类型: app, animation, tool, note, experiment
        status: 'completed', // 状态: active, completed, archived
        tech_stack: ['HTML5', 'CSS3', 'JavaScript'], // 注意：API 使用 tech_stack
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
async function initProjects() {
    const articlesList = document.getElementById('articlesList');
    if (!articlesList) return;
    
    let projects = [];
    
    // 尝试从 API 加载项目
    if (typeof api !== 'undefined') {
        try {
            projects = await api.getProjects();
            console.log('从 API 加载项目:', projects.length);
        } catch (error) {
            console.warn('API 加载失败，使用本地数据:', error);
            projects = localProjects;
        }
    } else {
        // 如果 API 未定义，使用本地数据
        projects = localProjects;
    }
    
    // 如果项目为空，使用本地数据
    if (projects.length === 0) {
        projects = localProjects;
    }
    
    projects.forEach((project, index) => {
        // 兼容处理：techStack -> tech_stack
        if (project.techStack && !project.tech_stack) {
            project.tech_stack = project.techStack;
        }
        const card = createProjectCard(project, index);
        articlesList.appendChild(card);
    });
}

// 创建项目卡片 - Article - large 样式
function createProjectCard(project, index) {
    const card = document.createElement('a');
    card.href = project.link;
    card.className = 'article-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // 图片层
    const image = document.createElement('img');
    image.className = 'article-image';
    // 如果有图片 URL，使用它；否则使用占位符或默认背景
    if (project.image_url || project.imageUrl) {
        image.src = project.image_url || project.imageUrl;
        image.alt = project.title || 'Project image';
    } else {
        // 使用占位符或根据项目类型生成默认背景色
        const placeholderColors = {
            app: 'linear-gradient(135deg, #FF5700 0%, #FF8C42 100%)',
            animation: 'linear-gradient(135deg, #32CE57 0%, #5AE87A 100%)',
            tool: 'linear-gradient(135deg, #A3CAFF 0%, #C5D9FF 100%)',
            note: 'linear-gradient(135deg, #9747FF 0%, #B873FF 100%)',
            experiment: 'linear-gradient(135deg, #FF5700 0%, #9747FF 100%)'
        };
        const bgColor = placeholderColors[project.type] || placeholderColors.app;
        image.style.display = 'none';
        card.style.background = bgColor;
    }
    card.appendChild(image);
    
    // 渐变遮罩
    const gradient = document.createElement('div');
    gradient.className = 'article-gradient';
    card.appendChild(gradient);
    
    // 内容卡片
    const content = document.createElement('div');
    content.className = 'article-content';
    
    // 标题
    const title = document.createElement('h3');
    title.className = 'article-title';
    title.textContent = project.title || 'Untitled Project';
    content.appendChild(title);
    
    // 元数据（类型 · 日期）
    const meta = document.createElement('div');
    meta.className = 'article-meta';
    
    // 项目类型
    if (project.type && projectTypes[project.type]) {
        const typeText = document.createTextNode(projectTypes[project.type].label);
        meta.appendChild(typeText);
    }
    
    // 分隔符
    if (project.type && project.date) {
        const separator = document.createElement('span');
        separator.className = 'article-meta-separator';
        separator.textContent = ' · ';
        meta.appendChild(separator);
    }
    
    // 日期
    if (project.date) {
        // 格式化日期：如果日期格式是 YYYY-MM-DD，转换为更友好的格式
        let dateText = project.date;
        if (dateText.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const date = new Date(dateText);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            dateText = `${monthNames[date.getMonth()]} ${date.getDate()}`;
        }
        const dateNode = document.createTextNode(dateText);
        meta.appendChild(dateNode);
    }
    
    content.appendChild(meta);
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




