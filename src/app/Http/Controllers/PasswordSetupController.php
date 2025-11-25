<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class PasswordSetupController extends Controller
{
    /**
     * Show the password setup form for new users
     *
     * @param Request $request
     * @param User $user
     * @return Response|RedirectResponse
     */
    public function show(Request $request, User $user): Response|RedirectResponse
    {
        if (!$request->hasValidSignature()) {
            return redirect('/login')->withErrors(['error' => 'This password setup link has expired or is invalid.']);
        }

        if ($user->email_verified_at) {
            return redirect('/login')->withErrors(['error' => 'This account has already been set up.']);
        }

        return Inertia::render('Auth/PasswordSetup', [
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'username' => $user->username,
            ]
        ]);
    }

    /**
     * Handle password setup for new users
     *
     * @param Request $request
     * @param User $user
     * @return JsonResponse|RedirectResponse
     */
    public function store(Request $request, User $user): JsonResponse|RedirectResponse
    {
        try {
            if (!$request->hasValidSignature()) {
                return response()->json([
                    'message' => 'This password setup link has expired or is invalid.'
                ], 403);
            }

            if ($user->email_verified_at) {
                return response()->json([
                    'message' => 'This account has already been set up.'
                ], 400);
            }

            $validatedData = $request->validate([
                'password' => 'required|string|min:8|confirmed',
            ]);

            $user->update([
                'password' => Hash::make($validatedData['password']),
                'email_verified_at' => now(),
            ]);

            Auth::login($user);

            return response()->json([
                'message' => 'Password set successfully! Welcome to ' . config('app.name') . '!',
                'redirect_url' => route('auth.index')
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Validation failed: ' . implode(', ', array_map(fn($errors) => implode(', ', $errors), $e->errors()))
            ], 422);
        } catch (Exception $e) {
            Log::error('Failed to set up password: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to set up password. Please try again.'
            ], 500);
        }
    }
}
