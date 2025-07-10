import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { AddUser, DeleteUser, UpdateUser, GetUsers } from '../wailsjs/go/main/App';
import './style.css'
import Menu from './Menu'

function App() {
    const [resultText] = useState("Please enter your name below:");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);

    function addUser() {
        AddUser(name);
    }

    function deleteUser() {
        DeleteUser(name);
    }

    function updateUser() {
        UpdateUser(name);
    }

    function getUsers() {
        GetUsers();
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo" />
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
                <button className="btn" onClick={addUser}>Add User</button>
                <button className="btn" onClick={deleteUser}>Delete User</button>
                <button className="btn" onClick={updateUser}>Update User</button>
                <button className="btn" onClick={getUsers}>Get Users</button>
            </div>
            <h1>Menu</h1>
            <div>
                <Menu>
                </Menu>
            </div>
        </div>
    )
}

export default App
