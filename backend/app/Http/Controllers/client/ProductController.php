<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use App\Models\Inventory;

class ProductController extends Controller
{
    public function index()
    {
        try {
            $products = Inventory::query()->select('id', 'product_name', 'sku', 'available')->get();
            $products = $products->map(function ($product) {
                $product->append(['unit_default', 'image']);
                return $product;
            });
            return response()->json(['data' => $products], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
