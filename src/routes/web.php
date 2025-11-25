<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PasswordSetupController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\App;

if(App::environment() === 'local') {
    Route::get('/test-404', function () {
        abort(404);
    });
    Route::get('/test-500', function () {
        abort(500);
    });
    Route::get('/test-403', function () {
        abort(403);
    });
}

Route::controller(GuestController::class)
    ->middleware('guest')
    ->name('guest.')
    ->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/map', 'map')->name('map');
        Route::get('/stories', 'stories')->name('stories');
        Route::get('/stories/{slug}', 'story')->name('story.show');
        Route::get('/submit-story', 'submitStory')->name('story.submit');
        Route::post('/submit-story', 'storeStory')->name('story.store');
        Route::get('/acronyms', 'acronyms')->name('acronyms');
        Route::get('/agsr', 'agsr')->name('agsr');
        Route::get('/gsr', 'gsr')->name('gsr');
        Route::get('/meetings', 'meetings')->name('meetings');
        Route::get('/events', 'events')->name('events');
        Route::get('/resources', 'resources')->name('resources');
        Route::get('/resources/{fileName}', 'resource')->name('resource.show');
        Route::get('/contact', 'contact')->name('contact');
        Route::post('/contact', 'sendContactForm')->name('contact.send');
        Route::get('/faqs', 'faqs')->name('faqs');

        Route::get('/privacy-policy', 'privacyPolicy')->name('privacy-policy');
        Route::get('/cookie-policy', 'cookiePolicy')->name('cookie-policy');
        Route::get('/terms-of-use', 'termsOfUse')->name('terms-of-use');
    });

Route::controller(PasswordSetupController::class)
    ->name('password.')
    ->group(function() {
        Route::get('/password-setup/{user}', 'show')->name('setup');
        Route::post('/password-setup/{user}', 'store')->name('setup.store');
    });

Route::controller(UserController::class)
    ->name('auth.')
    ->prefix('auth')
    ->middleware('auth')
    ->group(function() {
        Route::get('/dashboard', 'index')->name('index');
        Route::get('/contact-forms', 'contactForms')->name('contact-forms');
        Route::get('/contact-forms/{id}', 'contactForm')->name('contact-form.show');
        Route::delete('/contact-forms/{id}', 'deleteContactForm')->name('contact-form.destroy');
        Route::get('/users', 'users')->name('users');
        Route::post('/users', 'createUser')->name('user.store');
        Route::get('/users/{id}', 'user')->name('user.show');
        Route::patch('/users/{id}', 'updateUser')->name('user.update');
        Route::delete('/users/{id}', 'deleteUser')->name('user.destroy');
        Route::get('/site-settings', 'siteSettings')->name('site-settings');
        Route::patch('/site-settings', 'updateSiteSettings')->name('site-settings.update');
        Route::get('/events', 'events')->name('events');
        Route::get('/events/{id}', 'event')->name('event.show');
        Route::post('/events', 'createEvent')->name('event.store');
        Route::patch('/events/{id}', 'updateEvent')->name('event.update');
        Route::delete('/events/{id}', 'deleteEvent')->name('event.destroy');
        Route::get('/faqs', 'faqs')->name('faqs');
        Route::get('/faqs/{id}', 'faq')->name('faq.show');
        Route::post('/faqs', 'createFaq')->name('faq.store');
        Route::patch('/faqs/{id}', 'updateFaq')->name('faq.update');
        Route::delete('/faqs/{id}', 'deleteFaq')->name('faq.destroy');
        Route::get('/resources', 'resources')->name('resources');
        Route::get('/resources/{id}', 'resource')->name('resource.show');
        Route::post('/resources', 'createResource')->name('resource.store');
        Route::patch('/resources/{id}', 'updateResource')->name('resource.update');
        Route::delete('/resources/{id}', 'deleteResource')->name('resource.destroy');
        Route::get('/blogs', 'blogs')->name('blogs');
        Route::get('/blogs/{id}', 'blog')->name('blog.show');
        Route::post('/blogs', 'createBlog')->name('blog.store');
        Route::patch('/blogs/{id}', 'updateBlog')->name('blog.update');
        Route::delete('/blogs/{blog}', 'deleteBlog')->name('blog.destroy');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::get('/meetings', 'meetings')->name('meetings');
        Route::get('/rosters', 'rosters')->name('rosters');
        Route::get('/rosters/{id}', 'roster')->name('roster.show');
        Route::post('/rosters', 'createRoster')->name('roster.store');
        Route::patch('/rosters/{id}', 'updateRoster')->name('roster.update');
        Route::delete('/rosters/{id}', 'deleteRoster')->name('roster.destroy');
        Route::get('/pending-stories', 'pendingStories')->name('pending-stories');
        Route::get('/pending-stories/{id}', 'pendingStory')->name('pending-story.show');
        Route::post('/pending-stories/{id}/approve', 'approvePendingStory')->name('pending-story.approve');
        Route::post('/pending-stories/{id}/reject', 'rejectPendingStory')->name('pending-story.reject');
        Route::delete('/pending-stories/{id}', 'deletePendingStory')->name('pending-story.destroy');

        Route::post('/clear-cache', 'clearCache')->name('clear-cache');
    });

require __DIR__.'/auth.php';
