<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AgentMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        
        // Check user role
        if ($user->role === 'admin' || $user->role === 'agent') {
            return $next($request);
        }

        // Redirect unauthorized users
        return redirect('/')->with('error', 'Unauthorized access. Only admins and agents can access this page.');
    }
}