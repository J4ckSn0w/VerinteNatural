<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\IncidentTypeRequest;
use App\Models\IncidentType;
use Illuminate\Http\Request;

class IncidentTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return response()->json(['data' => IncidentType::all()], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => [$e->getMessage()]], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(IncidentTypeRequest $request)
    {
        try {
            $incident_type = IncidentType::create($request->all());
            return response()->json(['data' => $incident_type], 201);
        } catch (\Exception $e) {
            return response()->json(['errors' => [$e->getMessage()]], 400);
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
            $incident_type = IncidentType::findOrfail($id);
            return response()->json(['data' => $incident_type], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => [$e->getMessage()]], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(IncidentTypeRequest $request, $id)
    {
        try {
            $incident_type = IncidentType::findOrfail($id);
            $incident_type->fill($request->all());
            $incident_type->save();
            return response()->json(['data' => $incident_type], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => [$e->getMessage()]], 400);
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
            $incident_type = IncidentType::findOrfail($id);
            $incident_type->delete();
            return response()->json(['data' => $incident_type], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => [$e->getMessage()]], 400);
        }
    }
}
