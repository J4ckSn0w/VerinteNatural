<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return mixed
     */
    public function index()
    {
        try {
            return User::all();
        } catch (\Exception $e) {
            return response()->json(['error' => 'No fue posible obtener los usuarios'], 401);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserRequest $request
     * @return mixed
     */
    public function store(UserRequest $request): User
    {
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->phone_number = $request->phone_number;
            $user->user_type_id = $request->user_type_id;
            $user->save();

            $user->sendEmailVerification();

            return $user;
        } catch(\Exception $e) {
            return response()->json(['error' => 'No fue posible crear al usuario'], 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return mixed
     */
    public function show(int $id)
    {
        try {
            return User::findOrfail($id);
        } catch(\Exception $e) {
            return response()->json(['error' => 'No fue posible obtener al usuario'], 401);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserRequest $request
     * @param int $id
     * @return mixed
     */
    public function update(UserRequest $request, int $id)
    {
        try {
            $user = User::findOrfail($id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->phone_number = $request->phone_number;
            $user->user_type_id = $request->user_type_id;
            $user->save();

            return $user;

        } catch(\Exception $e) {
            return response()->json(['error' => 'No fue posible actualizar al usuario'], 401);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Mixed
     */
    public function destroy(int $id)
    {
        try {
            $user = User::findOrfail($id);
            $user->delete();

            return $user;
        } catch (\Exception $e) {
            return response()->json(['error' => 'No fue posible eliminar al usuario'], 401);
        }
    }

    /**
     * Send email to confirm address.
     *
     * @param int $id
     * @return Mixed
     */
    public function confirmEmail(int $id)
    {
        try {
            $user = User::find($id);
            $user->emailVerify();

            return view('emails.confirmed');
        } catch (\Exception $e) {
            return response()->json(['error' => 'No fue posible enviar el correo de confirmación al usuario'], 401);
        }

    }
}
