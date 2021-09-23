<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Bouncer;

class AbilitiesAndRoles extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Abilities
        $warehouses = [
            'warehouses_index',
            'warehouses_show',
            'warehouses_edit',
            'warehouses_create',
            'warehouses_delete'
        ];

        $employees = [
            'employees_index',
            'employees_show',
            'employees_edit',
            'employees_create',
            'employees_delete'
        ];

        $products = [
            'products_index',
            'products_show',
            'products_edit',
            'products_create',
            'products_delete'
        ];

        $orders = [
            'orders_show',
            'orders_complete',
            'orders_create',
            'orders_delete',
            'orders_index',
            'orders_edit'
        ];

        $purchase_orders = [
            'purchase_orders_show',
            'purchase_orders_complete',
            'purchase_orders_create',
            'purchase_orders_delete',
            'purchase_orders_index',
            'purchase_orders_edit'
        ];

        //


        // Admin
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'admin',
                    'title' => 'Administrador',
                    'employee_type_id' => 1,
                    'level' => 1,
                    'section' => 1
                ]),
                'abilities_modules' => [$warehouses, $employees, $products, $orders, $purchase_orders]
            ]
        );


        // Warehouse
        // Warehouse Manager
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'warehouse_manager',
                    'title' => 'Jefe de almácen',
                    'employee_type_id' => 2,
                    'level' => 2,
                    'section' => 1
                ]),
                'abilities_modules' => [$warehouses]
            ]
        );
        // Warehouse employee
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'warehouse_employee',
                    'title' => 'Almacenista',
                    'employee_type_id' => 2,
                    'level' => 3,
                    'section' => 1
                ]),
                'abilities_modules' => [$warehouses]
            ]
        );


        // Sales
        // Sales Manager
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'sales_manager',
                    'title' => 'Jefe de ventas',
                    'employee_type_id' => 3,
                    'level' => 2,
                    'section' => 1
                ]),
                'abilities_modules' => [$products, $orders]
            ]
        );
        // Custom service supervisor
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'customer_service_supervisor',
                    'title' => 'Supervisor de servicio al cliente',
                    'employee_type_id' => 3,
                    'level' => 3,
                    'section' => 2
                ]),
                'abilities_modules' => [$products, $orders]
            ]
        );
        // Delivery
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'delivery',
                    'title' => 'Repartidor',
                    'employee_type_id' => 3,
                    'level' => 4,
                    'section' => 2
                ]),
                'abilities_modules' => [$products, $orders]
            ]
        );
        // Custom service employee
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'customer_service_employee',
                    'title' => 'Ejecutivo de sevicio al cliente',
                    'employee_type_id' => 3,
                    'level' => 4,
                    'section' => 2
                ]),
                'abilities_modules' => [$products, $orders]
            ]
        );
        // Reception
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'reception',
                    'title' => 'Recepción',
                    'employee_type_id' => 3,
                    'level' => 3,
                    'section' => 3
                ]),
                'abilities_modules' => [$products, $orders]
            ]
        );
        // Sales supervisor
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'sales_supervisor',
                    'title' => 'Supervidor de ventas',
                    'employee_type_id' => 3,
                    'level' => 3,
                    'section' => 4
                ]),
                'abilities_modules' => [$products, $orders]
            ]
        );
        // Sales employee
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'sales_employee',
                    'title' => 'Agente de ventas',
                    'employee_type_id' => 3,
                    'level' => 4,
                    'section' => 4
                ]),
                'abilities_modules' => [$products, $orders]
            ]
        );
        // After sales supervisor
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'after_sales_supervisor',
                    'title' => 'Supervisor de post-ventas',
                    'employee_type_id' => 3,
                    'level' => 3,
                    'section' => 5
                ]),
                'abilities_modules' => [$products, $orders]
            ]
        );
        // After sales employee
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'after_sales_employee',
                    'title' => 'Agente de post-ventas',
                    'employee_type_id' => 3,
                    'level' => 4,
                    'section' => 5
                ]),
                'abilities_modules' => [$products, $orders]
            ]
        );





        // Purchasing Manager
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'purchasing_manager',
                    'title' => 'Jefe de compras',
                    'employee_type_id' => 4,
                    'level' => 2,
                    'section' => 1
                ]),
                'abilities_modules' => [$purchase_orders]
            ]
        );
        // Purchasing Employee
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'purchasing_employee',
                    'title' => 'Agente de compras',
                    'employee_type_id' => 4,
                    'level' => 3,
                    'section' => 2
                ]),
                'abilities_modules' => [$purchase_orders]
            ]
        );
        // Purchasing Employee
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'purchasing_gatherer',
                    'title' => 'Recolector',
                    'employee_type_id' => 4,
                    'level' => 3,
                    'section' => 2
                ]),
                'abilities_modules' => [$purchase_orders]
            ]
        );
    }

    public function addAbilitiesToRole($data)
    {
        foreach ($data['abilities_modules'] as $permissions) {
            foreach ($permissions as $permission) {
                Bouncer::allow($data['role'])->to($permission);
            }
        }
    }
}
