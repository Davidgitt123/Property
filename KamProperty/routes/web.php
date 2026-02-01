<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\OwnerController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Public Routes
Route::get('/', function () {
    return inertia('Welcome');
})->name('home');

// Public API route for image suggestions
Route::get('/image-suggestions', [PropertyController::class, 'getImageSuggestions'])
    ->name('image.suggestions');

// Authentication Routes (included from auth.php)
require __DIR__.'/auth.php';

// Authenticated Routes
Route::middleware('auth')->group(function () {
    
    // Dashboard Routes
    Route::get('/dashboard', [DashboardController::class, '__invoke'])
        ->middleware(['verified'])
        ->name('dashboard');
    
    // Home Page Route (for regular users)
    Route::get('/home', [HomePageController::class, 'index'])
        ->name('homepage');
    
    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Property Routes
    Route::prefix('properties')->name('properties.')->group(function () {
        // Public property routes (accessible to all authenticated users)
        Route::get('/', [PropertyController::class, 'index'])->name('index');
        Route::get('/{property}', [PropertyController::class, 'show'])->name('show');
        Route::get('/browse', function () {
            return inertia('Properties/Browse');
        })->name('browse');
        
        // Property creation route - accessible to all authenticated users
        Route::get('/create', [PropertyController::class, 'create'])->name('create');
        
        // Property management routes
        Route::post('/', [PropertyController::class, 'store'])->name('store');
        Route::put('/{property}', [PropertyController::class, 'update'])->name('update');
        Route::patch('/{property}', [PropertyController::class, 'update']);
        Route::delete('/{property}', [PropertyController::class, 'destroy'])->name('destroy');
        
        // My listings route (for agents)
        Route::get('/my', function () {
            return inertia('Properties/My');
        })->name('my');
    });
    
    // User Management Routes (Admin only)
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::get('/{user}', [UserController::class, 'show'])->name('show');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
        Route::patch('/{user}/status', [UserController::class, 'updateStatus'])->name('status.update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
        Route::get('/statistics', [UserController::class, 'statistics'])->name('statistics');
    });
    
    // Inquiries Routes
    Route::prefix('inquiries')->name('inquiries.')->group(function () {
        Route::get('/', function () {
            return inertia('Inquiries/Index');
        })->name('index');
        
        // You can add more inquiry routes here later
        // Route::get('/create', [InquiryController::class, 'create'])->name('create');
        // Route::post('/', [InquiryController::class, 'store'])->name('store');
        // Route::get('/{inquiry}', [InquiryController::class, 'show'])->name('show');
        // Route::get('/{inquiry}/edit', [InquiryController::class, 'edit'])->name('edit');
        // Route::put('/{inquiry}', [InquiryController::class, 'update'])->name('update');
        // Route::delete('/{inquiry}', [InquiryController::class, 'destroy'])->name('destroy');
    });
    
    // Owners Routes
    Route::prefix('owners')->name('owners.')->group(function () {
        Route::get('/', [OwnerController::class, 'index'])->name('index');
        Route::get('/create', [OwnerController::class, 'create'])->name('create');
        Route::post('/', [OwnerController::class, 'store'])->name('store');
        Route::get('/{owner}', [OwnerController::class, 'show'])->name('show');
        Route::get('/{owner}/edit', [OwnerController::class, 'edit'])->name('edit');
        Route::put('/{owner}', [OwnerController::class, 'update'])->name('update');
        Route::delete('/{owner}', [OwnerController::class, 'destroy'])->name('destroy');
        Route::get('/statistics', [OwnerController::class, 'statistics'])->name('statistics');
        Route::get('/autocomplete', [OwnerController::class, 'autocomplete'])->name('autocomplete');
    });
    
    // Reports Routes
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('/', function () {
            return inertia('Reports/Index');
        })->name('index');
        
        // You can add more report routes here later
        // Route::get('/sales', [ReportController::class, 'sales'])->name('sales');
        // Route::get('/properties', [ReportController::class, 'properties'])->name('properties');
        // Route::get('/users', [ReportController::class, 'users'])->name('users');
    });
    
    // Settings Routes
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', function () {
            return inertia('Settings/Index');
        })->name('index');
        
        // You can add more settings routes here later
        // Route::get('/general', [SettingsController::class, 'general'])->name('general');
        // Route::get('/email', [SettingsController::class, 'email'])->name('email');
        // Route::get('/notifications', [SettingsController::class, 'notifications'])->name('notifications');
    });
    
    // Commission Routes
    Route::prefix('commission')->name('commission.')->group(function () {
        Route::get('/', function () {
            return inertia('Commission/Index');
        })->name('index');
        
        // You can add more commission routes here later
        // Route::get('/calculate', [CommissionController::class, 'calculate'])->name('calculate');
        // Route.get('/history', [CommissionController::class, 'history'])->name('history');
        // Route::get('/settings', [CommissionController::class, 'settings'])->name('settings');
    });
    
    // User-facing Property Routes (for browsing - inside auth)
    Route::prefix('home')->name('home.')->group(function () {
        // Browse properties
        Route::get('/properties', [PropertyController::class, 'browse'])->name('properties.browse');
        
        // View single property (reuse the show method)
        Route::get('/properties/{property}', [PropertyController::class, 'show'])->name('properties.show');
    });
});