import React from 'react';

function TableRow(props) {
    const { item, columns, handleChange } = props;

    return (
        <tr>
            {columns.map(column => (
                <td key={`${item.id}-${column}`}>
                    {item[column]}
                </td>
            ))}
        </tr>
    );
}

export default TableRow;
