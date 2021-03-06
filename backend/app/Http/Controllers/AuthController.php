<?php

namespace App\Http\Controllers;

//use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Exception;
use Response;
use Psr\Http\Message\ServerRequestInterface;
use League\OAuth2\Server\Exception\OAuthServerException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Laravel\Passport\Http\Controllers\AccessTokenController as ATC;

class AuthController extends ATC
{
    public function login(ServerRequestInterface $request) {

        try {
            
            //get username (default is :email)
            $username = $request->getParsedBody()['username'];

            //get user
            //change to 'email' if you want
            $user = User::where('email', '=', $username)->first();


            //generate token
            $tokenResponse = parent::issueToken($request);

            //convert response to json string
            $content = $tokenResponse->getContent();

            //convert json to array
            $data = json_decode($content, true);

            if(isset($data["error"]))
                throw new OAuthServerException('Los datos estan incorrectos', 6, 'invalid_credentials', 401);


            $user = collect($user)->only('id', 'name', 'email', 'phone_number');
            $user->put('access_token', $data['access_token']);

            return Response::json($user);


            //add access token to user

        }
        catch (ModelNotFoundException $e) { // email notfound
            //return error message
            return response(["message" => "Usuario no encontrado"], 422);
        }
        catch (OAuthServerException $e) { //password not correct..token not granted
            //return error message
            return response(["message" => "Los datos estan incorrectos', 6, 'invalid_credentials"], 422);
        }
        catch (Exception $e) {
            return response(["message" => "Error, credenciales invalidas " . $e], 401);
        }
    }

}
