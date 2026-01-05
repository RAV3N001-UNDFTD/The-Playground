from notion_client import Client
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List
from app.models.notion_sync import NotionSync
from app.schemas.notion_sync import NotionSyncResponse


class NotionService:
    """Notion API 服务封装"""
    
    def __init__(self, api_key: str, database_id: str):
        self.client = Client(auth=api_key)
        self.database_id = database_id
    
    def _parse_notion_block(self, block: dict) -> str:
        """解析 Notion 块内容为文本"""
        block_type = block.get("type")
        content = ""
        
        if block_type == "paragraph":
            rich_text = block.get("paragraph", {}).get("rich_text", [])
            content = "".join([text.get("plain_text", "") for text in rich_text])
        elif block_type == "heading_1":
            rich_text = block.get("heading_1", {}).get("rich_text", [])
            content = "# " + "".join([text.get("plain_text", "") for text in rich_text])
        elif block_type == "heading_2":
            rich_text = block.get("heading_2", {}).get("rich_text", [])
            content = "## " + "".join([text.get("plain_text", "") for text in rich_text])
        elif block_type == "heading_3":
            rich_text = block.get("heading_3", {}).get("rich_text", [])
            content = "### " + "".join([text.get("plain_text", "") for text in rich_text])
        elif block_type == "bulleted_list_item":
            rich_text = block.get("bulleted_list_item", {}).get("rich_text", [])
            content = "- " + "".join([text.get("plain_text", "") for text in rich_text])
        elif block_type == "numbered_list_item":
            rich_text = block.get("numbered_list_item", {}).get("rich_text", [])
            content = "1. " + "".join([text.get("plain_text", "") for text in rich_text])
        elif block_type == "to_do":
            rich_text = block.get("to_do", {}).get("rich_text", [])
            checked = block.get("to_do", {}).get("checked", False)
            checkbox = "[x]" if checked else "[ ]"
            content = checkbox + " " + "".join([text.get("plain_text", "") for text in rich_text])
        
        return content + "\n"
    
    def _get_page_content(self, page_id: str) -> str:
        """获取页面内容"""
        blocks = self.client.blocks.children.list(block_id=page_id)
        content_parts = []
        
        for block in blocks.get("results", []):
            content = self._parse_notion_block(block)
            if content.strip():
                content_parts.append(content)
        
        return "\n".join(content_parts)
    
    def sync_pages(self, db: Session) -> List[NotionSyncResponse]:
        """同步 Notion 数据库中的页面"""
        # 查询数据库中的所有页面
        response = self.client.databases.query(database_id=self.database_id)
        pages = response.get("results", [])
        
        synced_pages = []
        
        for page in pages:
            page_id = page.get("id")
            properties = page.get("properties", {})
            
            # 获取标题（假设有一个 Title 属性）
            title = "未命名页面"
            for prop_name, prop_value in properties.items():
                if prop_value.get("type") == "title":
                    title_rich_text = prop_value.get("title", [])
                    if title_rich_text:
                        title = "".join([text.get("plain_text", "") for text in title_rich_text])
                    break
            
            # 获取最后修改时间
            last_edited_time = page.get("last_edited_time")
            last_modified = datetime.fromisoformat(last_edited_time.replace("Z", "+00:00")) if last_edited_time else None
            
            # 检查是否已存在同步记录
            existing_sync = db.query(NotionSync).filter(NotionSync.page_id == page_id).first()
            
            # 如果已存在且未修改，跳过
            if existing_sync and last_modified:
                if existing_sync.last_modified and existing_sync.last_modified >= last_modified:
                    synced_pages.append(NotionSyncResponse.model_validate(existing_sync))
                    continue
            
            # 获取页面内容
            try:
                content = self._get_page_content(page_id)
            except Exception as e:
                content = f"获取内容失败: {str(e)}"
            
            # 创建或更新同步记录
            if existing_sync:
                existing_sync.title = title
                existing_sync.content = content
                existing_sync.last_modified = last_modified
                db.commit()
                db.refresh(existing_sync)
                synced_pages.append(NotionSyncResponse.model_validate(existing_sync))
            else:
                new_sync = NotionSync(
                    page_id=page_id,
                    title=title,
                    content=content,
                    last_modified=last_modified
                )
                db.add(new_sync)
                db.commit()
                db.refresh(new_sync)
                synced_pages.append(NotionSyncResponse.model_validate(new_sync))
        
        return synced_pages

