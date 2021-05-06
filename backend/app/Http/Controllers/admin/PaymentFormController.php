<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentForm;
use Illuminate\Http\Request;

class PaymentFormController extends Controller
{
    public function index()
    {
        try {
            return response()->json(['data' => PaymentForm::all()], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['server_error' => [$e->getMessage()]]], 400);
        }
    }
}
