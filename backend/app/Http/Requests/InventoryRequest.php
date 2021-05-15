<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryRequest extends FormRequest
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
            'available'     => 'required|numeric',
            'total'         => 'required|numeric',
            'product_id'  => 'required|numeric|exists:products,id',
            'warehouse_id'  => 'required|exists:warehouses,id',
            'minium_stock'  => 'required|numeric|lt:total',
            'provider_id'  => 'required|numeric|exists:providers,id',
        ];
    }
}
