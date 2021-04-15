<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'code'
    ];

    /*********** Methods ************/

    /********** End Methods *********/


    /*********** Relations ************/

    public function product_types()
    {
        return $this->hasMany(ProductType::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/


    /********** End Appends *********/
}
