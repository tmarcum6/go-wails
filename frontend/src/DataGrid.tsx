import React, { useState, useEffect } from 'react';
import { GetUsers, DeleteUser, UpdateUser } from '../wailsjs/go/main/App';
import { main } from '../wailsjs/go/models';

interface DataGridProps {
    refreshKey: number;

}
const DataGrid: React.FC<DataGridProps> = ({ refreshKey }) => {
    const [data, setData] = useState<main.User[]>([]);

    useEffect(() => {
        GetUsers().then(setData).catch(console.error);
    }, [refreshKey]);

    const handleDelete = async (userID: number, userName: string) => {
        try {
            await DeleteUser(userID, userName);
            const users = await GetUsers();
            setData(users);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleUpdate = async (userID: number) => {
        try {
            await UpdateUser(userID);
            const users = await GetUsers();
            setData(users);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {data.map(row => (
                    <tr key={row.ID}>
                        <td>{row.ID}</td>
                        <td>{row.Name}</td>
                        <tr>
                            <td colSpan={2}>
                                <button className="btn" onClick={() => handleDelete(row.ID, row.Name)}>Delete User</button>
                            </td>
                            <td colSpan={2}>
                                <button className="btn" onClick={() => handleUpdate(row.ID)}>Update User</button>
                            </td>
                        </tr>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataGrid;
