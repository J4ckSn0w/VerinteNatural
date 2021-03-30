<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('driver_types')->insert([
            'id' => 1,
            'name' => 'Repartidor'
        ]);

        DB::table('driver_types')->insert([
            'id' => 2,
            'name' => 'Recolector'
        ]);
    }
}
