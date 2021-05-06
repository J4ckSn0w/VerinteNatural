<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

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
        $user->assign($data['role']['name']);

        $employee = Employee::create(array_merge(
            $data['employee'],
            [
                'user_id' => $user->id,
                'employee_number' => ''
            ]
        ));

        $employee->employee_number = self::newEmployeeNumber($employee);
        $employee->save();

        if ($data['employee']['employee_type_id'] == 3) {
            $driver = new Driver();
            $driver->employee_id = $employee->id;
            $driver->rate = 0;
            $driver->save();
        }

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
        else $user->password = $user->getOriginal('password');

        $user->save();

        $user->retract($user->getRoles());
        $user->assign($data['role']['name']);

        return $employee;
    }

    public static function newEmployeeNumber($employee): string
    {
        return EmployeeType::find($employee->employee_type_id)->name[0] . ($employee->id + ($employee->employee_type_id * 1000));
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

    /**
     * Driver data of employee
     */
    public function driver(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Driver::class);
    }

    /**
     * Warehouse of leader
     */
    public function leader_warehouse(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Warehouse::class, 'leader_id', 'id');
    }

    /**
     * Incidents of employee
     */
    public function incidents()
    {
        return $this->hasMany(Incident::class);
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

    public function getRoleAttribute()
    {
        return $this->user->getRoles()[0] ?? 'Sin rol asignado';
    }

    /********** End Appends *********/




    // BOOT
    public static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub

        static::created(function ($model) {
            Log::create([
                "category" => "Empleados",
                "action" => "Se creó el empleado " . $model->employee_number,
                "user_id" => Auth::id()
            ]);
        });

        static::updated(function ($model) {

            Log::create([
                "category" => "Empleados",
                "action" => "Se actualizó el empleado " . $model->employee_number,
                "user_id" => Auth::id()
            ]);
        });

        static::deleted(function ($model) {

            Log::create([
                "category" => "Empleados",
                "action" => "Se eliminó el empleado " . $model->employee_number,
                "user_id" => Auth::id()
            ]);
        });
    }
}
