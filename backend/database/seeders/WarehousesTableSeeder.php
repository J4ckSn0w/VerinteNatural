<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WarehousesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('warehouses')->insert([
            'id' => 1,
            'name' => 'Principal',
            'address' => 'Mar de las antillas #602, Aguascalientes, Ags',
            'leader_id' => null,
            'warehouse_type_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
