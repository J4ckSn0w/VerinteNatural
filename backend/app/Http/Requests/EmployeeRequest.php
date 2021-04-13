<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
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
        $passwordValidation = request()->method === "PUT" ? '|nullable' : '|required';
        $validation = request()->method === "PUT" ? ',' . $this->user_id : '';

        return [
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|max:100|min:6|unique:users,email' . $validation,
            'phone_number' => 'required|string|min:5|max:50|unique:users,phone_number' . $validation,
            'password' => 'string|min:8|max:40' . $passwordValidation,
            'employee_type_id' => 'required|exists:employee_types,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'role' => 'required'
        ];
    }
}
