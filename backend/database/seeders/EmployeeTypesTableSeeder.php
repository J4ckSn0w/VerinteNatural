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
            'name' => 'Administración',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('employee_types')->updateOrInsert([
            'id' => 2,
            'name' => 'Almácen',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('employee_types')->updateOrInsert([
            'id' => 3,
            'name' => 'Ventas',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('employee_types')->updateOrInsert([
            'id' => 4,
            'name' => 'Compras',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
