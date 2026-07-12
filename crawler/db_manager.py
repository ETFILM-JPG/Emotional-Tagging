import json
import sqlite3
import logging
from typing import Dict, List, Optional
from pathlib import Path

logger = logging.getLogger(__name__)

class DatabaseManager:
    """Manage SQLite database for crawler"""
    
    def __init__(self, db_path: str = None):
        if db_path is None:
            # Default to app data directory
            app_data = Path.home() / '.emotional-tagging'
            app_data.mkdir(exist_ok=True)
            db_path = str(app_data / 'data.db')
        
        self.db_path = db_path
        self.init_db()
    
    def init_db(self):
        """Initialize database schema"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Works table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS works (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    category TEXT NOT NULL,
                    source TEXT NOT NULL,
                    source_id TEXT UNIQUE,
                    description TEXT,
                    cover_url TEXT,
                    source_url TEXT,
                    emotion_resonance REAL DEFAULT 5.0,
                    aesthetic_pleasure REAL DEFAULT 5.0,
                    value_alignment REAL DEFAULT 5.0,
                    narrative_completion REAL DEFAULT 5.0,
                    technical_execution REAL DEFAULT 5.0,
                    embedding BLOB,
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Create indexes
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_category ON works(category)')
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_source ON works(source)')
            
            conn.commit()
            conn.close()
            logger.info(f"Database initialized at {self.db_path}")
        except Exception as e:
            logger.error(f"Error initializing database: {e}", exc_info=True)
    
    def upsert_work(self, work: Dict) -> bool:
        """Insert or update a work record"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT OR REPLACE INTO works 
                (title, category, source, source_id, description, cover_url, source_url,
                 emotion_resonance, aesthetic_pleasure, value_alignment,
                 narrative_completion, technical_execution)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                work.get('title'),
                work.get('category'),
                work.get('source'),
                work.get('source_id'),
                work.get('description'),
                work.get('cover_url'),
                work.get('source_url'),
                work.get('emotion_resonance', 5.0),
                work.get('aesthetic_pleasure', 5.0),
                work.get('value_alignment', 5.0),
                work.get('narrative_completion', 5.0),
                work.get('technical_execution', 5.0),
            ))
            
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            logger.error(f"Error upserting work: {e}")
            return False
    
    def get_works_by_category(self, category: str) -> List[Dict]:
        """Get all works in a category"""
        try:
            conn = sqlite3.connect(self.db_path)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT * FROM works WHERE category = ?
            ''', (category,))
            
            rows = cursor.fetchall()
            works = [dict(row) for row in rows]
            conn.close()
            return works
        except Exception as e:
            logger.error(f"Error getting works: {e}")
            return []
