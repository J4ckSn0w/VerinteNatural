<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WarehouseTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('warehouse_types')->insert([
            'id' => 1,
            'name' => 'Materia Prima',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
