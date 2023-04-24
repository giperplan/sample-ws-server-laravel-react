import React from 'react';

function TableRow(props) {
    const { item, columns } = props;

    function ts2date(timestamp) {
        const now = new Date(timestamp * 1000);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
    }

    return (
        <tr className={item.highlight ? 'highlight' : ''}>
            {columns.map(column => {
                let value = '';
                if (column === 'date') {
                    value = ts2date(item[column]);
                } else {
                    value = item[column];
                }
                return (
                    <td key={column}>
                        {value}
                    </td>
                )
            })}
        </tr>
    );
}

export default TableRow;
