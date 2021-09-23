<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $categories = Category::select('id', 'name')->get();
            return response()->json(['data' => $categories], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => $e->getMessage()]], 400);
        }
    }
}
