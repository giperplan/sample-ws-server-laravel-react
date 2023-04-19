import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

function Сurrencies() {
    return (
        <div>
            <h1>Hello, World!</h1>
        </div>
    );
}

if (document.getElementById('currencies')) {
    createRoot(document.getElementById('currencies')).render(<Сurrencies />);
}
