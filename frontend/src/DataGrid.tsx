import React, { useState } from 'react';
import { AddUser, DeleteUser, UpdateUser, GetUsers } from '../wailsjs/go/main/App';

interface Data {
    id: number;
    name: string;
}

const DataGrid: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);

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
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataGrid;
