import * as React from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { DiskContext, FileType } from '../contexts/DiskContext';
import File from '../assets/File.png';
import Folder from '../assets/Folder.png';

export const ListFiles = () => {
  const { fileList, setFileList, history, setHistory } =
    React.useContext(DiskContext);

  const handleListFiles = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    folderName: string
  ) => {
    let path = '';
    if (history.length == 4) {
      path = history + folderName;
      setHistory(history + folderName);
    } else {
      path = history + '\\' + folderName;
      setHistory(history + '\\' + folderName);
    }
    console.log(path);
    await invoke<FileType[]>('list_files', {
      path,
    }).then(files => {
      setFileList(files);
      files.map(file => {
        console.log(file.name);
        console.log(file.path);
        console.log(file.is_dir);
      });
    });
  };

  return (
    <>
      {/* <button onClick={(e) => handleListFiles(e, file.name)}>List Files</button> */}
      <ul className="files">
        {fileList?.map((file, idx) => {
          return file.is_dir ? (
            <li
              onClick={e => handleListFiles(e, file.name)}
              key={idx}
              className="files-contents"
            >
              <img src={Folder} alt="Folder" width={20} height={20} />
              <p>{file.name}</p>
            </li>
          ) : (
            <li key={idx} className="files-contents">
              <img src={File} alt="Folder" width={20} height={20} />
              <p>{file.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
