@component('mail::message')
# New Contact Form Submission

You have received a new contact form submission from your website.

## Contact Details

**Name:** {{ $contactData['name'] }}
**Email:** {{ $contactData['email'] }}
**Subject:** {{ $contactData['subject'] }}

## Message

{{ $contactData['message'] }}

---

**Submitted on:** {{ now()->format('F j, Y \a\t g:i A') }}

@component('mail::button', ['url' => url('/auth/contact-forms')])
View All Contact Forms
@endcomponent

Thanks,<br>
{{ config('app.name') }}

<small>This is an automated notification from your website's contact form. You can manage notification settings in your admin panel.</small>
@endcomponent
