<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomePageController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Welcome');
})->name('home');

Route::get('/dashboard', [DashboardController::class, '__invoke'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
    
Route::get('/home', [HomePageController::class, 'index'])
    ->middleware(['auth'])
    ->name('homepage');

// Public API route for image suggestions
Route::get('/image-suggestions', [PropertyController::class, 'getImageSuggestions'])
    ->name('image.suggestions');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Public property routes (accessible to all authenticated users)
    Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');
    Route::get('/properties/{property}', [PropertyController::class, 'show'])->name('properties.show');
    
    // TEMPORARILY REMOVE AGENT MIDDLEWARE - Add it back later
    // Protected routes for agents and admins
    // Route::middleware(['agent'])->group(function () {
        Route::post('/properties', [PropertyController::class, 'store'])->name('properties.store');
        Route::put('/properties/{property}', [PropertyController::class, 'update'])->name('properties.update');
        Route::patch('/properties/{property}', [PropertyController::class, 'update']);
        Route::delete('/properties/{property}', [PropertyController::class, 'destroy'])->name('properties.destroy');
    // });
    
    // New routes for navigation
    Route::get('/inquiries', function () {
        return inertia('Inquiries/Index');
    })->name('inquiries.index');
    
    Route::get('/users', function () {
        return inertia('Users/Index');
    })->name('users.index');
    
    Route::get('/owners', function () {
        return inertia('Owners/Index');
    })->name('owners.index');
    
    Route::get('/reports', function () {
        return inertia('Reports/Index');
    })->name('reports.index');
    
    Route::get('/settings', function () {
        return inertia('Settings/Index');
    })->name('settings.index');
    
    Route::get('/commission', function () {
        return inertia('Commission/Index');
    })->name('commission.index');
    
    Route::get('/properties/my', function () {
        return inertia('Properties/My');
    })->name('properties.my');
    
    Route::get('/properties/browse', function () {
        return inertia('Properties/Browse');
    })->name('properties.browse');
});

require __DIR__.'/auth.php';