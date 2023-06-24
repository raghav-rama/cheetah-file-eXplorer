use crate::utils::conversions::{bytes_to_gb, os_str_to_string, path_to_string};
use serde::Serialize;
use std::collections::HashMap;
use std::sync::Mutex;
use sysinfo::{DiskExt, System, SystemExt};

#[derive(Serialize)]
pub struct Drive {
    pub name: String,
    pub total_bytes: f64,
    pub free_bytes: f64,
    pub used_bytes: f64,
    pub drive_letter: String,
}

#[derive(Default)]
pub struct MyState {
    pub drive_letter: Mutex<String>,
    t: Mutex<HashMap<String, String>>,
}
// remember to call `.manage(MyState::default())`
#[tauri::command]
pub async fn list_disk_drives(state: tauri::State<'_, MyState>) -> Result<Vec<Drive>, String> {
    state.t.lock().unwrap().insert("key".into(), "value".into());
    let mut disks = Vec::new();
    let mut sys = System::new_all();
    sys.refresh_all();
    for disk in sys.disks() {
        let total_bytes = bytes_to_gb(disk.total_space());
        let free_bytes = bytes_to_gb(disk.available_space());
        let used_bytes = total_bytes - free_bytes;
        let mut name = os_str_to_string(disk.name());
        if name.len() == 0 {
            name = "Local Disk".into();
        }
        let mnt_point = disk.mount_point();
        let drive_letter = path_to_string(mnt_point);
        *state.drive_letter.lock().unwrap() = drive_letter.clone();
        disks.push(Drive {
            name,
            total_bytes,
            free_bytes,
            used_bytes,
            drive_letter,
        });
    }
    Ok(disks)
}
