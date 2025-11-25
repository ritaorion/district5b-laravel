@component('mail::message')
# Thank You for Your Story Submission

Dear {{ $story->anonymous ? 'Anonymous Author' : $story->author }},

Thank you for taking the time to share your story with us. We appreciate your willingness to contribute to our community.

## Story Details

**Title:** {{ $story->title }}
**Author:** {{ $story->anonymous ? 'Anonymous' : $story->author }}
**Submitted on:** {{ $story->created_at->format('F j, Y \\a\\t g:i A') }}

## Update on Your Submission

After careful review, we've decided not to publish your story at this time. This decision doesn't reflect the value of your experience or story - every journey in recovery is important and meaningful.

## Reasons Why Stories May Not Be Selected

- Content may not align with our current editorial focus
- Similar stories may have been recently published
- The story may benefit from additional development
- Content guidelines may not have been fully met

## We Encourage You to Keep Sharing

Please don't let this discourage you from sharing your experience in the future. We welcome you to:

- Submit a different story or experience
- Revise and resubmit this story after some time
- Share your experience at meetings and with fellow members
- Consider contributing in other ways to our community

---

## Story Content

{{ Str::limit($story->content, 400) }}{{ strlen($story->content) > 400 ? '...' : '' }}

---

Your experience and journey matter, regardless of publication status. Thank you for being part of our community and for your courage in sharing.

@component('mail::button', ['url' => url('/submit-story')])
Submit Another Story
@endcomponent

Best regards,<br>
{{ config('app.name') }} Team

<small>This is an automated notification. If you have questions about our story guidelines or submission process, please contact us through our website.</small>
@endcomponent