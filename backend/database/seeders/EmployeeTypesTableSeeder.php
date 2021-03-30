<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeeTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('employee_types')->updateOrInsert(['id' => 1, 'name' => 'Oficinista']);
        DB::table('employee_types')->updateOrInsert(['id' => 2, 'name' => 'Alamcenista']);
        DB::table('employee_types')->updateOrInsert(['id' => 3, 'name' => 'Conductor']);
        DB::table('employee_types')->updateOrInsert(['id' => 4, 'name' => 'Recepción']);
        DB::table('employee_types')->updateOrInsert(['id' => 5, 'name' => 'Soporte']);
        DB::table('employee_types')->updateOrInsert(['id' => 6, 'name' => 'Servicio al cliente']);
    }
}
