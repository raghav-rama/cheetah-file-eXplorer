use std::collections::HashMap;
use std::fs;
use std::path::Path;

#[derive(Default)]
struct FileSearchCache {
    cache: HashMap<String, Vec<String>>,
}

impl FileSearchCache {
    fn new() -> Self {
        Self::default()
    }

    fn search(&mut self, directory: &str, keyword: &str) -> Vec<String> {
        if let Some(cached) = self.cache.get(keyword) {
            return cached.clone();
        }

        let mut result = vec![];
        self.search_directory(Path::new(directory), keyword, &mut result);

        self.cache.insert(keyword.to_string(), result.clone());

        result
    }

    fn search_directory(&self, directory: &Path, keyword: &str, result: &mut Vec<String>) {
        if let Ok(entries) = fs::read_dir(directory) {
            for entry in entries {
                if let Ok(entry) = entry {
                    if let Ok(file_name) = entry.file_name().into_string() {
                        if file_name.contains(keyword) {
                            if let Some(full_path) = entry.path().to_str() {
                                result.push(full_path.to_string());
                            }
                        }
                    }

                    if entry.path().is_dir() {
                        self.search_directory(&entry.path(), keyword, result);
                    }
                }
            }
        }
    }
}

#[tauri::command]
pub fn search(directory: &str, keyword: &str) -> Vec<String> {
    let mut cache = FileSearchCache::new();
    cache.search(directory, keyword)
}

#[test]
fn test_file_search_cache_1() {
    let mut cache = FileSearchCache::new();
    let result = cache.search("E:\\Hackman v6\\Cheetah File eXplorer", "Search.tsx");
    println!("result: {:?}", result);
    assert!(result.len() > 0);
}

#[test]
fn test_file_search_cache_2() {
    let mut cache = FileSearchCache::new();
    let result = cache.search("E:\\Hackman v6\\Cheetah File eXplorer", "tsconfig.json");
    println!("result: {:?}", result);
    assert!(result.len() > 0);
}
