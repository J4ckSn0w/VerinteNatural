<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BatchRequest extends FormRequest
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
            'quantity'      => 'required|numeric',
            'unit_cost'     => 'required|numeric',
            'product_id'    => 'required|exists:products,id',
            'provider_id'   => 'required|exists:providers,id'
        ];
    }
}
