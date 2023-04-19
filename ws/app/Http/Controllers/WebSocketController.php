<?php

namespace App\Http\Controllers;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class WebSocketController implements MessageComponentInterface
{
    protected $connections;

    public function __construct()
    {
        $this->connections = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $connection)
    {
        $this->connections->attach($connection);
        echo "Connection opened ({$connection->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        foreach ($this->connections as $connection) {
            if ($connection !== $from) {
                $connection->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $connection)
    {
        $this->connections->detach($connection);
        echo "Connection closed ({$connection->resourceId})\n";
    }

    public function onError(ConnectionInterface $connection, \Exception $e)
    {
        echo "An error occurred: {$e->getMessage()}\n";
        $connection->close();
    }
}
