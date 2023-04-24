import React from 'react';
import TableRow from './TableRow';

function DynamicTable(props) {
    const { data } = props;

    if (data.length === 0) {
        return (
            <div>Loading</div>
        );
    } else {
        const columns = Object.keys(data[0]).filter((item => item!=='highlight'));
        return (
            <table className="table">
                <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map(item => {
                    let key = `${item.currencyCodeA}-${item.currencyCodeB}`;
                    return (
                        <TableRow key={key} item={item} columns={columns}/>
                    )
                })}
                </tbody>
            </table>
        );
    }
}

export default DynamicTable;
