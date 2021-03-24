<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VehicleType extends Model
{
    use HasFactory;

    protected $table = 'vehicle_types';

    protected $fillable = [
        'name',
        'max_weight'
    ];
    /**
     * @var mixed
     */

    /*********** Methods ************/



    /********** End Methods *********/


    /*********** Relations ************/

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }

    /********** End Relations *********/
}
