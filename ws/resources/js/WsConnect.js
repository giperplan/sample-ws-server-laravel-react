import React, {useEffect, useState} from 'react';

import DynamicTable from "./DynamicTable";

function WsConnect() {
    const [currencies, setCurrencies] = useState([]);

    // Вливаем новые значения в существующие и ставим для них флаг подсветки
    function updateCurrencies(newCurrencies) {
        setCurrencies(prevCurrencies => {
             return prevCurrencies.map(prevCurrency => {
                 const newCurrency = newCurrencies.find(newCurrency => {
                     return  newCurrency.currencyCodeA === prevCurrency.currencyCodeA && newCurrency.currencyCodeB === prevCurrency.currencyCodeB
                 });
                 if (newCurrency) {
                     newCurrency.highlight = true;
                     return newCurrency;
                 } else {
                     return prevCurrency;
                 }
             });
        });
    }
    //Отключаем флаг подсветки у всех
    function flushCurrencies() {
        setCurrencies(prevCurrencies => {
            return prevCurrencies.map( prevCurrency => {
                prevCurrency.highlight = false;
                return prevCurrency;
            });
        });
    }

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8090');

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.type === 'update') {
                updateCurrencies(response.data);
                setTimeout(()=>{
                    flushCurrencies();
                },1000);
            } else if (response.type === 'all') {
                setCurrencies(response.data);
            }
        };
        socket.onopen = (event) => {
            console.log('Соединение установлено');
        };
        socket.onclose = (event) => {
            console.log('Соединение закрыто');
        };
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <DynamicTable data={currencies} />
        </div>
    );
}

export default WsConnect;
