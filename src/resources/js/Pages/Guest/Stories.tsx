import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Head, Link, router } from '@inertiajs/react';
import Breadcrumbs from "@/Components/Breadcrumbs";
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Blog } from '@/types/Blog';

interface PaginationData {
    current_page: number;
    data: Blog[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface StoriesProps {
    stories: PaginationData;
    categories: string[];
    filters: {
        search: string | null;
        category: string | null;
    };
}

const Stories = ({ stories, categories, filters }: StoriesProps) => {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            handleFilter();
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleFilter = () => {
        const params: Record<string, string> = {};

        if (search) params.search = search;
        if (selectedCategory) params.category = selectedCategory;

        router.get('/stories', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);

        const params: Record<string, string> = {};
        if (search) params.search = search;
        if (category && category !== 'all') params.category = category;

        router.get('/stories', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedCategory('');
        router.get('/stories', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const hasActiveFilters = search || selectedCategory;

    return (
        <PrimaryLayout>
            <Head title="Stories" />
            <div className="container mx-auto py-6">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumbs
                        pages={[
                            { title: 'Home', href: '/', active: false },
                            { title: 'Stories', href: '/stories', active: true },
                        ]}
                    />
                    <h1 className="text-3xl font-bold mb-8">Stories From The Fellowship</h1>
                    <p className="text-muted-foreground mb-8">
                        Read about the experiences of our members and the fellowship. Would you like to share yours?
                        <br/>
                        <Link className="text-primary underline ml-1" href={route('guest.story.submit')}>
                            Click here to send us your story.
                        </Link>
                    </p>

                    <div className="mb-8 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search stories..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {hasActiveFilters && (
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                    className="whitespace-nowrap"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Clear
                                </Button>
                            )}
                        </div>

                        <div className="text-sm text-muted-foreground">
                            Showing {stories.from || 0} to {stories.to || 0} of {stories.total} stories
                            {hasActiveFilters && (
                                <span className="ml-2">
                                    with filters applied
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {stories.data.length === 0 ? (
                            <div className="col-span-2 text-center py-10">
                                <p className="text-muted-foreground">
                                    {hasActiveFilters ? (
                                        <>
                                            No stories found matching your criteria.
                                            <br />
                                            Try adjusting your search or filters.
                                        </>
                                    ) : (
                                        <>
                                            No stories found.
                                            <br />
                                            It's lonely to be in a meeting by yourself...
                                        </>
                                    )}
                                </p>
                            </div>
                        ) : (
                            stories.data.map((story) => (
                                <Link key={story.id} href={`/stories/${story.slug}`}>
                                    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                                        {story.featured_image && (
                                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                                                <img
                                                    src={story.featured_image}
                                                    alt={story.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <CardHeader>
                                            <CardTitle className="line-clamp-2">{story.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground line-clamp-3 mb-4">
                                                {story.excerpt || 'No excerpt available'}
                                            </p>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <span>By Anonymous A.</span>
                                                <span>
                                                    {story.published_at ? formatDate(story.published_at) : 'Not published'}
                                                </span>
                                            </div>
                                            {story.category && (
                                                <div className="mt-2">
                                                    <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                                                        {story.category}
                                                    </span>
                                                </div>
                                            )}
                                            {story.reading_time && (
                                                <div className="mt-2">
                                                    <span className="text-xs text-muted-foreground">
                                                        {story.reading_time} min read
                                                    </span>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>

                    {stories.last_page > 1 && (
                        <div className="flex justify-center">
                            <div className="flex items-center space-x-2">
                                {stories.prev_page_url && (
                                    <Link
                                        href={stories.prev_page_url}
                                        preserveState
                                        preserveScroll
                                    >
                                        <Button variant="outline" size="sm">
                                            Previous
                                        </Button>
                                    </Link>
                                )}

                                {stories.links
                                    .filter(link => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                                    .map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveState
                                            preserveScroll
                                            className={link.url ? '' : 'pointer-events-none'}
                                        >
                                            <Button
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={!link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        </Link>
                                    ))}

                                {stories.next_page_url && (
                                    <Link
                                        href={stories.next_page_url}
                                        preserveState
                                        preserveScroll
                                    >
                                        <Button variant="outline" size="sm">
                                            Next
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PrimaryLayout>
    );
};

export default Stories;
