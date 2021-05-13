<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Http\JsonResponse;


class AuthController extends Controller
{
    /**
     * Login 
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
                    'user_type_id' => $user->user_type_id,
                    'employee_id' => $user->employee->id,
                    'created_at' => $user->created_at,
                    'accessToken' => $token
                ], 200);
            } else {
                return response()->json(['errors' => ['authentication' => ['Verifique su información']]], 401);
            }
        } catch (Exception $e) {
            return response()->json(['errors' => ['server_error' => $e->getMessage()]], 401);
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

            $abilities = $user->getAbilities()->map(function ($ability) {
                return $ability->name;
            });


            return response()->json(
                [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone_number' => $user->phone_number,
                    'user_type_id' => $user->user_type_id,
                    'employee_id' => $user->employee->id,
                    'created_at' => $user->created_at,
                    'abilities' => $abilities
                ]
            );
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 401);
        }
    }
}
