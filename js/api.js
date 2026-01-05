// API 调用封装
const API_BASE_URL = 'http://localhost:8000'; // 开发环境，生产环境需要修改

class API {
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        if (config.body && typeof config.body === 'object') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // 项目相关 API
    async getProjects(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = `/api/projects${queryString ? `?${queryString}` : ''}`;
        return this.request(endpoint);
    }

    async getProject(id) {
        return this.request(`/api/projects/${id}`);
    }

    async createProject(project) {
        return this.request('/api/projects', {
            method: 'POST',
            body: project,
        });
    }

    async updateProject(id, project) {
        return this.request(`/api/projects/${id}`, {
            method: 'PUT',
            body: project,
        });
    }

    async deleteProject(id) {
        return this.request(`/api/projects/${id}`, {
            method: 'DELETE',
        });
    }

    // 文本记录相关 API
    async getNotes(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = `/api/notes${queryString ? `?${queryString}` : ''}`;
        return this.request(endpoint);
    }

    async getNote(id) {
        return this.request(`/api/notes/${id}`);
    }

    async createNote(note) {
        return this.request('/api/notes', {
            method: 'POST',
            body: note,
        });
    }

    async updateNote(id, note) {
        return this.request(`/api/notes/${id}`, {
            method: 'PUT',
            body: note,
        });
    }

    async deleteNote(id) {
        return this.request(`/api/notes/${id}`, {
            method: 'DELETE',
        });
    }

    // Notion 同步相关 API
    async getSyncedPages(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = `/api/notion/sync${queryString ? `?${queryString}` : ''}`;
        return this.request(endpoint);
    }

    async syncNotionPages() {
        return this.request('/api/notion/sync', {
            method: 'POST',
        });
    }
}

// 创建全局 API 实例
const api = new API();

