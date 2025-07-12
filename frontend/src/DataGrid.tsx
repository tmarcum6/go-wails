import React, { useState, useEffect } from 'react';
import { GetUsers } from '../wailsjs/go/main/App';
import { main } from '../wailsjs/go/models';

const DataGrid: React.FC = () => {
    const [data, setData] = useState<main.User[]>([]);

    useEffect(() => {
        GetUsers().then(setData).catch(console.error);
    }, []);

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
                    </tr>
                ))}
            </tbody>
        </table>

    );

};

export default DataGrid;
