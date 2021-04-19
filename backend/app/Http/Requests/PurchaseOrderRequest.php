<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PurchaseOrderRequest extends FormRequest
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
            'warehouse_id'  => 'required|exists:warehouses,id',
            'delivery_to'   => 'required|date_format:Y-m-d',
            'total'         => 'required|numeric',
            'subtotal'      => 'required|numeric',
            'iva'           => 'required|numeric',
            'requisition_id' => 'nullable|exists:requisitions,id',
            'provider_id'   => 'required|exists:providers,id',
            'products'      => 'required|array',
            'products.*.quantity'   => 'required|numeric',
            'products.*.unit_price' => 'required|numeric',
            'products.*.id' => 'required|exists:products,id'
        ];
    }
}
