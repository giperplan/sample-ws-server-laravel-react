import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import DynamicTable from "./DynamicTable";

class WsConnect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
        };
    }

    componentDidMount() {
        this.ws = new W3CWebSocket('ws://localhost:8090');
        this.ws.onopen = () => {
            console.log('WebSocket connected');
        };
        this.ws.onmessage = (event) => {
            this.setState({ message: event.data });
        };
        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
        };
    }

    componentDidUpdate() {
        this.ws.send(this.state.message);
    }

    componentWillUnmount() {
        this.ws.close();
    }

    handleMessageChange = (event) => {
        this.setState({ message: event.target.value });
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.message} onChange={this.handleMessageChange} />
                <DynamicTable/>
            </div>
        );
    }
}

export default WsConnect;
