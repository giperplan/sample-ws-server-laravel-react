<?php

namespace App\Http\Controllers;

use App\Models\Models\ApiModel;
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
        $connection->send(json_encode([
            'type'=>'all',
            'data'=>(new ApiModel)->getFromStorage()
        ]));
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        // Получаем IP-адрес соединения
        $ipAddress = $from->remoteAddress;
        echo $ipAddress."\n";

        // Определяем, является ли IP-адрес локальным
        $isLocal = in_array($ipAddress, ['127.0.0.1', '::1']);

        if ($isLocal) {
            echo 'Send '.strlen($msg).' Bytes for '.(count($this->connections) - 1)." clients\n";
            foreach ($this->connections as $connection) {
                if ($connection !== $from) {
                    $connection->send($msg);
                }
            }
        } else {
            echo "Send not allowed for ip {$ipAddress}\n";
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
