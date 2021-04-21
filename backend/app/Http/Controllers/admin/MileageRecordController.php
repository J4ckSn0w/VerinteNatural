<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MileageRecordRequest;
use App\Models\MileageRecord;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class MileageRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($vehicle_id)
    {
        try {

            $from = request()->get('from', false);
            $to = request()->get('to', false);

            if ($from && $to)
                $mileage_records = MileageRecord::query()
                    ->where('vehicle_id', $vehicle_id)
                    ->whereBetween('created_at', [$from, $to])
                    ->select('id', 'spent_fuel', 'fuel_cost', 'mileage', 'created_at')
                    ->get();
            else $mileage_records = MileageRecord::query()
                ->where('vehicle_id', $vehicle_id)
                ->select('id', 'spent_fuel', 'fuel_cost', 'mileage', 'created_at')
                ->get();
            return response()->json(['data' => $mileage_records], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MileageRecordRequest $request)
    {
        try {
            $mileage_record = MileageRecord::create($request->all());

            $vehicle = Vehicle::findOrfail($mileage_record->vehicle_id);
            $vehicle->mileage += $mileage_record->mileage;
            $vehicle->spent_fuel += $mileage_record->spent_fuel;
            $vehicle->fuel_cost += $mileage_record->fuel_cost;
            $vehicle->save();

            return response()->json(['data' => $mileage_record], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }
}
