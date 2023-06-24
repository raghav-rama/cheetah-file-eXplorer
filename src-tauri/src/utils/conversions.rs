use std::ffi::{OsStr, };
use std::path::Path;

pub fn os_str_to_string(os_str: &OsStr) -> String {
    // os_str.to_os_string().into_string().unwrap()
    os_str.to_string_lossy().to_string()
}

pub fn bytes_to_gb(bytes: u64) -> f64 {
    bytes as f64 / 1024.0 / 1024.0 / 1024.0
}

pub fn path_to_string(path: &Path) -> String {
    let s = path.to_string_lossy();
    s[..s.len() - 2].to_string()
}