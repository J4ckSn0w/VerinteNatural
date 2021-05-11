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
        $this->call(EmployeeTypesTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(UnitsTableSeeder::class);
        $this->call(PaymentFormsTableSeeder::class);

        // Real Data

        // Roles 
        $this->call(AbilitiesAndRoles::class);

        // Develop Data
        $this->call(VehicleTypesTableSeeder::class);
        $this->call(ProductTypesSeeder::class);
        $this->call(ProductsSeeder::class);
        $this->call(ProductImagesSeeder::class);
        $this->call(WarehouseTypesTableSeeder::class);
        $this->call(WarehousesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(AssignRolesSeeder::class);
        $this->call(EmployeesSeeder::class);
        $this->call(ProvidersSeeder::class);
        $this->call(ProviderProductSeeder::class);
    }
}
