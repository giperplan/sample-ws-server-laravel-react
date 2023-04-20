<?php

namespace App\Models\Models;
use Illuminate\Database\Eloquent\Model;
use function Ratchet\Client\connect;

class WsClient extends Model
{
    /**
     * Отправка сообщения на ws-server
     */
   public static function sendToAll(Array $data) {

       connect('ws://localhost:'.config('ws.port'))->then(function($conn) use ($data) {
           $conn->send(json_encode($data));
           $conn->close();
       }, function ($e) {
           echo "Could not connect: {$e->getMessage()}\n";
       });
   }
}
