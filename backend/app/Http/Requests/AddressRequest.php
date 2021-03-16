<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use phpDocumentor\Reflection\Types\Boolean;

class AddressRequest extends FormRequest
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
            'street' => 'required|min:3|max:200',
            'number' => 'required|min:1|max:40',
            'zip_code' => 'required|min:2|max:40',
            'suburb'   => 'required|min:3|max:100',
            'municipality_id' => 'required|exists:municipalities,id'
        ];
    }
}
