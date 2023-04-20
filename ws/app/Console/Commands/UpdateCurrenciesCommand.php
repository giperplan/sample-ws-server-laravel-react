<?php

namespace App\Console\Commands;

use App\Models\Models\ApiModel;
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
        $api = new ApiModel();

        // Ищем обновления
        $diff = $api->getLastDiff();

        //todo отправляем всем через ws


        return 0;
    }
}
