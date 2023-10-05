// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{WindowEvent, Manager};

fn main() {
    tauri::Builder::default()
    .setup(|app| {
        let Some(window) = app.get_window("main") else {
            return Ok(())
        };

        window.on_window_event(|event| {
            match event {
                WindowEvent::Resized(..) => {
                    std::thread::sleep(std::time::Duration::from_millis(1))
                }
                _ => {}
            }
        });

        Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
