<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('employees')->insert([
            'id' => 1,
            'employee_number' => 'AD00001',
            'employee_type_id' => 1,
            'user_id' => 1,
            'warehouse_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('employees')->insert([
            'id' => 2,
            'employee_number' => 'VE00002',
            'employee_type_id' => 3,
            'user_id' => 2,
            'warehouse_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('employees')->insert([
            'id' => 3,
            'employee_number' => 'VE00003',
            'employee_type_id' => 3,
            'user_id' => 3,
            'warehouse_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('employees')->insert([
            'id' => 4,
            'employee_number' => 'VE00004',
            'employee_type_id' => 3,
            'user_id' => 4,
            'warehouse_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('employees')->insert([
            'id' => 5,
            'employee_number' => 'AL000005',
            'employee_type_id' => 2,
            'user_id' => 5,
            'warehouse_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('employees')->insert([
            'id' => 6,
            'employee_number' => 'AL000006',
            'employee_type_id' => 2,
            'user_id' => 6,
            'warehouse_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('employees')->insert([
            'id' => 7,
            'employee_number' => 'CO00007',
            'employee_type_id' => 4,
            'user_id' => 7,
            'warehouse_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('employees')->insert([
            'id' => 8,
            'employee_number' => 'CO00008',
            'employee_type_id' => 4,
            'user_id' => 8,
            'warehouse_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('employees')->insert([
            'id' => 9,
            'employee_number' => 'CO00009',
            'employee_type_id' => 4,
            'user_id' => 9,
            'warehouse_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
