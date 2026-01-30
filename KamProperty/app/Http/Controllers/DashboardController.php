<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Property;
use App\Models\Inquiry;
use App\Models\Owner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = auth()->user();
        
        // Redirect regular users to homepage
        if ($user->role === 'user') {
            return redirect()->route('homepage');
        }

        // Get statistics based on user role
        if ($user->is_admin) {
            $stats = $this->getAdminStats();
            $recentData = $this->getAdminRecentData();
        } else {
            $stats = $this->getAgentStats($user->id);
            $recentData = $this->getAgentRecentData($user->id);
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentData' => $recentData,
            'userRole' => $user->role,
        ]);
    }

    private function getAdminStats()
    {
        return [
            'total_properties' => Property::count(),
            'active_properties' => Property::count(),
            'for_sale' => Property::forSale()->count(),
            'for_rent' => Property::forRent()->count(),
            'total_users' => User::count(),
            'active_users' => User::active()->count(),
            'total_agents' => User::agents()->count(),
            'total_inquiries' => Inquiry::count(),
            'pending_inquiries' => Inquiry::pending()->count(),
            'total_owners' => Owner::count(),
            'revenue' => Property::sum('price') * 0.03, // 3% commission estimate
        ];
    }

    private function getAgentStats($agentId)
    {
        return [
            'my_properties' => Property::where('user_id', $agentId)->count(),
            'active_listings' => Property::where('user_id', $agentId)->count(),
            'for_sale' => Property::where('user_id', $agentId)->forSale()->count(),
            'for_rent' => Property::where('user_id', $agentId)->forRent()->count(),
            'assigned_inquiries' => Inquiry::byAgent($agentId)->count(),
            'pending_inquiries' => Inquiry::byAgent($agentId)->pending()->count(),
            'closed_inquiries' => Inquiry::byAgent($agentId)->closed()->count(),
            'my_owners' => Owner::where('user_id', $agentId)->count(),
            'estimated_commission' => Property::where('user_id', $agentId)->sum('price') * 0.03,
        ];
    }

    private function getAdminRecentData()
    {
        return [
            'recent_properties' => Property::with('user')->latest()->take(5)->get(),
            'recent_inquiries' => Inquiry::with(['property', 'user'])->latest()->take(5)->get(),
            'recent_users' => User::latest()->take(5)->get(),
            'top_agents' => User::agents()->withCount('properties')->orderByDesc('properties_count')->take(5)->get(),
        ];
    }

    private function getAgentRecentData($agentId)
    {
        return [
            'my_recent_properties' => Property::where('user_id', $agentId)->latest()->take(5)->get(),
            'my_recent_inquiries' => Inquiry::byAgent($agentId)->with('property')->latest()->take(5)->get(),
            'property_views' => [], // You can implement this later
            'upcoming_tasks' => [], // You can implement this later
        ];
    }
}