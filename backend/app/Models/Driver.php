<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

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

    public function getVehicleNameAttribute()
    {
        return $this->vehicle ? $this->vehicle->license_plate : 'Sin vehiculo' ;
    }

    /********** End Appends *********/

    // BOOT
    public static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub

        static::created(function($model) {
            Log::create([
                "category" => "Conductores",
                "action" => "Se creó el conductor " . $model->employee_number,
                "user_id" => Auth::id()
            ]);

        });

        static::updated(function($model) {

            Log::create([
                "category" => "Conductores",
                "action" => "Se actualizó el conductor " . $model->employee_number,
                "user_id" => Auth::id()
            ]);

        });

        static::deleted(function($model) {

            Log::create([
                "category" => "Conductores",
                "action" => "Se eliminó el conductor " . $model->employee_number,
                "user_id" => Auth::id()
            ]);

        });
    }

}
