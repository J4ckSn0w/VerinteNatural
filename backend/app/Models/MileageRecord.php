<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MileageRecord extends Model
{
    use HasFactory;

    protected $table = 'mileage_records';

    protected $fillable = [
        'mileage',
        'vehicle_id',
        'fuel_cost',
        'spent_fuel'
    ];
    /**
     * @var mixed
     */

    /*********** Methods ************/



    /********** End Methods *********/


    /*********** Relations ************/

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
