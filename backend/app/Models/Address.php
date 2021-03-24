<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    use HasFactory;

    protected $table = 'addresses';

    protected $fillable = [
        'street',
        'number',
        'zip_code',
        'suburb',
        'municipality_id',
        'customer_id'
    ];

    /*********** Relations ************/

    /**
     * Get customer of address
     * @return BelongsTo
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get Municipality of address
     * @return BelongsTo
     */
    public function municipality(): BelongsTo
    {
        return $this->belongsTo(Municipality::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/

    /********** End Appends *********/



}
