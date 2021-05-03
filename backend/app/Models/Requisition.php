<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Requisition extends Model
{
    use HasFactory, SoftDeletes;

    protected $STATUS = [
        0 => 'Pendiente',
        1 => 'Aceptada por Ventas',
        2 => 'Completada',
        3 => 'Rechazada'
    ];

    protected $table = 'requisitions';

    protected $fillable = [
        'required_to'
    ];

    /*********** Methods ************/

    /********** End Methods *********/


    /*********** Relations ************/

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity');
    }

    public function purchase_order()
    {
        return $this->hasOne(PurchaseOrder::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/

    public function getStatusNameAttribute()
    {
        return $this->STATUS[$this->status] ?? '';
    }

    public function getWarehouseNameAttribute()
    {
        return $this->warehouse->name ?? '';
    }


    /********** End Appends *********/

    // BOOT
    public static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub

        static::created(function ($model) {
            Log::create([
                "category" => "Solicitudes de mercancia",
                "action" => "Se creó una solicitude de mercancia " . $model->id,
                "user_id" => Auth::id()
            ]);
        });

        static::updated(function ($model) {

            Log::create([
                "category" => "Solicitudes de mercancia",
                "action" => "Se actualizó una solicitudes de mercancia " . $model->id,
                "user_id" => Auth::id()
            ]);
        });

        static::deleted(function ($model) {

            Log::create([
                "category" => "Solicitudes de mercancia",
                "action" => "Se eliminó una solicitude de mercancia " . $model->id,
                "user_id" => Auth::id()
            ]);
        });
    }
}
