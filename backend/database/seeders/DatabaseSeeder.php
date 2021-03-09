<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Catalogs
        $this->call(UserTypesTableSeeder::class);

        // Real Data
        $this->call(UsersTableSeeder::class);
    }
}
