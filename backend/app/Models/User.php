<?php

namespace App\Models;

use App\Mail\EmailVerification;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes;

    protected $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /*********** Methods ************/

    /* @param $username
     * @return mixed
     */

    public static function findForPassport($username) {
        return self::firstWhere('email', $username) ?? self::firstWhere('phone_number',  $username);
    }

    public function setCustomer($data): Customer
    {
        $customer = new Customer();
        $customer->photo = $data['photo'] ?? '';
        $customer->user_id = $this->id;
        $customer->rfc = $data['rfc'];
        $customer->registered = 1;
        $customer->save();

        return $customer;
    }

    public function sendEmailVerification() {
        Mail::to($this)->send(new EmailVerification($this->name, $this->id));
    }

    public function emailVerify() {
        $this->email_verified_at = new Carbon();
        $this->save();
    }

    /********** End Methods *********/



    /*********** Relations ************/

    public function customer(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Customer::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/



    /********** End Appends *********/
}
