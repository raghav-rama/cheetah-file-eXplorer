use std::fs::read_dir;
use crate::utils::conversions::os_str_to_string;
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Content {
    pub name: String,
    pub path: String,
    pub is_dir: bool,
}


#[tauri::command]
pub async fn list_files(
    state: tauri::State<'_, crate::MyState>,
    path: String,
) -> Result<Vec<Content>, String> {
    let driver_letter = state.drive_letter.lock().unwrap();
    println!("driver_letter: {}", driver_letter);
    let mut files = Vec::new();
    for entry in read_dir(path).unwrap() {
        let entry = entry.unwrap();
        let name = entry.file_name();
        let is_dir = entry.file_type().unwrap().is_dir();
        let path = entry.path();
        let path = path.to_str().unwrap();
        files.push(Content {
            name: os_str_to_string(&name),
            path: path.to_string(),
            is_dir,
        });
    }
    Ok(files)
}
