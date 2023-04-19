import React, { useState } from 'react';
import TableRow from './TableRow';

function DynamicTable() {
    const [data, setData] = useState([
        { id: 1, name: 'John', age: 28 },
        { id: 2, name: 'Jane', age: 32 },
        { id: 3, name: 'Mike', age: 45 }
    ]);

    const columns = Object.keys(data[0]);

    return (
        <table>
            <thead>
            <tr>
                {columns.map(column => (
                    <th key={column}>{column}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map(item => (
                <TableRow key={item.id} item={item} columns={columns} />
            ))}
            </tbody>
        </table>
    );
}

export default DynamicTable;
