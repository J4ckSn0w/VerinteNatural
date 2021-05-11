<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'id' => 1,
            'name' => 'Frutas',
            'code' => 'FR',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('categories')->insert([
            'id' => 2,
            'name' => 'Verduras',
            'code' => 'VE',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('categories')->insert([
            'id' => 3,
            'name' => 'Cereales',
            'code' => 'CE',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('categories')->insert([
            'id' => 4,
            'name' => 'Legumbres',
            'code' => 'LE',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('categories')->insert([
            'id' => 5,
            'name' => 'Tuberculos',
            'code' => 'TU',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('categories')->insert([
            'id' => 6,
            'name' => 'Lacteos',
            'code' => 'LA',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
