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
    public function authorize(): bool
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
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|max:100|min:6|unique:users,email' . $validation,
            'phone_number' => 'required|string|min:5|max:50|unique:users,phone_number' . $validation,
            'user_type_id' => 'required|exists:user_types,id',
            'password' => 'required|string|min:8|max:40'
        ];
    }
}
