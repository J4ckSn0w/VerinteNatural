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


        //

        // Admin Role
        $admin = Bouncer::role()->firstOrCreate([
            'name' => 'admin',
            'title' => 'Administrador',
            'employee_type_id' => 1
        ]);

        // Assign Admin role to user with ID 1
        Bouncer::assign($admin)->to(User::find(1));

        // Abilities of role
        $this->addAbilitiesToRole(
            [
                'role' => $admin,
                'abilities_modules' => [$warehouses, $employees, $products, $orders]
            ]
        );

        // Warehouse leader
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'warehouse_leader',
                    'title' => 'Encargado de almácen',
                    'employee_type_id' => 2
                ]),
                'abilities_modules' => [$warehouses]
            ]
        );


        // Warehouse leader
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'delivery',
                    'title' => 'Repartidor',
                    'employee_type_id' => 3
                ]),
                'abilities_modules' => [['orders_index', 'orders_show', 'orders_complete']]
            ]
        );

        // Warehouse leader
        $this->addAbilitiesToRole(
            [
                'role' => Bouncer::role()->firstOrCreate([
                    'name' => 'gatherer',
                    'title' => 'Recolector',
                    'employee_type_id' => 3
                ]),
                'abilities_modules' => []
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
