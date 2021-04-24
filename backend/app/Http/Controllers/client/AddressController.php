<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use App\Models\Address;
use App\Models\Municipality;
use App\Models\State;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Psy\Util\Json;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $addresses = Address::where('customer_id', Auth::user()->customer->id)->get();
            $addresses = $addresses->map(function ($address) {
                $address->append(['municipality_name', 'state_name']);
                return $address;
            });
            return response()->json(['data' => $addresses], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param AddressRequest $request
     * @return JsonResponse
     */
    public function store(AddressRequest $request): JsonResponse
    {
        try {
            return response()->json([
                'data' => Address::create(
                    array_merge(
                        $request->toArray(),
                        ['customer_id' => Auth::user()->customer->id]
                    )
                )
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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
            $data = Address::findOrfail($id);
            $data->municipality;
            $data->municipality->state;
            return response()->json(['data' => $data], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param AddressRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(AddressRequest $request, int $id): JsonResponse
    {
        try {
            $address = Address::findOrfail($id);
            $address->fill($request->all());
            $address->save();

            return response()->json(['data' => $address], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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
            $address = Address::findOrfail($id);
            $address->delete();

            return response()->json(['data' => $address], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function municipalities($id)
    {
        try {
            $municipalities = Municipality::query()->select('id', 'name')->where('state_id', $id)->get();
            return response()->json(['data' => $municipalities], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 500);
        }
    }

    public function states()
    {
        try {
            $states = State::query()->select('id', 'name')->get();
            return response()->json(['data' => $states], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 500);
        }
    }
}
