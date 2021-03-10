<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_types')->insert([
            ['id'    => '1', 'name'  => 'Administrador'],
            ['id'    => '2', 'name'  => 'Repartidor'],
            ['id'    => '3', 'name'  => 'Almacenista'],
            ['id'    => '4', 'name'  => 'Cliente']
            ]
        );
    }
}
