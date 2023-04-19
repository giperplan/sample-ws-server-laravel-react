<?php
/**
 * @var $ws_port integer
 */
?>
<!DOCTYPE html>
<html>
<head>
    <title>WebSocket Example</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            const socket = new WebSocket('ws://localhost:<?=$ws_port;?>');

            socket.onopen = function (event) {
                console.log('WebSocket is connected.', event);
            };

            socket.onmessage = function (event) {
                console.log('WebSocket message received.', event);
                $('#messages').append('<p>' + event.data + '</p>');
            };

            socket.onclose = function (event) {
                console.log('WebSocket is closed.', event);
            };

            $('#send-btn').click(function () {
                const message = $('#message-input').val();
                socket.send(message);
                $('#message-input').val('');
            });
        });
    </script>
</head>
<body>
<h1>WebSocket Example</h1>
<div id="messages"></div>
<input type="text" id="message-input" placeholder="Enter a message">
<button id="send-btn">Send</button>
</body>
</html>
