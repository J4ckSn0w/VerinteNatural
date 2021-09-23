<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserPasswordRequest;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\URL;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return mixed
     */
    public function getProfileData()
    {
        try {
            return response()->json(['data' => User::findOrfail(Auth::id())], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserRequest $request
     * @param int $id
     * @return mixed
     */
    public function updateProfileData(UserRequest $request)
    {
        try {
            $user = User::findOrfail(Auth::id());
            $user->name =  $request->name;
            $user->phone_number = $request->phone_number;
            $user->save();

            return response()->json(['data' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
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

            return redirect()->to('email/confirmed');
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Change the password of Auth user
     * @param UserPasswordRequest $request
     * @return JsonResponse
     */
    public function changePassword(UserPasswordRequest $request): JsonResponse
    {
        try {
            $this->changeNewPassword(Auth::user()->id, $request->new_password);
            return response()->json(['data' => ['msg' => 'success']], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Sent Email to reset password
     * @param Request $request
     * @return JsonResponse
     */
    public function sendEmailToResetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'username' => 'required'
        ]);
        try {
            $user = User::findForPassport($request->username);
            if ($user) {
                $token = Password::createToken($user);
                $url = URL::temporarySignedRoute(
                    'password.reset',
                    now()->addMinutes(30),
                    ['token' => $token, 'object' => $user->id]
                );
                $user->notify(new ResetPasswordNotification($url));
            }
            return response()->json(['data' => ['msg' => 'ok']], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    public function setNewPassword(Request $request, $user_id, $token)
    {

        $request->validate([
            'new_password' => 'required|confirmed|min:8'
        ]);

        try {
            $user = User::find($user_id);
            $canChange = Password::tokenExists($user, $token);
            if ($canChange)
                $this->changeNewPassword($user_id, $request->new_password);

            return redirect('/password/changed');
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    public function changeNewPassword($user_id, $new_password)
    {
        try {
            $user = User::find($user_id);
            $user->password = bcrypt($new_password);
            $user->save();
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
