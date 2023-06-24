import * as React from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { DiskContext, FileType } from '../contexts/DiskContext';

interface IDrive {
  name: string;
  free_bytes: number;
  total_bytes: number;
  used_bytes: number;
  drive_letter: string;
}

export const ListDiskDrives = () => {
  const [diskDrives, setDiskDrives] = React.useState<IDrive[]>();
  const { fileList, setFileList, history, setHistory } =
    React.useContext(DiskContext);

  async function listDiskDrives() {
    await invoke<IDrive[]>('list_disk_drives').then(drives => {
      setDiskDrives(drives);
      console.log(drives);
    });
  }

  const handleDiskDriveClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    drive: IDrive
  ) => {
    // event.stopPropagation();
    const fileList = await invoke<FileType[]>('list_files', {
      path: drive.drive_letter + ':\\',
    });
    console.log(
      fileList.map(file => {
        console.log(file.name);
        console.log(file.path);
        console.log(file.is_dir);
      })
    );
    setHistory(drive.drive_letter + ':\\');
    setFileList(fileList);
  };

  return (
    <>
      <button onClick={listDiskDrives}>List Disk Drives</button>
      <div className="disk-drives">
        {diskDrives?.map(drive => {
          return (
            <div
              onClick={e => handleDiskDriveClick(e, drive)}
              className="disk-drives-contents"
            >
              <p>
                {drive.name}
                {'('}
                {drive.drive_letter}
                {':)'}
              </p>
              <progress
                value={(drive.used_bytes / drive.total_bytes) * 100}
                max={100}
              ></progress>
              <p>
                {drive.free_bytes.toFixed(2)}
                {' GB free of '}
                {drive.total_bytes.toFixed(2)}
                {' GB'}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
