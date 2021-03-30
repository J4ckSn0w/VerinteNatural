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
        DB::table('user_types')
            ->updateOrInsert(['id' => '1', 'name'  => 'Administrador']);

        DB::table('user_types')
            ->updateOrInsert(['id' => '2', 'name'  => 'Empleado']);

        DB::table('user_types')
            ->updateOrInsert(['id' => '3', 'name'  => 'Cliente']);
    }
}
