<?php

// Facades
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;
use \Illuminate\Auth\Events\PasswordReset;

// Admin Controllers
use App\Http\Controllers\admin\AuthController as AuthControllerAdmin;
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
use App\Http\Controllers\admin\LogController;
use App\Http\Controllers\admin\ProductController as ProductControllerAdmin;
use App\Http\Controllers\admin\ProductTypeController;

// Client Controllers
use App\Http\Controllers\client\AuthController as AuthControllerClient;
use App\Http\Controllers\client\UserController;
use App\Http\Controllers\client\AddressController;
use App\Models\ProductType;

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

        // End API Rest


        // Singles api route

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
