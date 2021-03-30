<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'customers';

    protected $fillable = [
        'photo',
        'rfc',
        'registered',
        'user_id'
    ];
    /**
     * @var mixed
     */

    /*********** Methods ************/

    public static function getUserTypeID(): int
    {
        //User Type Id of customer
        return 3;
    }

    /********** End Methods *********/

    /*********** Relations ************/

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function addresses(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Address::class);
    }

    /********** End Relations *********/
}
