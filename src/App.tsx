import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { ListDiskDrives } from './components/ListDiskDrives';
import { ListFiles } from './components/ListFiles';
import { Search } from './components/Search';
import './App.css';

function App() {
  // const [greetMsg, setGreetMsg] = useState('');
  // const [name, setName] = useState('');

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke('greet', { name }));
  // }

  return (
    <div className="container">
      <Search />
      <ListDiskDrives />
      <ListFiles />
      {/* <form
        className="row"
        onSubmit={e => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={e => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p> */}
    </div>
  );
}

export default App;
