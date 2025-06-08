<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $levels = [];

    protected $dontReport = [];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            // Log exceptions here if needed
        });
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        $guard = $exception->guards()[0] ?? null;

        switch ($guard) {
            case 'customer':
                $login = 'customer.login'; // make sure this route exists
                break;
            default:
                $login = 'login';
                break;
        }

        return $request->expectsJson()
            ? response()->json(['message' => 'Unauthenticated.'], 401)
            : redirect()->guest(route($login));
    }
}
