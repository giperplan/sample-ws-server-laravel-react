<?php

namespace App\Models\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class ApiModel extends Model
{
    function  getFromAPI() {
        return json_decode(Http::get(config('ws.currencies_api_url')), 1);
    }
    function getFromStorage () {
        try {
            $out = file_get_contents(storage_path('app/data_api.json'));
        } catch (\Exception $exception) {
            $out = '';
        }
        return json_decode($out, 1);
    }
    function setToStorage ($data) {
        file_put_contents(storage_path('app/data_api.json'), json_encode($data));
    }

    /**
     * Скачивает с API, сравнивает с предыдущим значением, вычисляет разницу, обновляет локальную версию
     * @return array
     */
    public function getLastDiff () {

        $lastData = $this->getFromAPI();
        $oldData = ($this->getFromStorage());

        $this->setToStorage($lastData);

        return $this->getDiff($lastData, $oldData);
    }

    /**
     * Вычисляет разность между коллекциями. Ларавеловский diff() не справился...
     * @param $lastData
     * @param $oldData
     * @return array
     */
    public function getDiff($lastData, $oldData): array
    {
        $diff = array_diff(array_map('serialize', $lastData), array_map('serialize', $oldData));
        $diff = array_map('unserialize', $diff);
        return $diff;
    }
}
