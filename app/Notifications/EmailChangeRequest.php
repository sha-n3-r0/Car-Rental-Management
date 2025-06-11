<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;

class EmailChangeRequest extends Notification
{
    protected $customer;
    protected $newEmail;

    public function __construct($customer, $newEmail)
    {
        $this->customer = $customer;
        $this->newEmail = $newEmail;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        // Create a signed URL valid for 60 minutes
        $verificationUrl = URL::temporarySignedRoute(
            'email.change.verify', // route name you'll create
            Carbon::now()->addMinutes(60),
            [
                'user' => $this->customer->id,
                'new_email' => $this->newEmail,
            ]
        );

        return (new MailMessage)
            ->subject('Email Change Requested')
            ->greeting('Hello!')
            ->line("Someone requested to change the email on your account to: **{$this->newEmail}**")
            ->line('If this was you, please click the button below to confirm the email change:')
            ->action('Confirm Email Change', $verificationUrl)
            ->line('If this wasn’t you, please secure your account immediately.')
            ->salutation('Regards, CL_Carhub');
    }
}
