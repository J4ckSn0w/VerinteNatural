<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Price extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'prices';

    protected $fillable = [
        'inventory_id',
        'unit_id',
        'price',
        'is_default'
    ];

    /*********** Methods ************/

    /********** End Methods *********/


    /*********** Relations ************/

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/

    public function getUnitNameAttribute()
    {
        return $this->unit->name ?? '';
    }
}
