<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductTypeRequest;
use App\Models\ProductType;

class ProductTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return response()->json(['data' => ProductType::all()], 200);
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
    public function store(ProductTypeRequest $request)
    {
        try {
            $product_type = ProductType::create($request->all());
            return response()->json(['data' => $product_type], 201);
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
            return response()->json(['data' => ProductType::find($id)], 200);
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
    public function update(ProductTypeRequest $request, $id)
    {
        try {
            $product_type = ProductType::find($id);
            $product_type->fill($request->all());
            $product_type->save();
            return response()->json(['data' => $product_type], 200);
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
            $product_type = ProductType::find($id);
            $product_type->delete();
            return response()->json(['data' => $product_type], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => ['errors' => ['server_error' => $e->getMessage()]]], 400);
        }
    }
}
