<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleRequest;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            return response()->json(['data' => Vehicle::all()], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param VehicleRequest $request
     * @return JsonResponse
     */
    public function store(VehicleRequest $request): JsonResponse
    {
        try {
            $vehicle = Vehicle::create($request->all());
            return response()->json(['data' => $vehicle], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            return response()->json(['data' => Vehicle::findOrfail($id)->load('vehicle_type')], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request,int $id): JsonResponse
    {
        try {
            $vehicle = Vehicle::findOrfail($id);
            $vehicle->fill($request->all());
            $vehicle->save();
            return response()->json(['data' => $vehicle], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $vehicle = Vehicle::findOrfail($id);
            $vehicle->delete();
            return response()->json(['data' => $vehicle], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
