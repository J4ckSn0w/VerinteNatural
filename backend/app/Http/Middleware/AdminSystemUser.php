<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class AdminSystemUser
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

        if ($user && $user->user_type_id != 3)
            return $next($request);
        else  
            return response()->json(['error', ['errors' => ['server_error' => 'Unauthorized']]], 401);
    }
}
