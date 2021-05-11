<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AssignRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::find(1);
        $admin->assign('admin');

        $sales_manager = User::find(2);
        $sales_manager->assign('sales_manager');

        $customer_service_employee = User::find(3);
        $customer_service_employee->assign('customer_service_employee');

        $delivery = User::find(4);
        $delivery->assign('delivery');

        $warehouse_manager = User::find(5);
        $warehouse_manager->assign('warehouse_manager');

        $warehouse_employee = User::find(6);
        $warehouse_employee->assign('warehouse_employee');

        $purchasing_manager = User::find(7);
        $purchasing_manager->assign('purchasing_manager');

        $purchasing_employee = User::find(8);
        $purchasing_employee->assign('purchasing_employee');

        $purchasing_gatherer = User::find(9);
        $purchasing_gatherer->assign('purchasing_gatherer');
    }
}
