<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Document;
use App\Models\PendingStory;
use App\Models\Roster;
use App\Models\Faq;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;
use App\Models\Blog;
use App\Models\Event;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormSubmitted;

class GuestController extends Controller
{
    private int $cacheLifetime;

    public function __construct()
    {
        $this->cacheLifetime = 10; // Cache lifetime in minutes
    }
    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Guest/Index');
    }

    /**
     * @return Response
     */
    public function map(): Response
    {
        return Inertia::render('Guest/Map');
    }

    /**
     * @return Response
     */
    public function stories(): Response
    {
        if(!$this->siteSettings()->blog_mod_enabled) {
            abort(404);
        }

        $perPage = 20;
        $search = request('search');
        $category = request('category');
        $page = request('page', 1);

        $cacheKey = "public_stories_p{$page}_s" . md5($search ?? '') . "_c" . md5($category ?? '');

        $data = Cache::remember($cacheKey, $this->cacheLifetime, function () use ($search, $category, $perPage) {
            $query = Blog::where('is_active', true)
                ->where('published_at', '<=', now())
                ->orderBy('published_at', 'desc');

            if ($search) {
                $query->where('title', 'like', "%{$search}%");
            }
            if ($category) {
                $query->where('category', $category);
            }
            $stories = $query->paginate($perPage);
            $categories = Blog::where('is_active', true)
                ->where('published_at', '<=', now())
                ->whereNotNull('category')
                ->distinct()
                ->pluck('category')
                ->sort()
                ->values();

            return [
                'stories' => $stories,
                'categories' => $categories,
            ];
        });

        return Inertia::render('Guest/Stories', [
            'stories' => $data['stories'],
            'categories' => $data['categories'],
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }

    /**
     * @param string $slug
     * @return Response
     */
    public function story(string $slug): Response
    {
        if(!$this->siteSettings()->blog_mod_enabled) {
            abort(404);
        }

        $cacheKey = "public_story_{$slug}";

        $story = Cache::remember($cacheKey, $this->cacheLifetime, function () use ($slug) {
            return Blog::where('is_active', true)
                ->where('published_at', '<=', now())
                ->where('slug', $slug)
                ->firstOrFail();
        });

        return Inertia::render('Guest/Story', [
            'story' => $story,
        ]);
    }

    /**
     * @return Response
     */
    public function acronyms(): Response
    {
        $cacheKey = 'acronyms_data';

        $acronyms = Cache::remember($cacheKey, $this->cacheLifetime, function () {
            return [
                ['acronym' => 'AAGV/AA Grapevine', 'description' => 'AA Grapevine - The international journal of Alcoholics Anonymous'],
                ['acronym' => 'AALV/AA La Viña', 'description' => 'AA La Viña - The Spanish-language magazine of Alcoholics Anonymous'],
                ['acronym' => 'AAWS', 'description' => 'Alcoholics Anonymous World Services - The publishing arm of AA'],
                ['acronym' => 'Ad Hoc Committee', 'description' => 'A temporary committee formed for a specific purpose'],
                ['acronym' => 'ACC', 'description' => 'Area Committee Chair'],
                ['acronym' => 'Advisory Action', 'description' => 'A recommendation from the General Service Conference'],
                ['acronym' => 'Archives', 'description' => 'Committee responsible for preserving AA history and documents'],
                ['acronym' => 'Box 4-5-9', 'description' => 'A newsletter for General Service Representatives and others in AA service'],
                ['acronym' => 'BTG/Bridging the Gap', 'description' => 'Program connecting people leaving treatment facilities with AA meetings'],
                ['acronym' => 'C & T/Corrections & Treatment', 'description' => 'Committee working with people in correctional and treatment facilities'],
                ['acronym' => 'CPC/Cooperation with the Professional Community', 'description' => 'Committee that informs professionals about AA'],
                ['acronym' => 'DCM/District Committee Member', 'description' => 'Elected service position linking groups to the area'],
                ['acronym' => 'Delegate', 'description' => 'Area representative to the General Service Conference'],
                ['acronym' => 'GSB/General Service Board', 'description' => 'The board of trustees that oversees AA World Services'],
                ['acronym' => 'GSC/General Service Conference', 'description' => 'Annual meeting of AA delegates from the US and Canada'],
                ['acronym' => 'GSO/General Service Office', 'description' => 'AA World Services headquarters in New York'],
                ['acronym' => 'GSR/General Service Representative', 'description' => 'Group representative to the district and area'],
                ['acronym' => 'GV/Grapevine', 'description' => 'AA Grapevine magazine'],
                ['acronym' => 'H & I/Hospitals & Institutions', 'description' => 'Committee bringing AA meetings to hospitals and institutions'],
                ['acronym' => 'Intergroup/Central Office', 'description' => 'Local AA service office providing meeting information and resources'],
                ['acronym' => 'LV/La Viña', 'description' => 'AA La Viña Spanish-language magazine'],
                ['acronym' => 'LVYPAA', 'description' => 'Las Vegas Young People in Alcoholics Anonymous'],
                ['acronym' => 'NACYPAA', 'description' => 'North American Conference of Young People in Alcoholics Anonymous'],
                ['acronym' => 'NAGSC', 'description' => 'Northern Area General Service Committee'],
                ['acronym' => 'Panel', 'description' => 'Two-year term of service for delegates and area officers'],
                ['acronym' => 'PI/Public Information', 'description' => 'Committee that provides information about AA to the public'],
                ['acronym' => 'PRAASA', 'description' => 'Pacific Regional Alcoholics Anonymous Service Assembly'],
                ['acronym' => 'PSA', 'description' => 'Public Service Announcement'],
                ['acronym' => 'Region', 'description' => 'Geographic grouping of areas for service purposes'],
                ['acronym' => 'Regional Forum', 'description' => 'Informational meeting between GSO staff and local AA members'],
                ['acronym' => 'Rotation', 'description' => 'Practice of regularly changing service positions'],
                ['acronym' => 'SAGSC', 'description' => 'Southern Area General Service Committee'],
                ['acronym' => 'Sense of the Assembly', 'description' => 'Informal polling to gauge group opinion'],
                ['acronym' => 'Simple Majority', 'description' => 'More than half the votes cast'],
                ['acronym' => 'Substantial Unanimity', 'description' => 'Two-thirds majority vote in AA decision-making'],
                ['acronym' => 'Third Legacy Procedure', 'description' => 'AA voting method when consensus cannot be reached'],
                ['acronym' => 'Three Legacies', 'description' => 'Recovery, Unity, and Service - the three legacies of AA'],
                ['acronym' => 'Trustee', 'description' => 'Member of the General Service Board'],
                ['acronym' => 'Trustee-at-large', 'description' => 'Trustee representing areas without regional trustees'],
                ['acronym' => 'Trustees (Class A)', 'description' => 'Non-alcoholic trustees on the General Service Board'],
                ['acronym' => 'Trustees (Class B)', 'description' => 'Alcoholic trustees on the General Service Board'],
                ['acronym' => 'YPAA', 'description' => 'Young People in Alcoholics Anonymous'],
            ];
        });

        return Inertia::render('Guest/Acronyms', [
            'acronyms' => $acronyms,
        ]);
    }

    /**
     * @return Response
     */
    public function agsr(): Response
    {
        return Inertia::render('Guest/AGSR');
    }

    /**
     * @return Response
     */
    public function gsr(): Response
    {
        return Inertia::render('Guest/GSR');
    }

    /**
     * @return Response
     */
    public function meetings(): Response
    {
        if(!$this->siteSettings()->meetings_mod_enabled) {
            abort(404);
        }
        $searchTerm = request('search', 'District 5b');
        $cacheKey = "meetings_" . md5($searchTerm);

        $events = Cache::remember($cacheKey, $this->cacheLifetime, function () use ($searchTerm) {
            try {
                $encodedSearchTerm = urlencode($searchTerm);
                $url = "https://nevadaarea42.org/wp-json/tribe/events/v1/events?search={$encodedSearchTerm}&per_page=50&page=1&order=asc&orderby=start_date";

                $response = Http::timeout(10)->get($url);

                if (!$response->successful()) {
                    return [];
                }

                $data = $response->json();

                if (!isset($data['events']) || !is_array($data['events'])) {
                    return [];
                }

                return collect($data['events'])->map(function ($event) {
                    return [
                        'id' => $event['id'],
                        'title' => $event['title'],
                        'description' => strip_tags($event['description'] ?? ''),
                        'url' => $event['url'] ?? null,
                        'start_date' => $event['start_date'],
                        'end_date' => $event['end_date'] ?? null,
                        'venue' => $event['venue'] ?? null,
                    ];
                })->toArray();

            } catch (\Exception $e) {
                Log::error('Failed to fetch meetings data', [
                    'error' => $e->getMessage(),
                    'search_term' => $searchTerm
                ]);
                return [];
            }
        });

        return Inertia::render('Guest/Meetings', [
            'events' => $events,
            'searchTerm' => $searchTerm,
        ]);
    }

    /**
     * Display the events page with cached model data and pagination
     *
     * @param Request $request
     * @return Response
     */
    public function events(Request $request): Response
    {
        if(!$this->siteSettings()->events_mod_enabled) {
            abort(404);
        }
        $perPage = 20;
        $search = $request->get('search');
        $page = $request->get('page', 1);

        $cacheKey = "upcoming_events_p{$page}_s" . md5($search ?? '');

        $data = Cache::remember($cacheKey, $this->cacheLifetime, function () use ($search, $perPage) {
            $query = Event::where('start_time', '>', now())
                ->orderBy('start_time', 'asc');

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            }

            $events = $query->paginate($perPage);

            return [
                'events' => $events,
            ];
        });

        return Inertia::render('Guest/Events', [
            'events' => $data['events'],
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Display the resources page with cached model data and pagination
     *
     * @param Request $request
     * @return Response
     */
    public function resources(Request $request): Response
    {
        if(!$this->siteSettings()->resources_mod_enabled) {
            abort(404);
        }
        $perPage = 20;
        $search = $request->get('search');
        $page = $request->get('page', 1);

        $cacheKey = "public_resources_p{$page}_s" . md5($search ?? '');

        $data = Cache::remember($cacheKey, $this->cacheLifetime, function () use ($search, $perPage) {
            $query = Document::where('app_type', 'file')
                ->where('is_public', true)
                ->orderBy('original_file_name', 'asc');

            if ($search) {
                $query->where('original_file_name', 'like', "%{$search}%");
            }

            $documents = $query->paginate($perPage);

            return [
                'documents' => $documents,
            ];
        });

        return Inertia::render('Guest/Resources', [
            'documents' => $data['documents'],
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * @param string $fileName
     * @return \Illuminate\Http\Response
     * @throws \Psr\Container\ContainerExceptionInterface
     * @throws \Psr\Container\NotFoundExceptionInterface
     */
    public function resource(string $fileName): \Illuminate\Http\Response
    {
        if(!$this->siteSettings()->resources_mod_enabled) {
            abort(404);
        }
        $action = request()->get('action', 'view');

        $document = Cache::remember("resource_file_{$fileName}", $this->cacheLifetime, function () use ($fileName) {
            return Document::where('app_type', 'file')
                ->where('is_public', true)
                ->where('original_file_name', $fileName)
                ->firstOrFail();
        });

        try {
            if (!Storage::disk('s3')->exists($document->storage_path)) {
                abort(404, 'File not found');
            }

            $fileContents = Storage::disk('s3')->get($document->storage_path);

            if ($action === 'download') {
                return response($fileContents)
                    ->header('Content-Type', $document->mime_type)
                    ->header('Content-Disposition', 'attachment; filename="' . $document->original_file_name . '"');
            }

            return response($fileContents)
                ->header('Content-Type', $document->mime_type)
                ->header('Content-Disposition', 'inline; filename="' . $document->original_file_name . '"');

        } catch (\Exception $e) {
            abort(404, 'File could not be retrieved');
        }
    }

    /**
     * Display the contact page with roster data
     *
     * @return Response
     */
    public function contact(): Response
    {
        $cacheKey = 'contact_roster_data';

        $roster = Cache::remember($cacheKey, $this->cacheLifetime, function () {
            return Roster::whereNotNull('email')
                ->orWhereNotNull('phone')
                ->orderBy('title', 'asc')
                ->get()
                ->toArray();
        });

        return Inertia::render('Guest/Contact', [
            'roster' => $roster,
        ]);
    }

    /**
     * Handle contact form submission
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function sendContactForm(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            Contact::create([
                'name' => $request->name,
                'email' => $request->email,
                'subject' => $request->subject,
                'message' => $request->message,
                'user_id' => auth()->id(),
            ]);
            Cache::forget('contact_forms_admin');
            $settings = $this->siteSettings();
            if ($settings->notify_contact_form_submission && $settings->notify_contact_form_email) {
                $emailAddresses = collect(explode(',', $settings->notify_contact_form_email))
                    ->map(fn($email) => trim($email))
                    ->filter(fn($email) => filter_var($email, FILTER_VALIDATE_EMAIL))
                    ->toArray();

                if (!empty($emailAddresses)) {
                    $contactData = [
                        'name' => $request->name,
                        'email' => $request->email,
                        'subject' => $request->subject ?: 'No Subject',
                        'message' => $request->message,
                    ];
                    foreach ($emailAddresses as $emailAddress) {
                        try {
                            Mail::to($emailAddress)->send(new ContactFormSubmitted($contactData));
                        } catch (\Exception $mailException) {
                            Log::warning('Failed to send contact form notification email', [
                                'recipient' => $emailAddress,
                                'error' => $mailException->getMessage(),
                                'contact_name' => $request->name,
                                'contact_email' => $request->email,
                            ]);
                        }
                    }
                }
            }

            return back()->with('success', 'Your message has been sent successfully! We will get back to you soon.');

        } catch (\Exception $e) {
            Log::error('Contact form submission failed', [
                'error' => $e->getMessage(),
                'user_id' => auth()->id(),
                'email' => $request->email,
            ]);

            return back()
                ->with('error', 'An error occurred while sending your message. Please try again later.')
                ->withInput();
        }
    }

    /**
     * @return Response
     */
    public function submitStory(): Response
    {
        if(!$this->siteSettings()->blog_mod_enabled) {
            abort(404);
        }
        return Inertia::render('Guest/SubmitStory');
    }

    /**
     * @return Response
     */
    public function faqs(): Response
    {
        $faqs = Faq::orderBy('created_at', 'desc')->get()->toArray();

        return Inertia::render('Guest/Faqs', [
            'faqs' => $faqs,
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeStory(Request $request)
    {
        try {
            $rules = [
                'title' => 'required|string|max:255',
                'content' => 'required|string|max:10000',
                'anonymous' => 'required|boolean',
            ];
            if (!$request->boolean('anonymous')) {
                $rules['author'] = 'required|string|max:100';
            } else {
                $rules['author'] = 'nullable|string|max:100';
            }

            $validated = $request->validate($rules, [
                'title.required' => 'Please provide a title for your story.',
                'title.max' => 'The title cannot exceed 255 characters.',
                'content.required' => 'Please share your story content.',
                'content.max' => 'The story content cannot exceed 10,000 characters.',
                'author.required' => 'Please provide an author name or check anonymous.',
                'author.max' => 'The author name cannot exceed 100 characters.',
                'anonymous.required' => 'Please specify if you want to remain anonymous.',
            ]);

            PendingStory::create([
                'title' => $validated['title'],
                'content' => $validated['content'],
                'author' => $validated['anonymous'] ? null : $validated['author'],
                'anonymous' => $validated['anonymous'],
            ]);

            return redirect()->back()->with([
                'success' => 'Thank you for sharing your story! Your submission has been received and will be reviewed before publication.'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::error('Story submission failed: ' . $e->getMessage(), [
                'user_data' => $request->all(),
                'exception' => $e
            ]);

            return redirect()->back()->with([
                'error' => 'We encountered an error while processing your submission. Please try again, and if the problem persists, please contact us directly.'
            ])->withInput();
        }
    }

    /**
     * @return Response
     */
    public function privacyPolicy(): Response
    {
        return Inertia::render('Guest/PrivacyPolicy');
    }

    /**
     * @return Response
     */
    public function cookiePolicy(): Response
    {
        return Inertia::render('Guest/CookiePolicy');
    }

    /**
     * @return Response
     */
    public function termsOfUse(): Response
    {
        return Inertia::render('Guest/TermsOfUse');
    }

    /**
     * @return Setting
     */
    private function siteSettings(): Setting
    {
        return Setting::find(1);
    }
}
