<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class LicenseVerificationRequested extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $user; // user who requested verification

    public function __construct($user)
    {
        $this->user = $user;
    }

    // Channels to deliver notification
    public function via($notifiable)
    {
        return ['database', 'broadcast']; // store in DB + broadcast in real time
    }

    // Store notification data in database
    public function toDatabase($notifiable)
    {
        return [
            'user_id' => $this->user->id,
            'user_name' => $this->user->name,
            'message' => "{$this->user->name} has submitted a license verification request.",
            'url' => route('owner.users.show', ['user' => $this->user->id]),
        ];
    }

    public function toArray($notifiable)
    {
        return [
            'user_id' => $this->user->id,
            'user_name' => $this->user->name,
            'message' => "{$this->user->name} has submitted a license verification request.",
            'url' => route('owner.users.show', $this->user->id),
        ];
    }
    
    // For real-time broadcasting
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'user_id' => $this->user->id,
            'user_name' => $this->user->name,
            'message' => "{$this->user->name} has submitted a license verification request.",
            'url' => route('owner.users.show', ['user' => $this->user->id]),
        ]);
    }

    // Optional email notification (if you want)
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line("{$this->user->name} has submitted a license verification request.")
                    ->action('View User', url(route('owner.users.show', $this->user->id)))
                    ->line('Please review the request at your earliest convenience.');
    }
}
