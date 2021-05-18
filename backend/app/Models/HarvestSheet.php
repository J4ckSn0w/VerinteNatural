<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HarvestSheet extends Model
{
    use HasFactory;

    protected $table = 'harvest_sheets';

    protected $fillable = [
        'address',
        'contact_name',
        'payment_form_id',
        'employee_id',
        'collect_to',
        'harvest_id',
        'folio'
    ];

    protected $STATUS = [
        0 => 'Sin recolectar',
        1 => 'Recolectado'
    ];


    /***** Relations *****/
    /**
     * Get payment form of sheet
     */
    public function payment_form()
    {
        return $this->belongsTo(PaymentForm::class);
    }

    /**
     * Get employee of sheet
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Get harvest of sheet
     */
    public function harvest()
    {
        return $this->belongsTo(Harvest::class);
    }

    /**
     * Get products of sheet
     */
    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity', 'quantity_real', 'unit_id');
    }



    /**** Appends ****/

    /**
     * Get gatherer name
     */
    public function getGathererNameAttribute()
    {
        return $this->employee->user->name ?? '';
    }

    /**
     * Get status name
     */
    public function getStatusNameAttribute()
    {
        return $this->STATUS[$this->status] ?? $this->STATUS[0];
    }

    /**
     * Get Payment form name
     */
    public function getPaymentFormNameAttribute()
    {
        return $this->payment_form->name ?? '';
    }
}
