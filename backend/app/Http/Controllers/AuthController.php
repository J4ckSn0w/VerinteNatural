<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Routing\Controller;
use Exception;

class AuthController extends controller{
    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
       try {
            //get username (default is :email)
            $username = $request->username;

            //get user
            //change to 'email' if you want
            $user = User::findForPassport($username);

            if ($user) {
                if (auth()->attempt(['email' => $user->email, 'password' => $request->password])) {
                    $token = $user->createToken('Personal Access Token')->accessToken;
                    $user->only('id', 'name', 'email', 'phone_number', 'user_type_id', 'created_at', 'updated_at');
                    return response()->json(array_merge($user->attributesToArray(),
                        ['photo' => $user->customer ? $user->customer->photo : "",
                            'rfc' => $user->customer ? $user->customer->rfc : "",
                            'accessToken' => $token
                        ]
                    ));
                } else {
                    return response()->json(['error' => 'Verifique su información'], 401);
                }
            }

        } catch(Exception $e) {
            return response()->json(['error' => 'Verifique su información'], 401);
        }
        return response()->json(['error' => 'Verifique su información'], 401);
    }

    public function register(CustomerRequest $request): \Illuminate\Http\JsonResponse
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->phone_number = $request->phone_number;
        $user->user_type_id = Customer::getUserTypeID();
        $user->save();

        $user->setCustomer(['photo' => $request->photo, 'rfc' => $request->rfc]);
        $token = $user->createToken('Personal Access Token')->accessToken;

        return response()->json(array_merge($user->attributesToArray(),
            ['photo' => $user->customer->photo,
                'rfc' => $user->customer->rfc,
                'accessToken' => $token
            ]
        ));
    }

}
