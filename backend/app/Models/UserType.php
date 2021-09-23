<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserType extends Model
{
    use HasFactory;

    protected $table = "user_types";

    protected $fillable = [
        'name'
    ];

    /*********** Relations ************/

    public function users(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(User::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/



    /********** End Appends *********/

}
