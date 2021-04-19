<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequisitionRequest extends FormRequest
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
            'required_to' => 'required|date_format:Y-m-d',
            'products' => 'required|array',
            'products.*.quantity' => 'required|numeric',
            'products.*.id' => 'required|numeric|exists:products,id'
        ];
    }
}
