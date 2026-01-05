// Notion 同步逻辑
// 注意：需要在 HTML 中引入 api.js

// 加载已同步的页面
async function loadSyncedPages() {
    if (typeof api === 'undefined') {
        console.error('API 未定义，请确保已引入 api.js');
        return [];
    }
    
    try {
        const pages = await api.getSyncedPages();
        return pages;
    } catch (error) {
        console.error('加载同步页面失败:', error);
        return [];
    }
}

// 触发同步
async function syncNotionPages() {
    if (typeof api === 'undefined') {
        throw new Error('API 未定义');
    }
    
    try {
        const syncedPages = await api.syncNotionPages();
        return syncedPages;
    } catch (error) {
        console.error('同步失败:', error);
        throw error;
    }
}

// 创建同步页面卡片
function createSyncedPageCard(page) {
    const card = document.createElement('div');
    card.className = 'card synced-page-card';
    
    const header = document.createElement('div');
    header.className = 'card-header';
    
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = page.title;
    header.appendChild(title);
    
    const content = document.createElement('div');
    content.className = 'card-content';
    
    // 内容预览
    if (page.content) {
        const preview = document.createElement('div');
        preview.className = 'synced-content-preview';
        const fullContent = page.content || '';
        const previewText = fullContent.length > 300 
            ? fullContent.substring(0, 300) + '...' 
            : fullContent;
        preview.textContent = previewText;
        content.appendChild(preview);
    }
    
    // 同步信息
    const footer = document.createElement('div');
    footer.className = 'card-footer';
    const syncInfo = document.createElement('div');
    syncInfo.className = 'sync-info';
    
    const syncedAt = document.createElement('small');
    syncedAt.className = 'text-muted-foreground';
    const syncDate = new Date(page.synced_at);
    syncedAt.textContent = `同步时间: ${syncDate.toLocaleString('zh-CN')}`;
    
    if (page.last_modified) {
        const modifiedAt = document.createElement('small');
        modifiedAt.className = 'text-muted-foreground';
        const modifiedDate = new Date(page.last_modified);
        modifiedAt.textContent = ` | 最后修改: ${modifiedDate.toLocaleString('zh-CN')}`;
        syncInfo.appendChild(modifiedAt);
    }
    
    syncInfo.appendChild(syncedAt);
    footer.appendChild(syncInfo);
    
    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(footer);
    
    return card;
}

// 初始化同步页面列表
async function initSyncedPages(containerId = 'syncedPagesContainer') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`容器 ${containerId} 不存在`);
        return;
    }
    
    try {
        const pages = await loadSyncedPages();
        
        if (pages.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message text-center text-muted-foreground';
            emptyMessage.textContent = '暂无同步的页面，点击"同步 Notion"按钮开始同步';
            container.appendChild(emptyMessage);
            return;
        }
        
        pages.forEach(page => {
            const card = createSyncedPageCard(page);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('初始化同步页面失败:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message text-center text-destructive';
        errorMessage.textContent = '加载失败: ' + error.message;
        container.appendChild(errorMessage);
    }
}

