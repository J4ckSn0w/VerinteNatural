<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleTypeRequest;
use App\Models\VehicleType;
use Illuminate\Http\JsonResponse;

class VehicleTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            return response()->json(['data' => VehicleType::all()], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param VehicleTypeRequest $request
     * @return JsonResponse
     */
    public function store(VehicleTypeRequest $request): JsonResponse
    {
        try {
            $vehicleType = VehicleType::create($request->all());
            return response()->json(['data' =>$vehicleType], 201);
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
    public function show($id): JsonResponse
    {
        try {
            return response()->json(['data' => VehicleType::findOrfail($id)], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param VehicleTypeRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(VehicleTypeRequest $request, $id): JsonResponse
    {
        try {
            $vehicleType = VehicleType::findOrfail($id);
            $vehicleType->fill($request->all());
            $vehicleType->save();
            return response()->json(['data' => $vehicleType], 200);
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
    public function destroy($id): JsonResponse
    {
        try {
            $vehicleType = VehicleType::findOrfail($id);
            $vehicleType->delete();
            return response()->json(['data' => $vehicleType], 200);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
