<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\WarehouseRequest;
use App\Models\Warehouse;
use Illuminate\Http\JsonResponse;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            return response()->json(['data' => Warehouse::all()], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param WarehouseRequest $request
     * @return JsonResponse
     */
    public function store(WarehouseRequest $request): JsonResponse
    {
        try {
            $warehouse = Warehouse::create($request->all());
            return response()->json(['data' => $warehouse], 201);
        } catch (\Exception $e) {
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
            $warehouse = Warehouse::findOrfail($id);
            $warehouse->leader;
            $warehouse->warehouse_type;
            return response()->json(['data' => $warehouse], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param WarehouseRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(WarehouseRequest $request, int $id): JsonResponse
    {
        try {
            $warehouse = Warehouse::findOrfail($id);
            $warehouse->fill($request->all());
            $warehouse->save();
            return response()->json(['data' => Warehouse::all()], 200);
        } catch (\Exception $e) {
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
            $warehouse = Warehouse::findOrfail($id);
            $warehouse->delete();
            return response()->json(['data' => $warehouse], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
