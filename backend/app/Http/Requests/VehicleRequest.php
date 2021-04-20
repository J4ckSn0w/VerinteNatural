<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleRequest extends FormRequest
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
            'license_plate' => 'required|max:200',
            'brand' => 'required|max:255',
            'description' => 'required|max:255',
            'vehicle_type_id' => 'required|exists:vehicle_types,id',
            'mileage'   => 'required|numeric'
        ];
    }
}
