<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class EcommerceUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = User::findForPassport($request->username);

        if (!$user)
            return $next($request);

        if ($user && !$user->email_verified_at)
            return response()->json(['errors' => ['no_verified' => ['Correo electrónico no verificado']]], 401);

        if ($user && $user->user_type_id == 3)
            return $next($request);
        else
            return response()->json(['errors' => ['server-error' => ['Error interno, intentelo más tarde']]], 401);
    }
}
