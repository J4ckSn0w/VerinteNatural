<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Driver extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'drivers';

    protected $fillable = [
        'rate',
        'vehicle_id',
        'employee_id',
        'driver_type_id'
    ];

    /*********** Relations ************/

    public function employee(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function vehicle(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function driver_type(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(DriverType::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/

    public function getNameAttribute()
    {
        return $this->employee->name;
    }

    public function getEmployeeNumberAttribute()
    {
        return $this->employee->employee_number;
    }

    /********** End Appends *********/

}
