import * as React from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { DiskContext, FileType } from '../contexts/DiskContext';

export const Search = () => {
  const { search, setSearch, history } = React.useContext(DiskContext);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <h1>Search</h1>
      <form
        onSubmit={async e => {
          e.preventDefault();
          await invoke<string[]>('search', {
            directory: history,
            keyword: search,
          }).then(files => {
            files.map(file => {
              console.log(file);
            });
          });
        }}
      >
        <input type="text" placeholder="Search" onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
    </>
  );
};
