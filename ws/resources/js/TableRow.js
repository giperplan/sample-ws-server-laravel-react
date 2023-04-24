import React from 'react';

function TableRow(props) {
    const { item, columns } = props;

    return (
        <tr className={item.highlight ? 'highlight' : ''}>
            {columns.map(column => (
                <td key={column}>
                    {item[column]}
                </td>
            ))}
        </tr>
    );
}

export default TableRow;
