<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\CustomerRequest;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Http\JsonResponse;


class AuthController extends Controller
{

    /**
     * Login user.
     *
     * @param LoginRequest $request
     * @return Mixed
     */
    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
        try {
            //get username (default is :email)
            $username = $request->username;

            //get user
            //change to 'email' if you want
            $user = User::findForPassport($username);

            if ($user && auth()->attempt(['email' => $user->email, 'password' => $request->password])) {
                $token = $user->createToken('Personal Access Token')->accessToken;

                return response()->json([
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone_number' => $user->phone_number,
                    'created_at' => $user->created_at,
                    'email_verified_at' => $user->email_verified_at,
                    'accessToken' => $token,
                    'customer' => $user->customer

                ], 200);
            } else {
                return response()->json(['errors' => ['authentication' => ['Verifique su información']]], 401);
            }
        } catch (Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Register of Customers
     *
     * @param CustomerRequest $request
     * @return Mixed
     */
    public function register(CustomerRequest $request): \Illuminate\Http\JsonResponse
    {
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->phone_number = $request->phone_number;
            $user->user_type_id = Customer::getUserTypeID();
            $user->save();

            $user->setCustomer($request->photo ?? '', $request->rfc ?? '');
            $token = $user->createToken('Personal Access Token')->accessToken;

            $user->sendEmailVerification();

            return response()->json(
                [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone_number' => $user->phone_number,
                    'user_type_id' => $user->user_type_id,
                    'created_at' => $user->created_at,
                    'email_verified_at' => $user->email_verified_at,
                    'accessToken' => $token,
                    'customer' => $user->customer
                ]
            );
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Logout user
     *
     * @return Mixed
     */
    public function logout()
    {
        try {
            return Auth::user()->token()->revoke();
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 401);
        }
    }

    /**
     * Get info of Auth User
     *
     * @return Mixed
     */
    public function getAuthUser()
    {
        try {
            $user = Auth::user();
            return response()->json(
                [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone_number' => $user->phone_number,
                    'user_type_id' => $user->user_type_id,
                    'created_at' => $user->created_at,
                    'email_verified_at' => $user->email_verified_at,
                    'customer' => $user->customer
                ]
            );
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
