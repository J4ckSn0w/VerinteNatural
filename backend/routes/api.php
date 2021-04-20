<?php

// Facades
use Illuminate\Support\Facades\Route;

// Admin Controllers
use App\Http\Controllers\admin\AuthController as AuthControllerAdmin;
use App\Http\Controllers\admin\BatchController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\EmployeeController;
use App\Http\Controllers\admin\UserTypeController;
use App\Http\Controllers\admin\CustomerController;
use App\Http\Controllers\admin\VehicleTypeController;
use App\Http\Controllers\admin\VehicleController;
use App\Http\Controllers\admin\WarehouseTypeController;
use App\Http\Controllers\admin\WarehouseController;
use App\Http\Controllers\admin\EmployeeTypeController;
use App\Http\Controllers\admin\DriverController;
use App\Http\Controllers\admin\DriverTypeController;
use App\Http\Controllers\admin\IncidentController;
use App\Http\Controllers\admin\InventoryController;
use App\Http\Controllers\admin\LogController;
use App\Http\Controllers\admin\MileageRecordController;
use App\Http\Controllers\admin\ProductController as ProductControllerAdmin;
use App\Http\Controllers\admin\ProductTypeController;
use App\Http\Controllers\admin\ProviderController;
use App\Http\Controllers\admin\PurchaseOrderController;
use App\Http\Controllers\admin\RequisitionController;
use App\Http\Controllers\admin\UnitController;
// Client Controllers
use App\Http\Controllers\client\AuthController as AuthControllerClient;
use App\Http\Controllers\client\UserController;
use App\Http\Controllers\client\AddressController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// System Admin API Routes
Route::prefix('_p1')->group(function () {

    // Login
    Route::post('login', [AuthControllerAdmin::class, 'login'])->middleware('AdminSystemUser');

    //\Illuminate\Support\Facades\Auth::routes(['verify' => true]);
    Route::middleware('auth:api', 'AdminSystemAuth')->group(function () {

        // Logout
        Route::post('logout', [AuthControllerAdmin::class, 'logout']);

        // API Rest

        // Employees resource
        Route::apiResource('employees', EmployeeController::class)
            ->except(['edit', 'create']);

        // Employee Types
        Route::apiResource('employee/types', EmployeeTypeController::class)
            ->except(['edit', 'create']);

        // Drivers resource
        Route::apiResource('drivers', DriverController::class)
            ->except(['edit', 'create', 'store', 'delete']);

        // Drivers resource
        Route::apiResource('driver/types', DriverTypeController::class)
            ->only(['index']);

        // Get info of auth user
        Route::get('info', [AuthControllerAdmin::class, 'getAuthUser']);

        // User Types resource
        Route::get('user/types', [UserTypeController::class, 'index']);

        // Customer resource
        Route::apiResource('customers', CustomerController::class)
            ->except(['edit', 'create']);

        // Vehicle Types
        Route::apiResource('vehicles/types', VehicleTypeController::class)
            ->except(['edit', 'create']);

        // Vehicles
        Route::apiResource('vehicles', VehicleController::class)
            ->except(['edit', 'create']);

        // Warehouse Types
        Route::apiResource('warehouse/types', WarehouseTypeController::class)
            ->except(['edit', 'create']);

        // Warehouses
        Route::apiResource('warehouses', WarehouseController::class)
            ->except(['edit', 'create']);

        // Logs
        Route::apiResource('logs', LogController::class)
            ->only(['index']);

        // Products resource
        Route::apiResource('products', ProductControllerAdmin::class)
            ->except(['edit', 'create']);

        // Product Types resource
        Route::apiResource('product/types', ProductTypeController::class)
            ->except(['edit', 'create']);

        // Providers resources
        Route::apiResource('providers', ProviderController::class)
            ->except(['edit', 'create']);

        // Incidents resources
        Route::apiResource('incidents', IncidentController::class)
            ->except(['edit', 'create', 'update']);

        // Categories resources
        Route::apiResource('categories', CategoryController::class)
            ->only(['index']);

        // Batches resources
        Route::apiResource('batches', BatchController::class)
            ->only(['index', 'show']);

        // Requisitions resources
        Route::apiResource('requisitions', RequisitionController::class)
            ->except(['create', 'edit']);

        // Purchase orders resources
        Route::apiResource('purchase/orders', PurchaseOrderController::class)
            ->except(['create', 'edit']);

        // Units resources
        Route::apiResource('units', UnitController::class)
            ->except(['create', 'edit']);

        // Inventory resources
        Route::apiResource('inventories', InventoryController::class)
            ->except(['create', 'edit', 'store']);

        // Mileage Records index
        Route::get('mileage/records/{vehicle_id}', [MileageRecordController::class, 'index']);

        // Mileage Records store
        Route::post('mileage/records', [MileageRecordController::class, 'store']);

        // End API Rest


        // Singles api route

        // Get abilities
        Route::get('roles/{employee_type_id?}', [EmployeeController::class, 'getRoles']);

        // Change incident status
        Route::put('incidents/{id}/{status}', [IncidentController::class, 'changeStatus']);

        // Change requisition status
        Route::put('requisitions/{id}/{status}', [RequisitionController::class, 'changeStatus']);

        // Change purchase order status
        Route::put('purchase/orders/{id}/{status}', [PurchaseOrderController::class, 'changeStatus']);

        // Change batch status
        Route::put('batches/{id}/{status}', [BatchController::class, 'changeStatus']);

        // Receive Purchase order
        Route::post('purchase/orders/{id}/receive', [PurchaseOrderController::class, 'receive']);

        // Download Report General
        Route::get('vehicles/report', [VehicleController::class, 'vehicleReportGeneral']);

        // Download Report
        Route::get('vehicles/report/{id}/{date_from}/{date_to}', [VehicleController::class, 'vehicleReport']);




        // End Singles api route
    });
});


// E-commerce API Routes
Route::prefix('_p2')->group(function () {
    //TODO: Match new APIs

    // Login
    Route::post('login', [AuthControllerClient::class, 'login'])->middleware('EcommerceUser');

    // Register
    Route::post('register', [AuthControllerClient::class, 'register']);

    // Forgot Password
    Route::post('forgot-password', [UserController::class, 'sendEmailToResetPassword']);

    Route::put('reset-password/{user_id}/{token}', [UserController::class, 'setNewPassword'])->name('setNewPassword');

    //\Illuminate\Support\Facades\Auth::routes(['verify' => true]);
    Route::middleware('auth:api', 'EcommerceAuth')->group(function () {

        // Logout
        Route::post('logout', [AuthControllerClient::class, 'logout']);

        // API Rest

        // Addresses of Customers
        Route::apiResource('addresses', AddressController::class)
            ->except(['edit', 'create']);

        // Get info of auth user
        Route::get('info', [AuthControllerClient::class, 'getAuthUser']); // Change Retorned Info 

        // End API Rest


        // Singles api route

        // Change password
        Route::put('_password', [UserController::class, 'changePassword']);

        // Modified profile info
        Route::put('_user', [UserController::class, 'updateProfileData']);

        // Get profile info
        Route::get('_user', [UserController::class, 'getProfileData']);

        // End Singles api route
    });
});
