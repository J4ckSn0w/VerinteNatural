<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    const USER_TYPE_ID = 2;

    protected $table = 'employees';

    protected $fillable = [
        'employee_number',
        'employee_type_id',
        'user_id',
        'warehouse_id'
    ];

    /*********** Methods ***********
     * @param $data
     * @return mixed
     */

    public static function createEmployee($data)
    {
        $user = User::create(array_merge($data['user'], ['user_type_id' => self::USER_TYPE_ID]));
        $user->sendEmailVerification();

        $employee = Employee::create(array_merge(
            $data['employee'],
            [
                'user_id' => $user->id,
                'employee_number' => self::newEmployeeNumber($data['employee']['employee_type_id'])
            ]
        ));

        $employee->user;

        return $employee;
    }

    public static function updateEmployee($data)
    {
        $employee = self::find($data['employee']['id']);
        $employee->fill($data['employee']);
        $employee->save();

        $user = User::find($employee->user_id);
        $user->fill($data['user']);
        if ($data['user']['password'])
            $user->password = bcrypt($data['user']['password']);

        $user->save();

        return $employee;
    }

    public static function newEmployeeNumber($type): string
    {
        return EmployeeType::find($type)->name[0] . (Employee::all()->count() + ($type * 1000) + 1);
    }

    /********** End Methods *********/


    /*********** Relations ************/

    /**
     * Employee type of employee
     * @return BelongsTo
     */
    public function employee_type(): BelongsTo
    {
        return $this->belongsTo(EmployeeType::class);
    }

    /**
     * User of employee
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Warehouse of employee
     * @return BelongsTo
     */
    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/

    public function getNameAttribute()
    {
        return $this->user->name;
    }

    public function getEmailAttribute()
    {
        return $this->user->email;
    }

    public function getPhoneNumberAttribute()
    {
        return $this->user->phone_number;
    }

    public function getEmployeeTypeNameAttribute()
    {
        return $this->employee_type->name;
    }

    public function getWarehouseNameAttribute()
    {
        return $this->warehouse->name;
    }

    /********** End Appends *********/
}
