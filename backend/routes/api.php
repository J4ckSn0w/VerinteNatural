<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\UserTypeController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\VehicleTypeController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\WarehouseTypeController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\EmployeeTypeController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\DriverTypeController;
use App\Http\Controllers\UserController;

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

// Login
Route::post('login', [AuthController::class, 'login'])->middleware('client.secret');

// Customer Register
Route::post('register', [AuthController::class, 'register']);

//\Illuminate\Support\Facades\Auth::routes(['verify' => true]);
Route::middleware('auth:api')->group(function() {

    // Logout
    Route::post('logout', [AuthController::class, 'logout']);


    // API Rest

    // Users resource
    Route::apiResource('users', UserController::class)
        ->except(['edit', 'create', 'store', 'delete']);

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
    Route::get('info', [AuthController::class, 'getAuthUser']);

    // User Types resource
    Route::get('user/types', [UserTypeController::class, 'index']);

    // Customer resource
    Route::apiResource('customers', CustomerController::class)
        ->except(['edit', 'create', 'store']);

    // Addresses of Customers
    Route::apiResource('addresses', AddressController::class)
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

    // End API Rest

    // Singles api route

    // Change password of Auth user
    Route::put('_password', [UserController::class, 'changePassword']);

    // Change profile info of Auth user
    Route::put('_user', [UserController::class, 'updateProfileData']);

    // Get profile info of Auth user
    Route::get('_user', [UserController::class, 'getProfileData']);

    // End Singles api route
});

