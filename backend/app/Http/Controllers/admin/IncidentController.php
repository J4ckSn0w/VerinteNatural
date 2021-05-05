<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\IncidentRequest;
use App\Models\Employee;
use App\Models\Incident;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
            $superior = $this->searchSuperiorEmployee();

            if ($superior) {
                $incident = Incident::create(array_merge(
                    $request->toArray(),
                    [
                        'employee_id'    => Auth::user()->employee->id,
                        'responsable_id' =>  $superior->id
                    ]
                ));
            } else {
                return response()->json(['errors' => ['server_error' => ['No existe usuario con role superior a quien reportar']]], 400);
            }

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

    public function climb($id)
    {
        try {
            $superior = $this->searchSuperiorEmployee();
            if ($superior) {
                $incident = Incident::findOrfail($id);
                $incident->responsable_id = $superior->id;
                $incident->save();
            } else {
                return response()->json(['errors' => ['server_error' => ['No existe usuario con role superior a quien reportar']]], 400);
            }

            return response()->json(['data' => $incident], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    public function searchSuperiorEmployee()
    {
        $auth = Auth::user();
        $superior_role = null;

        if ($auth->employee) {
            $role_name = $auth->getRoles()[0];
            if ($role_name) {
                $role = DB::table('roles')->where('name', $role_name)->first();
                $superior_role = DB::table('roles')
                    ->where([
                        ['level', ($role->level - 1)],
                        ['employee_type_id', $role->employee_type_id],
                        ['section', $role->section]
                    ])->first();

                if (!$superior_role) {
                    $superior_role = DB::table('roles')
                        ->where([
                            ['level', ($role->level - 1)],
                            ['employee_type_id', $role->employee_type_id]
                        ])->first();

                    if (!$superior_role) {
                        $superior_role = DB::table('roles')
                            ->where([
                                ['level', ($role->level - 1)]
                            ])->first();
                    }
                }
            }

            if ($superior_role) {
                $superior_user = DB::table('assigned_roles')->where('role_id', $superior_role->id)->first();
                if ($superior_user) {
                    $employee = Employee::whereHas('user', function ($user) use ($superior_user) {
                        $user->where('id', $superior_user->entity_id);
                    })->first();
                    if ($employee) {
                        return $employee;
                    }
                }
            }
        }

        return null;
    }
}
