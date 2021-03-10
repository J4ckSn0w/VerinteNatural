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
        return [
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email|min:6|max:100',
            'phone_number' => 'required|string|unique:users,phone_number|min:5|max:50',
            'user_type_id' => 'required|exists:user_types,id',
            'password' => 'required|string|min:8|max:40'
        ];
    }
}
