<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'addresses';

    protected $fillable = [
        'street',
        'number',
        'zip_code',
        'suburb',
        'municipality_id',
        'customer_id',
        'state_id'
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

    /**
     * Get State of address
     * @return BelongsTo
     */
    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/

    public function getMunicipalityNameAttribute()
    {
        return $this->municipality->name ?? '';
    }

    public function getStateNameAttribute()
    {
        return $this->state->name ?? '';
    }

    /********** End Appends *********/
}
