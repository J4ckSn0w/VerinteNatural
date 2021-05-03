<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\IncidentRequest;
use App\Models\Incident;
use Illuminate\Http\Request;

class IncidentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $incidents = Incident::query()->get();
            $incidents = $incidents->map(function ($incident) {
                $incident->append(['employee_name', 'employee_number', 'status_name']);
                $incident = $incident->only(
                    'id',
                    'subject',
                    'employee_name',
                    'employee_number',
                    'status',
                    'status_name'
                );
                return $incident;
            });
            return response()->json(['data' => $incidents], 200);
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
    public function store(IncidentRequest $request)
    {
        try {
            $incident = Incident::create($request->all());

            return response()->json(['data' => $incident], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $incident = Incident::findOrfail($id)->append('status_name');

            return response()->json(['data' => $incident], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $incident = Incident::findOrfail($id);
            $incident->delete();
            return response()->json(['data' => $incident], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    public function changeStatus($id, $status)
    {
        try {
            $incident = Incident::findOrfail($id);
            $incident->status = $status;
            $incident->save();
            return response()->json(['data' => $incident], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
