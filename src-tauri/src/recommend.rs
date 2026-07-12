use crate::models::{DimensionQuery, Work, WorkResult};
use ndarray::{arr1, Array1};
use std::f32;

/// Calculate cosine similarity between two vectors
pub fn cosine_similarity(a: &Array1<f32>, b: &Array1<f32>) -> f32 {
    let dot = a.dot(b);
    let norm_a = (a * a).sum().sqrt();
    let norm_b = (b * b).sum().sqrt();
    
    if norm_a == 0.0 || norm_b == 0.0 {
        0.0
    } else {
        dot / (norm_a * norm_b)
    }
}

/// Convert dimension query to embedding vector
pub fn query_to_embedding(query: &DimensionQuery) -> Array1<f32> {
    // Normalize query dimensions (1-10 to 0-1)
    let sensory = vec![
        query.emotion_resonance / 10.0,
        query.aesthetic_pleasure / 10.0,
        query.value_alignment / 10.0,
    ];
    
    let rational = vec![
        query.narrative_completion / 10.0,
        query.technical_execution / 10.0,
    ];
    
    // Apply weights
    let sensory_weight = query.sensory_weight / 100.0;
    let rational_weight = query.rational_weight / 100.0;
    
    let weighted_sensory: Vec<f32> = sensory.iter()
        .map(|&x| x * sensory_weight)
        .collect();
    
    let weighted_rational: Vec<f32> = rational.iter()
        .map(|&x| x * rational_weight)
        .collect();
    
    let mut combined = weighted_sensory;
    combined.extend(weighted_rational);
    
    // Pad to 10 dimensions
    while combined.len() < 10 {
        combined.push(0.0);
    }
    
    arr1(&combined)
}

/// Generate explanation for why a work matches
pub fn generate_explanation(query: &DimensionQuery, work: &Work, score: f32) -> String {
    let mut explanation = String::new();
    
    // Find strongest matching dimensions
    let mut dims = vec![
        ("情感共鸣度", query.emotion_resonance, work.emotion_resonance),
        ("审美愉悦度", query.aesthetic_pleasure, work.aesthetic_pleasure),
        ("价值认同度", query.value_alignment, work.value_alignment),
        ("叙事完成度", query.narrative_completion, work.narrative_completion),
        ("技术完成度", query.technical_execution, work.technical_execution),
    ];
    
    dims.sort_by(|a, b| {
        let diff_a = (a.1 - a.2).abs();
        let diff_b = (b.1 - b.2).abs();
        diff_a.partial_cmp(&diff_b).unwrap()
    });
    
    // Get top 2 matching dimensions
    if let Some((name, query_val, work_val)) = dims.get(0) {
        explanation.push_str(&format!("✓ {} ({:.0}/10) ", name, work_val));
        if query_val > 5.0 {
            explanation.push_str("完美匹配你的偏好");
        } else {
            explanation.push_str("符合你的需求");
        }
    }
    
    explanation
}

/// Detect anomaly: high-value low-score works
pub fn is_exceptional_work(query: &DimensionQuery, work: &Work, score: f32) -> bool {
    // If score is low but work has high intrinsic value
    // (used to flag works in "discover surprise" tier)
    score < 0.5 && (work.value_alignment > 7.0 || work.technical_execution > 8.0)
}

/// Search and rank works
pub fn search_works(
    query: &DimensionQuery,
    works: &[Work],
) -> Vec<WorkResult> {
    let query_vec = query_to_embedding(query);
    
    let mut results: Vec<_> = works
        .iter()
        .filter(|w| w.category == query.category)
        .map(|work| {
            let work_vec = arr1(&work.embedding);
            let score = cosine_similarity(&query_vec, &work_vec);
            let explanation = generate_explanation(query, work, score);
            let is_exceptional = is_exceptional_work(query, work, score);
            
            let tier = if score > 0.8 {
                "perfect".to_string()
            } else if score > 0.5 {
                "tryit".to_string()
            } else if is_exceptional {
                "discover".to_string()
            } else {
                return None;
            };
            
            Some(WorkResult {
                work: work.clone(),
                match_score: (score * 10.0).round() / 10.0, // 0-10 scale
                explanation,
                tier,
                warnings: vec![],
                related_works: vec![],
            })
        })
        .filter_map(|x| x)
        .collect();
    
    // Sort by score descending
    results.sort_by(|a, b| b.match_score.partial_cmp(&a.match_score).unwrap());
    results.truncate(30); // Limit to 30 results
    
    results
}
