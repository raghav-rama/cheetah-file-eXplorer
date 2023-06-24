// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod disk_io;
pub mod utils;

use disk_io::list_disk_drives::list_disk_drives;
use disk_io::list_disk_drives::MyState;
use disk_io::list_files::list_files;
use disk_io::search::search;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .manage(MyState::default())
        .invoke_handler(tauri::generate_handler![
            greet,
            list_disk_drives,
            list_files,
            search,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
