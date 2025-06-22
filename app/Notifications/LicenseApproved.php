<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class LicenseApproved extends Notification implements ShouldBroadcast
{
    use Queueable;

    protected $user;
    protected $owner;

    public function __construct($user, $owner)
    {
        $this->user = $user;
        $this->owner = $owner;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' => "Your license verification has been approved by {$this->owner->name}.",
            'url' => route('owner.customer.license.status', ['user' => $this->user->id]),
        ];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'You have a new notification',
            'url' => route('customer.profile'),
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage($this->toDatabase($notifiable));
    }
}
