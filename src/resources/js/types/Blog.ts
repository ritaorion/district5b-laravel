import { PageProps } from '@/types';

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string | null;
    author: string;
    featured_image: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keyword?: string | null;
    views: number;
    reading_time?: number | null;
    is_active: boolean;
    is_featured: boolean;
    category?: string | null;
    tags: string[];
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

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

interface BlogsPageProps extends PageProps {
    blogs: PaginationData;
    filters?: {
        search?: string | null;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

export type { Blog, BlogsPageProps, PaginationData };
