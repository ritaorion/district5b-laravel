<?php

namespace App\Http\Middleware;

use App\Models\Document;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user() ?? null;
        $navigationResources = Cache::remember('navigation_resources', 60 * 60 * 24, function () {
            return Document::where('app_type', 'file')
                ->where('is_public', true)
                ->orderBy('original_file_name', 'asc')
                ->select('original_file_name')
                ->get()
                ->map(function ($document) {
                    return [
                        'name' => $this->cleanFileName($document->original_file_name),
                        'path' => '/resources/' . $document->original_file_name,
                        'original_file_name' => $document->original_file_name,
                    ];
                })
                ->toArray();
        });
        $siteSettings = Cache::remember('site_settings', 60 * 60 * 24, function () {
            return Setting::find(1);
        });
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'navigationResources' => $navigationResources,
            'siteSettings' => $siteSettings,
        ];
    }

    /**
     * Clean the file name for display in navigation
     *
     * @param string $filename
     * @return string
     */
    private function cleanFileName(string $filename): string
    {
        return str($filename)
            ->replace('-', ' ')
            ->replace('.pdf', '')
            ->replace('.docx', '')
            ->replace('.xlsx', '')
            ->title()
            ->toString();
    }
}
