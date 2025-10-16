@component('mail::message')
# Great News! Your Story Has Been Approved

Dear {{ $story->anonymous ? 'Anonymous Author' : $story->author }},

We're excited to let you know that your story submission has been **approved** for publication on our website!

## Story Details

**Title:** {{ $story->title }}
**Author:** {{ $story->anonymous ? 'Anonymous' : $story->author }}
**Submitted on:** {{ $story->created_at->format('F j, Y \\a\\t g:i A') }}

## What's Next?

Your story will be reviewed by our editorial team and published as a blog post on our website. We may make minor edits for formatting and readability, but the essence of your story will remain unchanged.

You'll receive another notification once your story goes live on the website.

---

## Story Preview

{{ Str::limit($story->content, 400) }}{{ strlen($story->content) > 400 ? '...' : '' }}

---

Thank you for sharing your experience with our community. Stories like yours help others on their journey and strengthen our fellowship.

@component('mail::button', ['url' => url('/stories')])
Visit Our Stories
@endcomponent

Best regards,<br>
{{ config('app.name') }} Team

<small>This is an automated notification. If you have any questions about your story submission, please contact us through our website.</small>
@endcomponent