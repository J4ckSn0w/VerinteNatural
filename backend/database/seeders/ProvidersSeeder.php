<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvidersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('providers')->insert([
            'id' => 1,
            'name' => 'La huerta',
            'address' => 'Cerca de San Pancho',
            'email' => 'huerta@email.com',
            'phone_number' => '4492321256',
            'schedule' => '24/7',
            'business_name' => 'La Huerta SA de CV',
            'contact_job' => 'Agente de ventas',
            'contact_name' => 'Ruben Sambueza',
            'bank_account' => '793987123713218',
            'bank' => 'Bancomer',
            'payment_form_id' => 1,
            'credit' => 30000,
            'max_purchase_allowed' => 120,
            'is_producer' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('providers')->insert([
            'id' => 2,
            'name' => 'El huerto',
            'address' => 'Cerca de San Pancho',
            'email' => 'huerto@email.com',
            'phone_number' => '4492321223',
            'schedule' => 'Lunes a Viernes',
            'business_name' => 'El Huerto y asociados',
            'contact_job' => 'Jefe de ventas',
            'contact_name' => 'Javier López',
            'bank_account' => '8798383739493',
            'bank' => 'City Banamex',
            'payment_form_id' => 2,
            'credit' => 10000,
            'max_purchase_allowed' => 50,
            'is_producer' => 0,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
