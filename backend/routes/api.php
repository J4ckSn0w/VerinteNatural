<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserTypeController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AddressController;

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

    // Users resource
    Route::apiResource('users', UserController::class)
        ->except(['edit', 'create']);

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
});

