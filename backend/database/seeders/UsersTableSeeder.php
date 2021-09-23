<?php

namespace Database\Seeders;

use Carbon\Carbon;
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
            'id' => 1,
            'name' => 'Administrador',
            'email' => 'administrador@email.com',
            'password' => bcrypt('12345678'),
            'phone_number' => '4490000000',
            'user_type_id' => 2,
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'id' => 2,
            'name' => 'Jefe de ventas',
            'email' => 'jefe_ventas@email.com',
            'password' => bcrypt('12345678'),
            'phone_number' => '4490000011',
            'user_type_id' => 2,
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'id' => 3,
            'name' => 'Agente de servicio al cliente',
            'email' => 'servicio_cliente@email.com',
            'password' => bcrypt('12345678'),
            'phone_number' => '4490000012',
            'user_type_id' => 2,
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'id' => 4,
            'name' => 'Repartidor',
            'email' => 'repartidor@email.com',
            'password' => bcrypt('12345678'),
            'phone_number' => '4490000013',
            'user_type_id' => 2,
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'id' => 5,
            'name' => 'Jefe de almacen',
            'email' => 'jefe_almacen@email.com',
            'password' => bcrypt('12345678'),
            'phone_number' => '4490000021',
            'user_type_id' => 2,
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'id' => 6,
            'name' => 'Almacenista',
            'email' => 'almacenista@email.com',
            'password' => bcrypt('12345678'),
            'phone_number' => '4490000022',
            'user_type_id' => 2,
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'id' => 7,
            'name' => 'Jefe de compras',
            'email' => 'jefe_compras@email.com',
            'password' => bcrypt('12345678'),
            'phone_number' => '4490000031',
            'user_type_id' => 2,
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'id' => 8,
            'name' => 'Compras',
            'email' => 'compras@email.com',
            'password' => bcrypt('12345678'),
            'phone_number' => '4490000032',
            'user_type_id' => 2,
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'id' => 9,
            'name' => 'Recolector',
            'email' => 'recolector@email.com',
            'password' => bcrypt('12345678'),
            'phone_number' => '4490000033',
            'user_type_id' => 2,
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
