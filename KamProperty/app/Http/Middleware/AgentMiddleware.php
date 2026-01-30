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
        // TEMPORARILY ALLOW ALL AUTHENTICATED USERS
        return $next($request);
        
        /*
        // Check if user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        
        // Check user role using boolean attributes
        if ($user->is_admin || $user->is_agent) {
            return $next($request);
        }

        // Redirect unauthorized users
        return redirect()->route('properties.index')
            ->with('error', 'Unauthorized access. Only admins and agents can access this page.');
        */
    }
}