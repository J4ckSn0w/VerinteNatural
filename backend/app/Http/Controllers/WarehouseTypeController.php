<?php

namespace App\Http\Controllers;

use App\Http\Requests\WarehouseTypeRequest;
use App\Models\WarehouseType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class WarehouseTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            return response()->json(['data' => WarehouseType::all()], 200);
        } catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param WarehouseTypeRequest $request
     * @return JsonResponse
     */
    public function store(WarehouseTypeRequest $request): JsonResponse
    {
        try {
            $warehouseType = WarehouseType::create($request->all());
            return response()->json(['data' => $warehouseType], 201);
        } catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 400);
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
            return response()->json(['data' => WarehouseType::findOrfail($id)], 200);
        } catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param WarehouseTypeRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(WarehouseTypeRequest $request, int $id): JsonResponse
    {
        try {
            $warehouseType = WarehouseType::findOrfail($id);
            $warehouseType->fill($request->all());
            $warehouseType->save();
            return response()->json(['data' => $warehouseType], 200);
        } catch(\Exception $e){
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
            $warehouseType = WarehouseType::findOrfail($id);
            $warehouseType->delete();
            return response()->json(['data' => $warehouseType], 200);
        } catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
