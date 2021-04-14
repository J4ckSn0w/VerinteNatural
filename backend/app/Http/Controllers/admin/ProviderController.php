<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProviderRequest;
use App\Models\Provider;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $providers = Provider::query()->select('id', 'name', 'email', 'phone_number')->get();
            return response()->json(['data' => $providers], 200);
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
    public function store(ProviderRequest $request)
    {
        try {
            $provider = Provider::create($request->all());
            $products = new Collection($request->products);
            $provider->products()->detach();
            $provider->products()->sync($products->map(function ($product) use ($provider) {
                return [
                    'product_id' => $product['id'],
                    'provider_id' => $provider->id,
                    'price' => $product['price']
                ];
            }));
            return response()->json(['data' => $provider], 201);
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
            $provider = Provider::findOrfail($id);
            $provider->products = $provider->products()->select('id', 'name')->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->pivot->price,
                ];
            });
            //$provider->products = $provider->products
            return response()->json(['data' => $provider], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProviderRequest $request, $id)
    {
        try {
            $provider = Provider::findOrfail($id);
            $provider->fill($request->all());
            $provider->save();
            $provider->products()->detach();
            $products = new Collection($request->products);
            $provider->products()->sync($products->map(function ($product) use ($provider) {
                return [
                    'product_id' => $product['id'],
                    'provider_id' => $provider->id,
                    'price' => $product['price']
                ];
            }));
            return response()->json(['data' => $provider], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
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
            $provider = Provider::findOrfail($id);
            $provider->products()->detach();
            $provider->delete();
            return response()->json(['data' => $provider], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }
}
