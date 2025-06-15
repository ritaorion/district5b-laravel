<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Contact;
use App\Models\Setting;
use App\Models\User;
use App\Models\Event;
use App\Models\Faq;
use App\Models\Document;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    private int $cacheLifetime;
    public function __construct()
    {
        $this->cacheLifetime = 60 * 60 * 12; // 12 hours
    }
    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('User/Index');
    }

    /**
     * @return Response
     */
    public function contactForms(): Response
    {
        $cacheKey = 'contact_forms';

        $forms = Cache::remember($cacheKey, $this->cacheLifetime, function () {
            return Contact::orderBy('created_at', 'desc')->get()->toArray();
        });

        return Inertia::render('User/ContactForms', [
            'forms' => $forms,
        ]);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function contactForm(int $id): JsonResponse
    {
        $cacheKey = 'contact_form';

        $form = Cache::remember("{$cacheKey}_{$id}", $this->cacheLifetime, function () use ($id) {
            return Contact::findOrFail($id);
        });

        return response()->json($form);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function deleteContactForm(int $id): JsonResponse
    {
        $form = Contact::findOrFail($id);
        $form->delete();

        Cache::forget('contact_forms');
        Cache::forget("contact_form_{$id}");

        return response()->json(['message' => 'Contact form deleted successfully.']);
    }

    /**
     * @return Response
     */
    public function users(): Response
    {
        $cacheKey = 'users';

        $users = Cache::remember($cacheKey, $this->cacheLifetime, function () {
            return User::orderBy('created_at', 'desc')->get()->toArray();
        });

        return Inertia::render('User/Users', [
            'users' => $users,
        ]);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function user(int $id): JsonResponse
    {
        $cacheKey = 'user';

        $user = Cache::remember("{$cacheKey}_{$id}", $this->cacheLifetime, function () use ($id) {
            return User::findOrFail($id);
        });

        return response()->json($user);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateUser(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->update($request->all());

        Cache::forget('users');
        Cache::forget("user_{$id}");

        return response()->json(['message' => 'User updated successfully.']);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function deleteUser(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->delete();

        Cache::forget('users');
        Cache::forget("user_{$id}");

        return response()->json(['message' => 'User deleted successfully.']);
    }

    /**
     * @return Response
     */
    public function siteSettings(): Response
    {
        $cacheKey = 'site_settings';
        $settings = Cache::remember($cacheKey, $this->cacheLifetime, function () {
            return Setting::find(1);
        });

        return Inertia::render('User/SiteSettings', [
            'settings' => $settings,
        ]);
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateSiteSettings(Request $request): RedirectResponse
    {
        $settings = Setting::find(1);
        $settings->update($request->all());

        Cache::forget('site_settings');
        return redirect()->back()->with('success', 'Site settings updated successfully.');
    }

    /**
     * @return Response
     */
    public function events(): Response
    {
        $cacheKey = 'events';

        $events = Cache::remember($cacheKey, $this->cacheLifetime, function () {
            return Event::orderBy('created_at', 'desc')->get()->toArray();
        });

        return Inertia::render('User/Events', [
            'events' => $events,
        ]);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function event(int $id): JsonResponse
    {
        $cacheKey = 'event';

        $event = Cache::remember("{$cacheKey}_{$id}", $this->cacheLifetime, function () use ($id) {
            return Event::findOrFail($id);
        });

        return response()->json($event);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function createEvent(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        $event = Event::create($validatedData);

        Cache::forget('events');

        return response()->json([
            'message' => 'Event created successfully.',
            'event' => $event
        ]);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateEvent(Request $request, int $id): JsonResponse
    {
        $event = Event::findOrFail($id);
        $event->update($request->all());

        Cache::forget('events');
        Cache::forget("event_{$id}");

        return response()->json(['message' => 'Event updated successfully.']);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function deleteEvent(int $id): JsonResponse
    {
        $event = Event::findOrFail($id);
        $event->delete();

        Cache::forget('events');
        Cache::forget("event_{$id}");

        return response()->json(['message' => 'Event deleted successfully.']);
    }

    /**
     * @return JsonResponse
     */
    public function clearCache(): JsonResponse
    {
        try {
            Cache::flush();
            return response()->json([
                'message' => 'All caches cleared successfully.'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to clear cache: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * @return Response
     */
    public function faqs(): Response
    {
        $cacheKey = 'faqs';

        $faqs = Cache::remember($cacheKey, $this->cacheLifetime, function () {
            return Faq::orderBy('created_at', 'desc')->get()->toArray();
        });

        return Inertia::render('User/Faqs', [
            'faqs' => $faqs,
        ]);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function faq(int $id): JsonResponse
    {
        $cacheKey = 'faq';

        $faq = Cache::remember("{$cacheKey}_{$id}", $this->cacheLifetime, function () use ($id) {
            return Faq::findOrFail($id);
        });

        return response()->json($faq);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function createFaq(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $faq = Faq::create([
            'title' => $validatedData['question'],
            'content' => $validatedData['answer']
        ]);

        Cache::forget('faqs');

        return response()->json([
            'message' => 'FAQ created successfully.',
            'faq' => $faq
        ]);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateFaq(Request $request, int $id): JsonResponse
    {
        $faq = Faq::findOrFail($id);
        $faq->update($request->all());

        Cache::forget('faqs');
        Cache::forget("faq_{$id}");

        return response()->json(['message' => 'FAQ updated successfully.']);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function deleteFaq(int $id): JsonResponse
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        Cache::forget('faqs');
        Cache::forget("faq_{$id}");

        return response()->json(['message' => 'FAQ deleted successfully.']);
    }

    /**
     * @return Response
     */
    public function resources(): Response
    {
        $cacheKey = 'resources';

        $resources = Cache::remember($cacheKey, $this->cacheLifetime, function () {
            return Document::where('app_type', 'file')
                ->orderBy('created_at', 'desc')
                ->get()
                ->toArray();
        });

        return Inertia::render('User/Resources', [
            'resources' => $resources,
        ]);
    }

    /**
     * @param int $id
     * @return JsonResponse|\Illuminate\Http\Response
     */
    public function resource(int $id): JsonResponse|\Illuminate\Http\Response
    {
        $resource = Cache::remember("resource_{$id}", $this->cacheLifetime, function () use ($id) {
            return Document::where('app_type', 'file')->findOrFail($id);
        });
        if (request()->ajax() || request()->wantsJson()) {
            return response()->json($resource);
        }

        try {
            if (!Storage::disk('s3')->exists($resource->storage_path)) {
                abort(404, 'File not found');
            }

            $fileContents = Storage::disk('s3')->get($resource->storage_path);

            return response($fileContents)
                ->header('Content-Type', $resource->mime_type)
                ->header('Content-Disposition', 'inline; filename="' . $resource->original_file_name . '"');

        } catch (\Exception $e) {
            abort(404, 'File could not be retrieved');
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function createResource(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'file' => 'required|file|max:51200', // 50MB max
                'app_type' => 'required|in:file,image',
            ]);

            $file = $request->file('file');
            $originalFileName = $file->getClientOriginalName();
            $fileName = time() . '_' . Str::slug(pathinfo($originalFileName, PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            $storagePath = 'resources/' . $fileName;

            $uploaded = Storage::disk('s3')->putFileAs(
                'resources',
                $file,
                $fileName
            );

            if (!$uploaded) {
                return response()->json([
                    'message' => 'Failed to upload file to storage.'
                ], 500);
            }

            $resource = Document::create([
                'file_name' => $fileName,
                'original_file_name' => $originalFileName,
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'app_type' => $validatedData['app_type'],
                'uploaded_by' => auth()->user()->id,
                'storage_path' => $storagePath,
                'is_public' => false,
            ]);

            Cache::forget('resources');

            return response()->json([
                'message' => 'Resource created successfully.',
                'resource' => $resource
            ]);
        } catch (Exception $e) {
            Log::error('Failed to create resource: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create resource: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateResource(Request $request, int $id): JsonResponse
    {
        $validatedData = $request->validate([
            'file_name' => 'sometimes|string|max:255',
            'original_file_name' => 'sometimes|string|max:255',
            'is_public' => 'sometimes|boolean',
        ]);
        $document = Document::findOrFail($id);
        if (isset($validatedData['file_name']) && $validatedData['file_name'] !== $document->file_name) {
            $oldPath = $document->storage_path;
            $newFileName = $validatedData['file_name'];
            $newPath = 'resources/' . $newFileName;

            if (Storage::disk('s3')->exists($oldPath)) {
                Storage::disk('s3')->copy($oldPath, $newPath);
                Storage::disk('s3')->delete($oldPath);

                $validatedData['storage_path'] = $newPath;
            }
        }

        $document->update($validatedData);

        Cache::forget('resources');
        Cache::forget("resource_{$id}");

        return response()->json(['message' => 'Resource updated successfully.']);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function deleteResource(int $id): JsonResponse
    {
        $resource = Document::findOrFail($id);

        if (Storage::disk('s3')->exists($resource->storage_path)) {
            Storage::disk('s3')->delete($resource->storage_path);
        }

        $resource->delete();

        Cache::forget('resources');
        Cache::forget("resource_{$id}");

        return response()->json(['message' => 'Resource deleted successfully.']);
    }

    /**
     * @return Response
     */
    public function blogs(): Response
    {
        $perPage = 20;
        $search = request('search');
        $page = request('page', 1);

        $cacheKey = "auth_blogs_p{$page}_s" . md5($search ?? '');

        $data = Cache::remember($cacheKey, $this->cacheLifetime, function () use ($search, $perPage) {
            $query = Blog::orderBy('created_at', 'desc');

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('author', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%")
                        ->orWhere(function ($statusQuery) use ($search) {
                            $searchLower = strtolower($search);
                            if (in_array($searchLower, ['published', 'active'])) {
                                $statusQuery->where('is_active', true);
                            } elseif (in_array($searchLower, ['draft', 'inactive'])) {
                                $statusQuery->where('is_active', false);
                            }
                        });
                });
            }

            return $query->paginate($perPage);
        });

        return Inertia::render('User/Blogs', [
            'blogs' => $data,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function createBlog(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:blogs,slug',
                'content' => 'required|string',
                'excerpt' => 'nullable|string|max:500',
                'author' => 'required|string|max:255',
                'featured_image' => 'nullable|url',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:160',
                'meta_keyword' => 'nullable|string',
                'reading_time' => 'nullable|integer|min:1',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'category' => 'nullable|string|max:100',
                'tags' => 'nullable|array',
                'tags.*' => 'string|max:50',
                'published_at' => 'nullable|date',
            ], [
                'title.required' => 'Please provide a title for your blog post.',
                'title.max' => 'The title cannot exceed 255 characters.',
                'content.required' => 'Please provide content for your blog post.',
                'author.required' => 'Please provide an author name.',
                'excerpt.max' => 'The excerpt cannot exceed 500 characters.',
                'featured_image.url' => 'Please provide a valid URL for the featured image.',
                'meta_description.max' => 'The meta description should be at most 160 characters.',
                'reading_time.min' => 'Reading time must be at least 1 minute.',
                'slug.unique' => 'This slug is already taken. Please choose a different one.',
            ]);

            if (empty($validated['slug'])) {
                $validated['slug'] = $this->generateUniqueSlug($validated['title']);
            }

            $validated['user_id'] = auth()->id();

            if ($validated['published_at']) {
                $validated['published_at'] = Carbon::parse($validated['published_at']);
            } elseif ($validated['is_active'] ?? false) {
                $validated['published_at'] = now();
            }

            if (empty($validated['reading_time'])) {
                $wordCount = str_word_count(strip_tags($validated['content']));
                $validated['reading_time'] = max(1, ceil($wordCount / 200));
            }

            Blog::create($validated);

            $this->clearBlogListCaches();

            return redirect()->route('auth.blogs')->with('success', 'Blog post created successfully!');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error('Blog creation failed: ' . $e->getMessage(), [
                'user_id' => auth()->id(),
                'request_data' => $request->all(),
                'exception' => $e
            ]);

            return redirect()->back()->with('error', 'We encountered an error while creating your blog post. Please try again.');
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return RedirectResponse
     */
    public function updateBlog(Request $request, $id): RedirectResponse
    {
        try {
            $blog = Blog::findOrFail($id);

            if ($blog->user_id !== auth()->id()) {
                return redirect()->back()->with('error', 'Unauthorized to edit this blog post.');
            }

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:blogs,slug,' . $id,
                'content' => 'required|string',
                'excerpt' => 'nullable|string|max:500',
                'author' => 'required|string|max:255',
                'featured_image' => 'nullable|url',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:160',
                'meta_keyword' => 'nullable|string',
                'reading_time' => 'nullable|integer|min:1',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'category' => 'nullable|string|max:100',
                'tags' => 'nullable|array',
                'tags.*' => 'string|max:50',
                'published_at' => 'nullable|date',
            ], [
                'title.required' => 'Please provide a title for your blog post.',
                'title.max' => 'The title cannot exceed 255 characters.',
                'content.required' => 'Please provide content for your blog post.',
                'author.required' => 'Please provide an author name.',
                'excerpt.max' => 'The excerpt cannot exceed 500 characters.',
                'featured_image.url' => 'Please provide a valid URL for the featured image.',
                'meta_description.max' => 'The meta description should be at most 160 characters.',
                'reading_time.min' => 'Reading time must be at least 1 minute.',
                'slug.unique' => 'This slug is already taken. Please choose a different one.',
            ]);

            if (empty($validated['slug'])) {
                $validated['slug'] = $this->generateUniqueSlug($validated['title'], $id);
            }

            if ($validated['published_at']) {
                $validated['published_at'] = Carbon::parse($validated['published_at']);
            } elseif (($validated['is_active'] ?? false) && !$blog->published_at) {
                $validated['published_at'] = now();
            } elseif (!($validated['is_active'] ?? false)) {
                $validated['published_at'] = null;
            }

            if (empty($validated['reading_time'])) {
                $wordCount = str_word_count(strip_tags($validated['content']));
                $validated['reading_time'] = max(1, ceil($wordCount / 200));
            }

            $blog->update($validated);
            Cache::forget("auth_blog_{$id}");
            $this->clearBlogListCaches();

            return redirect()->route('auth.blogs')->with('success', 'Blog post updated successfully!');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error('Blog update failed: ' . $e->getMessage(), [
                'user_id' => auth()->id(),
                'blog_id' => $id,
                'request_data' => $request->all(),
                'exception' => $e
            ]);

            return redirect()->back()->with('error', 'We encountered an error while updating your blog post. Please try again.');
        }
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function deleteBlog(int $id): JsonResponse
    {
        try {
            $blog = Blog::findOrFail($id);
            $blog->delete();

            Cache::forget("auth_blog_{$id}");
            $this->clearBlogListCaches();

            return response()->json([
                'message' => 'Blog post deleted successfully!'
            ]);

        } catch (\Exception $e) {
            Log::error('Blog deletion failed: ' . $e->getMessage(), [
                'user_id' => auth()->id(),
                'blog_id' => $id,
                'exception' => $e
            ]);

            return response()->json([
                'message' => 'We encountered an error while deleting the blog post. Please try again.'
            ], 500);
        }
    }

    /**
     * Generate a unique slug for the blog
     */
    private function generateUniqueSlug(string $title, ?int $excludeId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        while (true) {
            $query = Blog::where('slug', $slug);

            if ($excludeId) {
                $query->where('id', '!=', $excludeId);
            }

            if (!$query->exists()) {
                break;
            }

            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Clear specific blog-related cache keys
     */
    private function clearBlogListCaches(): void
    {
        for ($page = 1; $page <= 10; $page++) {
            Cache::forget("auth_blogs_p{$page}_s" . md5(''));
        }
    }
}
