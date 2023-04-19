import React from 'react';
import { createRoot } from 'react-dom/client';
import WsConnect from './WsConnect';



if (document.getElementById('currencies')) {
    createRoot(document.getElementById('currencies')).render(<WsConnect />);
}
