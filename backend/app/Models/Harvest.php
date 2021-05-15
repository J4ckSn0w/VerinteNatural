<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Harvest extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'harvests';

    protected $fillable = [
        'folio',
        'requisition_id'
    ];

    /*******  Relations *******/
    /**
     * Get requisition of harvest
     */
    public function requisition()
    {
        return $this->belongsTo(Requisition::class);
    }

    /**
     * Get products of harvest
     */
    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity', 'to_collect', 'was_finalized', 'unit_id');
    }

    /**
     * Get provider of harvest
     */
    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    /**
     * Get warehouse of Harvest
     */
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    // /**
    //  * Get 
    //  */
    // public function inventories()
    // {
    //     return $this->hasMany(Harvest::class);
    // }


    /**** Appends ****/

    /**
     * Get requisition folio
     */
    public function getRequisitionFolioAttribute()
    {
        return $this->requisition->folio ?? '';
    }

    /**
     * Get provider name
     */
    public function getProviderNameAttribute()
    {
        return $this->provider->name ?? '';
    }

    /**
     * Get warehouse name
     */
    public function getWarehouseNameAttribute()
    {
        return $this->warehouse->name ?? '';
    }





    // BOOT
    public static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub

        static::created(function ($model) {
            Log::create([
                "category" => "Recolecciones",
                "action" => "Se creó la recolección " . $model->id,
                "user_id" => Auth::id()
            ]);
        });

        static::updated(function ($model) {

            Log::create([
                "category" => "Recolecciones",
                "action" => "Se actualizó la recolección " . $model->id,
                "user_id" => Auth::id()
            ]);
        });

        static::deleted(function ($model) {

            Log::create([
                "category" => "Recolecciones",
                "action" => "Se eliminó ela recolección " . $model->id,
                "user_id" => Auth::id()
            ]);
        });
    }
}
