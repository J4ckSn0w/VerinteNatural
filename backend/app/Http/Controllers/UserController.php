<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserPasswordRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\URL;

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
            return response()->json(['data' => User::where('user_type_id', '!=', 4)->with('user_type')->get()], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserRequest $request
     * @return mixed
     */
    public function store(UserRequest $request): JsonResponse
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

            return response()->json(['data' => $user], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

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
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
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

        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
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

            return response()->json(['data' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
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
            return response()->json(['error' => $e->getMessage()], 401);
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
            return response()->json(['error' => $e->getMessage()], 400);
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
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function setNewPassword(Request $request, $user_id, $token) {

        $request->validate([
            'new_password' => 'required|confirmed|min:8'
        ]);

        try {
            $user = User::find($user_id);
            $canChange = Password::tokenExists($user, $token);
            if($canChange)
                $this->changeNewPassword($user_id, $request->new_password);

            return redirect('/password/changed');
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function changeNewPassword($user_id, $new_password)
    {
        $user = User::find($user_id);
        $user->password = bcrypt($new_password);
        $user->save();
    }
}
