<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'id' => 1,
            'name' => 'Fresa',
            'product_type_id' => 1,
            'description' => 'Descripción del producto',
            'sku' => 'FRFA05W000001',
            'minium_stock' => 120,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('products')->insert([
            'id' => 2,
            'name' => 'Mango',
            'product_type_id' => 2,
            'description' => 'Descripción del producto',
            'sku' => 'FRMO05W000002',
            'minium_stock' => 120,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('products')->insert([
            'id' => 3,
            'name' => 'Durazno',
            'product_type_id' => 3,
            'description' => 'Descripción del producto',
            'sku' => 'FRD007A000003',
            'minium_stock' => 120,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('products')->insert([
            'id' => 4,
            'name' => 'Manzana',
            'product_type_id' => 4,
            'description' => 'Descripción del producto',
            'sku' => 'FRMA07E000004',
            'minium_stock' => 120,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('products')->insert([
            'id' => 5,
            'name' => 'Aguacate',
            'product_type_id' => 5,
            'description' => 'Descripción del producto',
            'sku' => 'FRAE08S000005',
            'minium_stock' => 120,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('products')->insert([
            'id' => 6,
            'name' => 'Cebolla',
            'product_type_id' => 6,
            'description' => 'Descripción del producto',
            'sku' => 'VECA07V000006',
            'minium_stock' => 120,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('products')->insert([
            'id' => 7,
            'name' => 'Jitomate',
            'product_type_id' => 7,
            'description' => 'Descripción del producto',
            'sku' => 'VEJE08P000007',
            'minium_stock' => 120,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
