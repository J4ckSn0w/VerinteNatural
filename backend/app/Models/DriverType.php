<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DriverType extends Model
{
    use HasFactory;

    protected $table = 'driver_types';

    protected $fillable = [
        'name'
    ];


    /*********** Relations ************/

    public function drivers(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Driver::class);
    }

    /********** End Relations *********/
}
