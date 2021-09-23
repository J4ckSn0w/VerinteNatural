<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MileageRecordRequest;
use App\Http\Requests\VehicleRequest;
use App\Models\MileageRecord;
use App\Models\Vehicle;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use PDF;

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
            $vehicles = Vehicle::all();
            $vehicles = $vehicles->map(function ($vehicle) {
                $vehicle->append('vehicle_type_name', 'driver_name');
                $vehicle = $vehicle->only([
                    "id",
                    "license_plate",
                    "brand",
                    "description",
                    "vehicle_type_id",
                    "mileage",
                    "spent_fuel",
                    "fuel_cost",
                    "created_at",
                    "vehicle_type_name",
                    "driver_name"
                ]);
                return $vehicle;
            });
            return response()->json(['data' => $vehicles], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
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
            $vehicle = new Vehicle();
            $vehicle->fill($request->all());
            $vehicle->mileage = $request->mileage;
            $vehicle->save();
            (new MileageRecordController())
                ->store(new MileageRecordRequest([
                    "mileage" => $vehicle->mileage,
                    "vehicle_id" => $vehicle->id,
                    "fuel_cost" => 0,
                    "spent_fuel" => 0
                ]));
            return response()->json(['data' => $vehicle], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
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
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(VehicleRequest $request, int $id): JsonResponse
    {
        try {
            $vehicle = Vehicle::findOrfail($id);
            $vehicle->fill($request->all());
            $vehicle->save();
            return response()->json(['data' => $vehicle], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
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
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    public function vehicleReport($id, $date_from, $date_to)
    {
        try {
            $vehicle = Vehicle::findOrfail($id)->append('vehicle_type_name');
            $from = new Carbon($date_from);
            $to = new Carbon($date_to);

            $mileages = MileageRecord::where('vehicle_id', $id)->whereBetween('created_at', [$from, $to])->get();
            $pdf = PDF::loadView('pdfs.vehicleReport', compact('vehicle', 'mileages', 'date_to', 'date_from'));
            return $pdf->download('reporte_vehiculo_' . $vehicle->license_plate . '__' . Carbon::now()->format('Ymd') . '.pdf');
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    public function vehicleReportGeneral()
    {
        try {
            $vehicles = Vehicle::all();
            $vehicles = $vehicles->map(function ($vehicle) {
                $vehicle->append('vehicle_type_name');
                return $vehicle;
            });
            $date = Carbon::now()->format('d-m-Y');
            $pdf = PDF::loadView('pdfs.vehiclesReport', compact('vehicles', 'date'));
            return $pdf->download('reporte_general_vehicular' . Carbon::now()->format('Ymd') . '.pdf');
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
