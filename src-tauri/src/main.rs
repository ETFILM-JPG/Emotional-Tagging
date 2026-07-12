#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

mod api;
mod db;
mod models;
mod recommend;

fn main() {
    env_logger::init();

    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            api::search_works,
            api::get_work_details,
            api::submit_feedback,
            api::get_recommendations,
            api::init_database,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
