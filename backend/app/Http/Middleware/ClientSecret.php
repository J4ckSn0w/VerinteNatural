<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ClientSecret
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
        if($request->client_secret == config('services.client.secret')
            && $request->client_id == config('services.client.id')
        )
            return $next($request);
        else
            return response()->json(['error' => 'Verifique su información']);
    }
}
