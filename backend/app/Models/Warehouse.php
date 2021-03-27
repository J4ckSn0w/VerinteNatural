<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Warehouse extends Model
{
    use HasFactory;

    protected $table = 'warehouses';

    protected $fillable = [
        'name',
        'address',
        'user_id',
        'warehouse_type_id'
    ];
    /**
     * @var mixed
     */

    /*********** Methods ************/



    /********** End Methods *********/


    /*********** Relations ************/

    public function warehouse_type(): BelongsTo
    {
        return $this->belongsTo(WarehouseType::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /********** End Relations *********/
}
