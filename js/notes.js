// 文本记录管理
// 注意：需要在 HTML 中引入 api.js

// 加载所有文本记录
async function loadNotes() {
    if (typeof api === 'undefined') {
        console.error('API 未定义，请确保已引入 api.js');
        return [];
    }
    
    try {
        const notes = await api.getNotes();
        return notes;
    } catch (error) {
        console.error('加载文本记录失败:', error);
        return [];
    }
}

// 创建文本记录卡片
function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'card note-card';
    card.dataset.noteId = note.id;
    
    const header = document.createElement('div');
    header.className = 'card-header';
    
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = note.title;
    header.appendChild(title);
    
    const content = document.createElement('div');
    content.className = 'card-content';
    
    // 内容预览（前 200 个字符）
    const preview = document.createElement('p');
    preview.className = 'note-preview';
    const fullContent = note.content || '';
    preview.textContent = fullContent.length > 200 
        ? fullContent.substring(0, 200) + '...' 
        : fullContent;
    content.appendChild(preview);
    
    // 标签
    if (note.tags && note.tags.length > 0) {
        const tags = document.createElement('div');
        tags.className = 'note-tags';
        note.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'badge badge-secondary';
            tagElement.textContent = tag;
            tags.appendChild(tagElement);
        });
        content.appendChild(tags);
    }
    
    // 日期信息
    const footer = document.createElement('div');
    footer.className = 'card-footer';
    const date = document.createElement('small');
    date.className = 'text-muted';
    const createdDate = new Date(note.created_at);
    date.textContent = createdDate.toLocaleDateString('zh-CN');
    footer.appendChild(date);
    
    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(footer);
    
    // 点击事件
    card.addEventListener('click', () => {
        // 可以导航到详情页或显示详情
        window.location.href = `projects/notes/detail.html?id=${note.id}`;
    });
    
    return card;
}

// 初始化文本记录列表
async function initNotes(containerId = 'notesContainer') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`容器 ${containerId} 不存在`);
        return;
    }
    
    try {
        const notes = await loadNotes();
        
        if (notes.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = '暂无文本记录';
            container.appendChild(emptyMessage);
            return;
        }
        
        notes.forEach(note => {
            const card = createNoteCard(note);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('初始化文本记录失败:', error);
    }
}

// 创建新文本记录
async function createNote(noteData) {
    if (typeof api === 'undefined') {
        throw new Error('API 未定义');
    }
    
    try {
        const newNote = await api.createNote(noteData);
        return newNote;
    } catch (error) {
        console.error('创建文本记录失败:', error);
        throw error;
    }
}

// 更新文本记录
async function updateNote(id, noteData) {
    if (typeof api === 'undefined') {
        throw new Error('API 未定义');
    }
    
    try {
        const updatedNote = await api.updateNote(id, noteData);
        return updatedNote;
    } catch (error) {
        console.error('更新文本记录失败:', error);
        throw error;
    }
}

// 删除文本记录
async function deleteNote(id) {
    if (typeof api === 'undefined') {
        throw new Error('API 未定义');
    }
    
    try {
        await api.deleteNote(id);
        return true;
    } catch (error) {
        console.error('删除文本记录失败:', error);
        throw error;
    }
}

