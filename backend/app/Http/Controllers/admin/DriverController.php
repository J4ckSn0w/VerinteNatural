<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DriverRequest;
use App\Models\Driver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $drivers = Driver::all();
            $drivers = $drivers->map(function($driver) {
                $driver->append(['vehicle_name', 'employee_number']);
                $driver = $driver->only(
                    'id', 'rate',
                    'vehicle_id', 'employee_id', 'driver_type_id',
                    'vehicle_name', 'employee_number');
                return $driver;
            });
            return response()->json(['data' => $drivers], 200);
        } catch(\Exception $e) {
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
            $driver = Driver::findOrfail($id)->append(['name', 'employee_number']);
            return response()->json(['data' => $driver], 200);
        } catch(\Exception $e) {
            return response()->json([], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param DriverRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(DriverRequest $request, int $id): JsonResponse
    {
        try {
            $driver = Driver::findOrfail($id);
            $driver->fill($request->all());
            $driver->save();
            return response()->json(['data' => $driver], 201);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
