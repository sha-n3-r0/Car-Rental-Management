<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\CustomVerifyEmail; 
use App\Notifications\EmailChangeRequest;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone_number',
        'date_of_birth',
        'password_set',
        'address',
        'profile_picture',
        'new_email',  
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password_set' => 'boolean',
    ];
    /**
     * Override the email verification notification to send the custom one.
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new CustomVerifyEmail());
    }
    public function sendEmailVerificationNotificationToNewEmail()
    {
        $this->notify(new \App\Notifications\EmailChangeRequest($this, $this->new_email));
    }

    //Relationship to license Model
    public function license()
    {
        return $this->hasOne(UserLicense::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
