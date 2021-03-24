<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vehicle extends Model
{
    use HasFactory;

    protected $table = 'vehicles';

    protected $fillable = [
        'license_plate',
        'brand',
        'description',
        'vehicle_type_id'
    ];
    /**
     * @var mixed
     */

    /*********** Methods ************/



    /********** End Methods *********/


    /*********** Relations ************/

    public function vehicle_type(): BelongsTo
    {
        return $this->belongsTo(VehicleType::class);
    }

    /********** End Relations *********/
}
