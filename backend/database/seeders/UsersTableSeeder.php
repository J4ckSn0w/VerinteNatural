<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'id' => '1',
            'name' => 'Administrador',
            'email' => 'admin@email.com',
            'password' => bcrypt('12345678'),
            'phone_number' => '4490000000',
            'user_type_id' => 1
        ]);
    }
}
