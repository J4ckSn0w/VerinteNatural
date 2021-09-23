<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('units')->insert([
            'id' => 1,
            'name' => 'kg',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('units')->insert([
            'id' => 2,
            'name' => 'pieza',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('units')->insert([
            'id' => 3,
            'name' => 'caja',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('units')->insert([
            'id' => 4,
            'name' => 'manojo',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
