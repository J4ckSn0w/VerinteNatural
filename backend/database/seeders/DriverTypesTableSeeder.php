<?php

namespace Database\Seeders;

use Carbon\Carbon;
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
            'name' => 'Repartidor',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('driver_types')->insert([
            'id' => 2,
            'name' => 'Recolector',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
