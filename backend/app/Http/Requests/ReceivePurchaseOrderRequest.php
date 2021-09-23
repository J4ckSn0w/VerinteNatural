<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReceivePurchaseOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'products' => 'required|array',
            'products.*.id' => 'required|numeric|exists:products,id',
            'products.*.unit_price' => 'required|numeric',
            'products.*.quantity' => 'required|numeric',
            'products.*.quantity_received' => 'required|numeric|lt:products.*.quantity'
        ];
    }
}
