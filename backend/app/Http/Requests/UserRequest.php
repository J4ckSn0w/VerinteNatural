<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
        $validation = $this->id ? ',' . $this->id : '' ;
        return [
            'id' => 'required|exists:users,id',
            'name'      => 'required|string|max:255',
            'phone_number' => 'required|string|min:5|max:50|unique:users,phone_number' . $validation,
        ];
    }
}
