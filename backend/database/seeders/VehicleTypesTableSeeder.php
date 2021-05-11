<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('vehicle_types')->insert([
            'id' => 1,
            'name' => 'Motocicleta',
            'max_weight' => 20,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('vehicle_types')->insert([
            'id' => 2,
            'name' => 'Camion mediano',
            'max_weight' => 500,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('vehicle_types')->insert([
            'id' => 3,
            'name' => 'Camion grande',
            'max_weight' => 100,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('vehicle_types')->insert([
            'id' => 4,
            'name' => 'Camioneta',
            'max_weight' => 120,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
