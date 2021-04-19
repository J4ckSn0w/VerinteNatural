<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProviderRequest extends FormRequest
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
            'name' => 'required|max:255',
            'email' => 'nullable|email|max:255',
            'phone_number' => 'nullable|max:255',
            'contact' => 'nullable|max:255',
            'schedule' => 'nullable|max:255',
            'products' => 'nullable|array',
            'products.*.price' => 'required|numeric',
            'products.*.id' => 'required|numeric|exists:products,id'
        ];
    }
}
