<?php

namespace App\Http\Controllers;

use App\Models\UserType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        try {
            return response()->json(['data' => UserType::all()]);
        } catch(\Exception $e) {
            return response()->json(['error' => 'No fue posible realizar la consulta']);
        }
    }
}
