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
            'product_name'  => 'required|string|max:100',
            'sku'           => 'required|string|max:100',
            'warehouse_id'  => 'required|exists:warehouses,id',
            'batch_id'      => 'required|exists:batches,id',
            'minium_stock'  => 'required|numeric|lt:total',
            'units'         => 'required|array',
            'units.*.unit_id'       => 'required|exists:units,id',
            'units.*.price'         => 'required|numeric',
            'units.*.is_default'    => 'required|boolean'
        ];
    }
}
