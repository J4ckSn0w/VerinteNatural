<?php

namespace Database\Seeders;

use App\Models\Municipality;
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
        $this->call(StatesTableSeeder::class);
        $this->call(MunicipalitiesTableSeeder::class);

        // Real Data
        $this->call(UsersTableSeeder::class);
    }
}
