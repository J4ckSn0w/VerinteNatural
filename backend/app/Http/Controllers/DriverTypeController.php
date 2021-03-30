<?php

namespace App\Http\Controllers;

use App\Models\DriverType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DriverTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            return response()->json(['data' => DriverType::all()], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
