<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class PurchaseOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $STATUS = [
        0 => 'En proceso ',
        1 => 'Aceptada',
        3 => 'En recolección',
        4 => 'Completeda',
        5 => 'Rechazada'
    ];

    protected $table = 'purchase_orders';

    protected $fillable = [
        'delivery_to',
        'total',
        'subtotal',
        'iva',
        'warehouse_id',
        'requisition_id',
        'provider_id'
    ];

    /*********** Methods ************/

    /********** End Methods *********/


    /*********** Relations ************/

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function requisition()
    {
        return $this->belongsTo(Requisition::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('unit_price', 'quantity', 'quantity_received');
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

    public function getProviderNameAttribute()
    {
        return $this->provider->name ?? '';
    }


    /********** End Appends *********/

    // BOOT
    public static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub

        static::created(function ($model) {
            Log::create([
                "category" => "Ordenes de compra",
                "action" => "Se creó una orden de compra " . $model->id,
                "user_id" => Auth::id()
            ]);
        });

        static::updated(function ($model) {

            Log::create([
                "category" => "Ordenes de compra",
                "action" => "Se actualizó una orden de compra " . $model->id,
                "user_id" => Auth::id()
            ]);
        });

        static::deleted(function ($model) {

            Log::create([
                "category" => "Ordenes de compra",
                "action" => "Se eliminó una orden de compra " . $model->id,
                "user_id" => Auth::id()
            ]);
        });
    }
}
