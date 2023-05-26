<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        try {
            if (!$request->expectsJson()) {
                throw new \Exception('Error in login');
            }
        } catch (\Exception $error) {
            return response()->json(['status' => 500, 'message' => 'Error in Login', 'error' => $error]);
        }
    }
}
