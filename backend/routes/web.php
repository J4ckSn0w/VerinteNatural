<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/email/confirm/{user_id}', [\App\Http\Controllers\client\UserController::class, 'confirmEmail'])->name('confirm.email');
Route::view('email/confirmed/', 'emails.confirmed')->name('EmailIsConfirmed');
Route::view('password/changed/', 'auth.passwordSuccess')->name('PasswordChanged');

Route::get('/_reset_password', function() {
    return view('auth.newPassword');
})->name('password.reset');


//Route::view('email/preview', 'emails.verifyEmail');

// TODO: redirect to Angular Home
Route::view('/', 'welcome')->name('home');
