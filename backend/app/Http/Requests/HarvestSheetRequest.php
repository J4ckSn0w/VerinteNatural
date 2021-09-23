<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HarvestSheetRequest extends FormRequest
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
        $validation = request()->method === "PUT" ? 'required|numeric|lte:products.*.quantity' : 'nullable|numeric';

        return [
            'address'               => 'required|string|max:255',
            'contact_name'          => 'required|string|max:255',
            'payment_form_id'       => 'nullable|exists:payment_forms,id',
            'employee_id'           => 'required|exists:employees,id',
            'collect_to'            => 'required|date_format:Y-m-d H:i',
            'harvest_id'            => 'required|exists:harvests,id',
            'products'              => 'required|array',
            'products.*.id'         => 'required|exists:products,id',
            'products.*.quantity'   => 'required|numeric|gt:0',
            'products.*.quantity_real' => $validation,
            'products.*.unit_id'   => 'required|numeric|exists:units,id',
        ];
    }
}
