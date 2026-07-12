use crate::models::{Work, UserFeedback};
use rusqlite::{Connection, Result as SqliteResult, params};
use std::sync::Mutex;
use std::path::PathBuf;

/// Database manager
pub struct Database {
    conn: Mutex<Connection>,
}

impl Database {
    /// Initialize database connection
    pub fn new(db_path: &str) -> SqliteResult<Self> {
        let conn = Connection::open(db_path)?;
        let db = Database {
            conn: Mutex::new(conn),
        };
        db.init_schema()?;
        Ok(db)
    }
    
    /// Create schema if not exists
    fn init_schema(&self) -> SqliteResult<()> {
        let conn = self.conn.lock().unwrap();
        
        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS works (
                id INTEGER PRIMARY KEY,
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
            );
            
            CREATE TABLE IF NOT EXISTS user_feedback (
                id INTEGER PRIMARY KEY,
                work_id INTEGER NOT NULL,
                user_score REAL,
                dimension_scores TEXT,
                comment TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(work_id) REFERENCES works(id)
            );
            
            CREATE VIRTUAL TABLE IF NOT EXISTS works_fts USING fts5(
                title, description, category
            );
            
            CREATE INDEX IF NOT EXISTS idx_works_category ON works(category);
            CREATE INDEX IF NOT EXISTS idx_feedback_work ON user_feedback(work_id);
        ")?;
        
        Ok(())
    }
    
    /// Insert or update a work
    pub fn upsert_work(&self, work: &Work) -> SqliteResult<()> {
        let conn = self.conn.lock().unwrap();
        
        let embedding_bytes = serde_json::to_vec(&work.embedding)
            .unwrap_or_default();
        
        conn.execute(
            "INSERT OR REPLACE INTO works 
             (title, category, source, source_id, description, cover_url, source_url,
              emotion_resonance, aesthetic_pleasure, value_alignment, 
              narrative_completion, technical_execution, embedding)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            params![
                &work.title,
                &work.category,
                &work.source,
                &work.source_id,
                &work.description,
                &work.cover_url,
                &work.source_url,
                work.emotion_resonance,
                work.aesthetic_pleasure,
                work.value_alignment,
                work.narrative_completion,
                work.technical_execution,
                embedding_bytes,
            ],
        )?;
        
        Ok(())
    }
    
    /// Get all works in a category
    pub fn get_works_by_category(&self, category: &str) -> SqliteResult<Vec<Work>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, title, category, source, source_id, description, 
                    cover_url, source_url, emotion_resonance, aesthetic_pleasure,
                    value_alignment, narrative_completion, technical_execution, embedding
             FROM works WHERE category = ?"
        )?;
        
        let works = stmt.query_map([category], |row| {
            let embedding_bytes: Vec<u8> = row.get(13)?;
            let embedding = serde_json::from_slice(&embedding_bytes)
                .unwrap_or_else(|_| vec![5.0; 10]);
            
            Ok(Work {
                id: row.get(0)?,
                title: row.get(1)?,
                category: row.get(2)?,
                source: row.get(3)?,
                source_id: row.get(4)?,
                description: row.get(5)?,
                cover_url: row.get(6)?,
                source_url: row.get(7)?,
                emotion_resonance: row.get(8)?,
                aesthetic_pleasure: row.get(9)?,
                value_alignment: row.get(10)?,
                narrative_completion: row.get(11)?,
                technical_execution: row.get(12)?,
                embedding,
            })
        })?
        .collect::<Result<Vec<_>, _>>()?;
        
        Ok(works)
    }
    
    /// Record user feedback
    pub fn record_feedback(&self, feedback: &UserFeedback) -> SqliteResult<()> {
        let conn = self.conn.lock().unwrap();
        let scores_json = serde_json::to_string(&feedback.dimension_scores)
            .unwrap_or_default();
        
        conn.execute(
            "INSERT INTO user_feedback (work_id, user_score, dimension_scores, comment)
             VALUES (?, ?, ?, ?)",
            params![
                feedback.work_id,
                feedback.user_score,
                scores_json,
                &feedback.comment,
            ],
        )?;
        
        Ok(())
    }
}
