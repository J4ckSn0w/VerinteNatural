<?php

namespace Database\Seeders;

use Carbon\Carbon;
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
        DB::table('employee_types')->updateOrInsert([
            'id' => 1,
            'name' => 'Oficinista',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('employee_types')->updateOrInsert([
            'id' => 2,
            'name' => 'Alamcenista',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()]);
        DB::table('employee_types')->updateOrInsert([
            'id' => 3,
            'name' => 'Conductor',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()]);
        DB::table('employee_types')->updateOrInsert([
            'id' => 4,
            'name' => 'Recepción',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()]);
        DB::table('employee_types')->updateOrInsert([
            'id' => 5,
            'name' => 'Soporte',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()]);
        DB::table('employee_types')->updateOrInsert([
            'id' => 6,
            'name' => 'Servicio al cliente',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()]);
    }
}
