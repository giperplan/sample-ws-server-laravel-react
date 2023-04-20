<?php

namespace App\Console\Commands;

use App\Models\Models\ApiModel;
use App\Models\Models\WsClient;
use Illuminate\Console\Command;

class UpdateCurrenciesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update-currencies';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Ищем обновления
        $diff = (new ApiModel())->getLastDiff();

        echo 'Обновлено '.count($diff)." валют\n";

        //отправляем всем через ws
        if ($diff or 1) {
            WsClient::sendToAll(['type' => 'update', 'data'=>$diff]);
        }

        return 0;
    }
}
