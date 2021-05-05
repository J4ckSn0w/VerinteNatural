<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Bouncer;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        //$limit = request()->get('limit', false);
        //$page = request()->get('page', false);
        //$count = 0;
        //if ($page == 1) {
        //    $count = Employee::all()->count();
        //}

        try {
            $employees = Employee::all(); //Employee::offset($limit * ($page - 1))->limit($limit)->get();

            $employees = $employees->map(function ($e) {
                $e->append(['role']);
                $e = $e->only(['id', 'employee_number', 'name', 'employee_type_name', 'warehouse_name', 'role']);
                return $e;
            });


            return response()->json(['data' => $employees], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param EmployeeRequest $request
     * @return JsonResponse
     */
    public function store(EmployeeRequest $request): JsonResponse
    {
        try {
            $employee = Employee::createEmployee([
                'user' => [
                    'name' => $request->name,
                    'email' =>  $request->email,
                    'password' => bcrypt($request->password),
                    'phone_number' => $request->phone_number
                ],
                'employee' => [
                    'employee_type_id' => $request->employee_type_id,
                    'warehouse_id' => $request->warehouse_id
                ],
                'role' => $request->role
            ]);

            return response()->json(['data' => $employee], 201);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
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
            $employee = Employee::find($id)->only(
                [ // Data of employee
                    'id',
                    'employee_number',
                    'name',
                    'email',
                    'phone_number',
                    'user_id',
                    'warehouse',
                    'employee_type'
                ]
            );
            return response()->json(['data' => $employee], 201);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EmployeeRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(EmployeeRequest $request, int $id): JsonResponse
    {
        try {
            $employee = Employee::updateEmployee([
                'user' => [
                    'name' => $request->name,
                    'email' =>  $request->email,
                    'phone_number' => $request->phone_number,
                    'password' => $request->password,
                ],
                'employee' => [
                    'id' => $id,
                    'employee_type_id' => $request->employee_type_id,
                    'warehouse_id' => $request->warehouse_id
                ],
                'role' => $request->role
            ]);

            return response()->json(['data' => $employee], 201);
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
            $employee = Employee::find($id);
            $employee->driver()->delete();
            $employee->delete();
            $user = User::find($employee->user_id);
            $user->email = $user->email . "__deleted_" . $user->id;
            $user->save();
            $user->delete();
            return response()->json(['data' => $employee], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }


    /**
     * Get roles of employee type
     */
    public function getRoles($employee_type_id = null)
    {
        try {
            if ($employee_type_id)
                $roles = DB::table('roles')->select('name', 'title')->where('employee_type_id', $employee_type_id)->get();
            else
                $roles = DB::table('roles')->select('name', 'title')->get();

            return response()->json(['data' => $roles], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
