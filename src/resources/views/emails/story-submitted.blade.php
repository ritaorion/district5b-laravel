@component('mail::message')
# New Story Submission

A new story has been submitted for review on your website.

## Story Details

**Title:** {{ $story->title }}
**Author:** {{ $story->anonymous ? 'Anonymous' : $story->author }}
**Submitted by:** {{ $story->email }}

## Story Preview

{{ Str::limit($story->content, 300) }}{{ strlen($story->content) > 300 ? '...' : '' }}

---

**Submitted on:** {{ $story->created_at->format('F j, Y \a\t g:i A') }}

@component('mail::button', ['url' => url('/auth/pending-stories')])
Review Story
@endcomponent

You can review this story and either approve it for publication or provide feedback to the author.

Thanks,<br>
{{ config('app.name') }}

<small>This is an automated notification for story submissions. You can manage notification settings in your admin panel.</small>
@endcomponent