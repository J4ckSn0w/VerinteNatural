<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HarvestRequest extends FormRequest
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
            'requisition_id' => 'required|exists:requisitions,id',
            'provider_id'    => 'required|exists:providers,id',
            'products'       => 'required|array',
            'products.*.id'  => 'required|exists:products,id',
            'products.*.quantity' => 'required|gt:0',
        ];
    }
}
