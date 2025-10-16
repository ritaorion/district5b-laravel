@component('mail::message')
# Welcome to {{ config('app.name') }}!

Hello {{ $user->first_name }},

Your account has been created! You're now part of the {{ config('app.name') }} community.

## Account Details

**Name:** {{ $user->first_name }} {{ $user->last_name }}
**Username:** {{ $user->username }}
**Email:** {{ $user->email }}
@if($user->is_admin)
**Role:** Administrator
@else
**Role:** User
@endif

## Next Steps

To complete your account setup, you'll need to create a secure password. Click the button below to set up your password and log in to your account.

@component('mail::button', ['url' => $passwordSetupUrl])
Set Up Your Password
@endcomponent

This secure link will expire in 24 hours for your security. If you don't set up your password within this time, please contact an administrator for assistance.

## Getting Started

Once you've set up your password, you'll be automatically logged in and can:

- Access your dashboard
- Manage your profile
@if($user->is_admin)
- Administer site content and users
- View analytics and reports
@endif

---

**Account created on:** {{ $user->created_at->format('F j, Y \a\t g:i A') }}

If you have any questions or need assistance, please don't hesitate to reach out to our support team.

Thanks,<br>
{{ config('app.name') }} Team

<small>This is an automated welcome email. If you didn't expect to receive this email, please contact our support team immediately.</small>
@endcomponent