use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DimensionQuery {
    pub emotion_resonance: f32,
    pub aesthetic_pleasure: f32,
    pub value_alignment: f32,
    pub narrative_completion: f32,
    pub technical_execution: f32,
    pub sensory_weight: f32,      // 0-100
    pub rational_weight: f32,     // 0-100
    pub category: String,         // book, movie, music
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Work {
    pub id: i32,
    pub title: String,
    pub category: String,
    pub source: String,           // douban, zhihu, etc.
    pub source_id: String,
    pub description: String,
    pub cover_url: String,
    pub source_url: String,
    
    // 5 Dimensions
    pub emotion_resonance: f32,
    pub aesthetic_pleasure: f32,
    pub value_alignment: f32,
    pub narrative_completion: f32,
    pub technical_execution: f32,
    
    // Embedding vector
    pub embedding: Vec<f32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorkResult {
    pub work: Work,
    pub match_score: f32,
    pub explanation: String,n    pub tier: String,            // perfect, tryit, discover
    pub warnings: Vec<String>,
    pub related_works: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserFeedback {
    pub work_id: i32,
    pub user_score: f32,
    pub dimension_scores: std::collections::HashMap<String, f32>,
    pub comment: Option<String>,
}
