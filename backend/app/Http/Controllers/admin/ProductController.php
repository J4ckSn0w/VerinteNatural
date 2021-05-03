<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $products = Product::all();
            $products = $products->map(function ($product) {
                $product->append(['product_type_name', 'category_name']);
                $product = $product->only(
                    'id',
                    'name',
                    'sku',
                    'product_type_name',
                    'category_name'
                );
                return $product;
            });
            return response()->json(['data' => $products], 200);
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
    public function store(ProductRequest $request)
    {
        try {

            $productType = ProductType::findOrfail($request->product_type_id);
            $category = Category::findOrfail($productType->category_id);

            $product = Product::create($request->all());
            // SKU
            $product->sku  = $category->code .
                $productType->code .
                $this->formatProductID($product->id);
            $product->save();

            $base64_str = substr($request->image, strpos($request->image, ",") + 1);
            $image = base64_decode($base64_str);
            $path = Storage::disk('public')->put('/images/products/' . $product->sku . '.png', $image);

            return response()->json(['data' => $product], 201);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }


    public function formatProductID($id)
    {

        $formattedID = '';

        for ($i = 1; $i < 6; $i++)
            if (pow(10, $i) > $id) $formattedID .= '0';


        $formattedID .= $id;

        return $formattedID;
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
            $product = Product::findOrfail($id);
            $product->image = base64_encode(Storage::disk('public')->get('images/products/' . $product->sku . '.png'));

            return response()->json(['data' => $product], 200);
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
    public function update(ProductRequest $request, $id)
    {
        try {
            $product = Product::find($id);
            $product->name = $request->name;
            $product->description = $request->description;
            $product->minium_stock = $request->minium_stock;
            $product->save();

            $base64_str = substr($request->image, strpos($request->image, ",") + 1);
            $image = base64_decode($base64_str);
            $path = Storage::disk('public')->put('/images/products/' . $product->sku . '.png', $image);

            return response()->json(['data' => $product], 200);
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
            $product = Product::find($id);
            Storage::disk('public')->delete(['/images/products/' . $product->sku . '.png']);
            $product->delete();
            return response()->json(['data' => $product], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
