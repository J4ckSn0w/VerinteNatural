<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WarehouseType extends Model
{
    use HasFactory;

    protected $table = 'warehouse_types';

    protected $fillable = [
        'name'
    ];
    /**
     * @var mixed
     */

    /*********** Methods ************/



    /********** End Methods *********/


    /*********** Relations ************/

    public function warehouses(): HasMany
    {
        return $this->hasMany(Warehouse::class);
    }

    /********** End Relations *********/
}
