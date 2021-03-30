<?php

namespace App\Http\Controllers;

use App\Models\EmployeeType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EmployeeTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            return response()->json(['data' => EmployeeType::all()], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            return response()->json(['data' => EmployeeType::find($id)], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }
}
