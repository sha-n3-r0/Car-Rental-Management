<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Password;

class PasswordChangedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }
    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        // Generate a password reset token for the user
        $token = Password::createToken($notifiable);

        $resetUrl = url(route('password.reset', [
            'token' => $token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ], false));

        return (new MailMessage)
            ->subject('Your Password Has Been Changed')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('This is a confirmation that your account password has been changed.')
            ->line('If you did not perform this action, please reset your password immediately by clicking the button below.')
            ->action('Reset Password', $resetUrl)
            ->line('If you did change your password, no further action is required.')
            ->salutation('Regards, ' . config('app.name'));
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
