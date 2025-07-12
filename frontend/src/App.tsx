import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { AddUser, GetUsers } from '../wailsjs/go/main/App';
import './style.css'
import Menu from './Menu'
import DataGrid from './DataGrid'

function App() {
    const [resultText] = useState("Please enter your name below:");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo" />
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
                <button className="btn" onClick={async () => {
                    await AddUser(name);
                    setRefreshKey(prev => prev + 1);
                }}>Add User</button>
                <button className="btn" onClick={() => GetUsers()}>Get Users</button>
            </div>
            <h1>Menu</h1>
            <div>
                <Menu></Menu>
            </div>
            <div>
                <DataGrid refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default App
