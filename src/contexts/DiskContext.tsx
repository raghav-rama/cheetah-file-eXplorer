import * as React from 'react';

interface IFiles {
  name: string;
  path: string;
  is_dir: boolean;
}

export type FileType = IFiles;

interface IDisk {
  history: string;
  setHistory: React.Dispatch<React.SetStateAction<string>>;
  fileList: IFiles[];
  setFileList: React.Dispatch<React.SetStateAction<IFiles[]>>;
}

export type DiskContextType = IDisk;

export const DiskContext = React.createContext<DiskContextType>({
  history: '',
  setHistory: () => {},
  fileList: [],
  setFileList: () => {},
});

type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[];
};

export const DiskProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const [fileList, setFileList] = React.useState<IFiles[]>([]);
  const [history, setHistory] = React.useState<string>('');
  return (
    <>
      <DiskContext.Provider
        value={{ history, setHistory, fileList, setFileList }}
      >
        {children}
      </DiskContext.Provider>
    </>
  );
};
