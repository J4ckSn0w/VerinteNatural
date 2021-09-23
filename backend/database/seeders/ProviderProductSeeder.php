<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProviderProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product_provider')->insert([
            'product_id' => 1,
            'provider_id' => 1,
            'price' => 32
        ]);

        DB::table('product_provider')->insert([
            'product_id' => 2,
            'provider_id' => 1,
            'price' => 19
        ]);

        DB::table('product_provider')->insert([
            'product_id' => 3,
            'provider_id' => 1,
            'price' => 10
        ]);

        DB::table('product_provider')->insert([
            'product_id' => 5,
            'provider_id' => 1,
            'price' => 67
        ]);

        DB::table('product_provider')->insert([
            'product_id' => 7,
            'provider_id' => 1,
            'price' => 89
        ]);

        DB::table('product_provider')->insert([
            'product_id' => 6,
            'provider_id' => 2,
            'price' => 12
        ]);

        DB::table('product_provider')->insert([
            'product_id' => 5,
            'provider_id' => 2,
            'price' => 54
        ]);

        DB::table('product_provider')->insert([
            'product_id' => 7,
            'provider_id' => 2,
            'price' => 23
        ]);

        DB::table('product_provider')->insert([
            'product_id' => 4,
            'provider_id' => 1,
            'price' => 32
        ]);

        DB::table('product_provider')->insert([
            'product_id' => 1,
            'provider_id' => 2,
            'price' => 31
        ]);
    }
}
