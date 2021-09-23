<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerUpdateRequest;
use App\Http\Requests\CustomerRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Models\Customer;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $customers = User::where('user_type_id', 3)->with('customer')->get();

            return response()->json(['data' => $customers], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 401);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CustomerUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function store(CustomerRequest $request): JsonResponse
    {
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->phone_number = $request->phone_number;
            $user->user_type_id = Customer::getUserTypeID();
            $user->save();

            $user->setCustomer($request->rfc ?? '', $request->photo ?? '');

            return response()->json(['data' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 401);
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
            $customer = User::findOrfail($id)->load('customer');
            return response()->json(['data' => $customer], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 401);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param CustomerUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(CustomerUpdateRequest $request, $id): JsonResponse
    {
        try {
            $user = User::findOrfail($id)->load('customer');
            $user->name = $request->name;
            $user->phone_number = $request->phone_number;
            $user->save();

            $user->updateCustomer($request->rfc, $request->photo ?? '');

            return response()->json(['data' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 401);
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
            $user = User::findOrfail($id);
            $user->customer->delete();
            $user->delete();

            return response()->json(['data' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 401);
        }
    }
}
