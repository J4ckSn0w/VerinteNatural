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
            $category = request()->get('category', false);

            if ($category)
                $product_types = ProductType::where('category_id', $category)->get();
            else
                $product_types = ProductType::all();

            $product_types  = $product_types->map(function ($product_type) {
                $product_type->append(['category_name']);
                $product_type = $product_type->only([
                    'id',
                    'name',
                    'code',
                    'category_name',
                    'category_id',
                    'created_at'
                ]);
                return $product_type;
            });

            return response()->json(['data' => $product_types], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
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
            $name = $request->name;
            $data = array_merge(
                $request->toArray(),
                ['code' => strtoupper($name[0]) .
                    strtoupper($name[strlen($name) - 1]) .
                    (strlen($name) < 10 ? '0' . strlen($name) : strlen($name))]
            );

            if (!ProductType::where('code', $data['code'])->first()) {
                $product_type = ProductType::create($data);
                return response()->json(['data' => $product_type], 201);
            } else {
                return response()->json(['error' => ['errors' => ['name' => 'No se puede obtener un código valido con este nombre']]], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
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
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
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
            $product_type->name = $request->name;
            $product_type->category_id = $request->category_id;
            $product_type->save();
            return response()->json(['data' => $product_type], 200);
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
            $product_type = ProductType::find($id);
            $product_type->delete();
            return response()->json(['data' => $product_type], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
