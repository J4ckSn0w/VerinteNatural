<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MileageRecordRequest extends FormRequest
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
            'mileage' => 'required|numeric',
            'vehicle_id' => 'required|exists:vehicles,id',
            'fuel_cost' => 'required|numeric',
            'spent_fuel' => 'required|numeric'
        ];
    }
}
