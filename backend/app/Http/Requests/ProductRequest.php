<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'name' => 'required|max:100',
            'description' => 'required|max:255',
            'product_type_id' => 'required|exists:product_types,id',
            'image' => 'required|string',
            'minium_stock' => 'required|numeric',
            'units' => 'required|array',
            'units.*.id' => 'required|numeric|exists:units,id',
            'units.*.priority' => 'required|numeric',
            'storage_unit_id' => 'required|numeric|exists:units,id',
            'factor_unit_id' => 'required|numeric|exists:units,id'
        ];
    }
}
