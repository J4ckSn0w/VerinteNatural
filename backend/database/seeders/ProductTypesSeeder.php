<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product_types')->insert([
            'id' => 1,
            'name' => 'Fresa',
            'category_id' => 1,
            'code' => 'FA05W',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('product_types')->insert([
            'id' => 2,
            'name' => 'Mango',
            'category_id' => 1,
            'code' => 'MO05W',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('product_types')->insert([
            'id' => 3,
            'name' => 'Durazno',
            'category_id' => 1,
            'code' => 'D007A',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('product_types')->insert([
            'id' => 4,
            'name' => 'Manzana',
            'category_id' => 1,
            'code' => 'MA07E',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('product_types')->insert([
            'id' => 5,
            'name' => 'Aguacate',
            'category_id' => 1,
            'code' => 'AE08S',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('product_types')->insert([
            'id' => 6,
            'name' => 'Cebolla',
            'category_id' => 2,
            'code' => 'CA07V',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('product_types')->insert([
            'id' => 7,
            'name' => 'Jitomate',
            'category_id' => 2,
            'code' => 'JE08P',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
