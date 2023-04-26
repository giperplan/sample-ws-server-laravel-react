import React, {useEffect, useState} from 'react';

import DynamicTable from "./DynamicTable";

function WsConnect() {
    const [currencies, setCurrencies] = useState([]);
    const [secondsPass, setSecondsPass] = useState(0);
    const [isConnect, setIsConnect] = useState(false);

    let updateTS =  new Date();

    function newUpdateTS() {
        updateTS = new Date();
    }

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
        const socket = new WebSocket('ws://127.0.0.1:8090');

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.type === 'update') {
                updateCurrencies(response.data);
                setTimeout(()=>{
                    flushCurrencies();
                    newUpdateTS();
                },1000);
            } else if (response.type === 'all') {
                setCurrencies(response.data);
                newUpdateTS();
            }
        };
        socket.onopen = (event) => {
            setIsConnect(true);
        };
        socket.onclose = (event) => {
            setIsConnect(false)
        };

        setInterval(()=>{
            setSecondsPass(Math.round(((new Date()) - updateTS)/1000));
        }, 1000);

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            {isConnect ? (
                <div className="alert alert-primary" role="alert">
                    Connected. last updated {secondsPass} seconds ago
                </div>
            ):(
                <div className="alert alert-danger" role="alert">
                    Disconnected
                </div>
            )}
            <h1>Currency rate table</h1>
            <DynamicTable data={currencies} />
        </div>
    );
}

export default WsConnect;
