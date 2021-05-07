<?php

namespace App\Models;

use App\Mail\EmailVerification;
use App\Notifications\ResetPasswordNotification;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;
use Laravel\Passport\HasApiTokens;
use Silber\Bouncer\Database\HasRolesAndAbilities;


class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes, HasRolesAndAbilities;

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
        'user_type_id',
        'password'
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

    /**
     * Search match username
     * @param $username
     * @return mixed
     */
    public static function findForPassport($username)
    {
        return self::firstWhere('email', $username) ?? self::firstWhere('phone_number',  $username);
    }

    /**
     * Create customer from user
     * @param $data
     * @return Customer
     */
    public function setCustomer($photo, $rfc): Customer
    {
        $customer = new Customer();
        $customer->rfc = $rfc;
        $customer->photo = $photo;
        $customer->user_id = $this->id;
        $customer->registered = 1;
        $customer->save();

        return $customer;
    }

    /**
     * Send Mail to user
     * @return int
     */
    public function sendEmailVerification(): int
    {
        try {
            Mail::to($this)->send(new EmailVerification($this->name, $this->id));
            return 1;
        } catch (\Exception $e) {
            return 0;
        }
    }

    /**
     * Verify email
     * @return int
     */
    public function emailVerify(): int
    {
        $this->email_verified_at = new Carbon();
        $this->save();

        return 1;
    }

    /**
     * Update customer from user
     * @param $rfc
     * @param $photo
     * @return mixed
     */
    public function updateCustomer($rfc, $photo)
    {
        $customer = Customer::findOrfail($this->customer->id);
        $customer->rfc = $rfc;
        $customer->photo = $photo;
        $customer->save();

        return $customer;
    }

    public function sendPasswordResetNotification($token)
    {
        $url = config('services.host.url') . 'api/reset-password/' . $token;

        $delay = now()->addMinutes(30);
        $this->notify(new ResetPasswordNotification($url));
    }

    /********** End Methods *********/



    /*********** Relations ************/

    public function customer(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Customer::class);
    }

    public function employee(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Employee::class);
    }

    public function user_type(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(UserType::class);
    }

    /********** End Relations *********/


    /*********** Appends ************/



    /********** End Appends *********/
}
