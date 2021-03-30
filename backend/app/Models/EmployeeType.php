<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EmployeeType extends Model
{
    use HasFactory;

    protected $table = 'employee_types';

    protected $fillable = [
        'name'
    ];

    /*********** Relations ************/

    /**
     * Return employees of this type
     * @return HasMany
     */
    public function employees(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Employee::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/



    /********** End Appends *********/
}
