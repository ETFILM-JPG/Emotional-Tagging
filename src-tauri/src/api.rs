use crate::models::{DimensionQuery, Work, UserFeedback, WorkResult};
use crate::db::Database;
use crate::recommend;
use std::sync::Mutex;
use tauri::State;

pub struct DbState(pub Mutex<Database>);

#[tauri::command]
pub fn init_database() -> Result<String, String> {
    // Database is initialized on app startup
    Ok("Database initialized successfully".to_string())
}

#[tauri::command]
pub fn search_works(
    query: DimensionQuery,
    db_state: State<DbState>,
) -> Result<Vec<WorkResult>, String> {
    let db = db_state.0.lock().map_err(|e| e.to_string())?;
    
    // Get all works in category
    let works = db
        .get_works_by_category(&query.category)
        .map_err(|e| e.to_string())?;
    
    if works.is_empty() {
        return Ok(vec![]);
    }
    
    // Run recommendation algorithm
    let results = recommend::search_works(&query, &works);
    
    Ok(results)
}

#[tauri::command]
pub fn get_work_details(
    work_id: i32,
    db_state: State<DbState>,
) -> Result<Work, String> {
    // TODO: Implement
    Err("Not implemented".to_string())
}

#[tauri::command]
pub fn submit_feedback(
    feedback: UserFeedback,
    db_state: State<DbState>,
) -> Result<(), String> {
    let db = db_state.0.lock().map_err(|e| e.to_string())?;
    
    db.record_feedback(&feedback)
        .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub fn get_recommendations(
    work_id: i32,
    limit: usize,
    db_state: State<DbState>,
) -> Result<Vec<WorkResult>, String> {
    // TODO: Implement
    Err("Not implemented".to_string())
}
