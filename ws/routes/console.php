<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Http\Controllers\WebSocketController;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('websocket:serve', function () {
    $port = config('ws.port');
    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new WebSocketController()
            )
        ),
        $port
    );

    Artisan::call('update-currencies');

    $this->line("Server started. See http://127.0.0.1:8000");
    $this->line("WebSocket server started on port {$port}.");

    $server->run();
})->describe('Start the WebSocket server.');
