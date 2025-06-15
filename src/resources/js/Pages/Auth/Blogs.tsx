import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Badge } from '@/Components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/Components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { ScrollArea } from '@/Components/ui/scroll-area';
import InputError from '@/Components/InputError';
import {
    Plus,
    MoreHorizontal,
    HelpCircle,
    AlertCircle,
    CheckCircle,
    FileText,
    Eye,
    Trash2,
    Edit,
    Calendar,
    Clock,
    Tag,
    Image as ImageIcon,
    Globe,
} from 'lucide-react';
import { PageProps } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Blog } from '@/types/Blog';

interface BlogsPageProps extends PageProps {
    blogs: Blog[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

const MarkdownHelpDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Markdown Guide
                </DialogTitle>
                <DialogDescription>
                    Learn how to use markdown to format your blog posts.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2">What is Markdown?</h3>
                    <p className="text-gray-600">
                        Markdown is a lightweight markup language that allows you to write formatted content using plain text.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Basic Syntax</h3>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~

- Bullet point
1. Numbered list

[Link text](https://example.com)
![Image alt text](image-url.jpg)

> Blockquote

\`Inline code\`

\`\`\`
Code block
Multiple lines
\`\`\`

---
Horizontal rule

| Table | Header |
|-------|--------|
| Cell  | Cell   |`}
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Tips for Writing</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Use headings to organize your content hierarchically</li>
                        <li>Break up long paragraphs for better readability</li>
                        <li>Use lists to make information easier to scan</li>
                        <li>Include relevant images to enhance your content</li>
                        <li>Preview your content before publishing</li>
                    </ul>
                </div>
            </div>
        </DialogContent>
    </Dialog>
);

const DeleteConfirmationDialog = ({open, onClose, onConfirm, title, isSubmitting}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    isSubmitting: boolean;
}) => (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-900">
                    <Trash2 className="h-5 w-5 text-red-600" />
                    Delete Blog Post
                </DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete "{title}"? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={onConfirm} disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Deleting...
                        </>
                    ) : (
                        <>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </>
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

const BlogDialog = ({open, onClose, blog}: {
    open: boolean;
    onClose: () => void;
    blog?: Blog;
}) => {
    const [showMarkdownHelp, setShowMarkdownHelp] = useState(false);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        title: blog?.title || '',
        slug: blog?.slug || '',
        content: blog?.content || '',
        excerpt: blog?.excerpt || '',
        featured_image: blog?.featured_image || '',
        meta_title: blog?.meta_title || '',
        meta_description: blog?.meta_description || '',
        meta_keyword: blog?.meta_keywords || '',
        reading_time: blog?.reading_time || 5,
        is_active: blog?.is_active ?? true,
        is_featured: blog?.is_featured ?? false,
        category: blog?.category || '',
        tags: blog?.tags || [],
    });

    useEffect(() => {
        if (blog) {
            setData({
                title: blog.title || '',
                slug: blog.slug || '',
                content: blog.content || '',
                excerpt: blog.excerpt || '',
                featured_image: blog.featured_image || '',
                meta_title: blog.meta_title || '',
                meta_description: blog.meta_description || '',
                meta_keyword: blog.meta_keywords || '',
                reading_time: blog.reading_time || 5,
                is_active: blog.is_active ?? true,
                is_featured: blog.is_featured ?? false,
                category: blog.category || '',
                tags: blog.tags || [],
            });
        } else {
            reset();
        }
    }, [blog]);

    useEffect(() => {
        if (!blog && data.title) {
            setData('slug', generateSlug(data.title));
        }
    }, [data.title, blog]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (blog) {
            patch(route('auth.blog.update', blog.id), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        } else {
            post(route('auth.blog.store'), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        }
    };

    const handleTagsChange = (value: string) => {
        const tags = value
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean);
        setData('tags', tags);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={() => onClose()}>
                <DialogContent className="max-w-[95vw] h-[95vh] flex flex-col">
                    <DialogHeader className="px-6 py-4 border-b">
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details for your blog post. Use markdown for rich formatting.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-1 min-h-0">
                        {/* Left Sidebar - Form Fields */}
                        <div className="w-1/4 border-r">
                            <ScrollArea className="h-full px-6">
                                <form onSubmit={handleSubmit} className="space-y-6 py-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter blog title"
                                            disabled={processing}
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            placeholder="url-friendly-slug"
                                            disabled={processing || !!blog}
                                        />
                                        <p className="text-xs text-gray-500">
                                            {blog ? 'Slug cannot be changed for existing blogs' : 'Auto-generated from title'}
                                        </p>
                                        <InputError message={errors.slug} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="excerpt">Excerpt</Label>
                                        <Textarea
                                            id="excerpt"
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            placeholder="Brief description of the blog post"
                                            rows={3}
                                            disabled={processing}
                                        />
                                        <InputError message={errors.excerpt} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="featured_image">Featured Image URL</Label>
                                        <Input
                                            id="featured_image"
                                            value={data.featured_image}
                                            onChange={(e) => setData('featured_image', e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                            disabled={processing}
                                        />
                                        <InputError message={errors.featured_image} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Input
                                            id="category"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            placeholder="Blog category"
                                            disabled={processing}
                                        />
                                        <InputError message={errors.category} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <Input
                                            id="tags"
                                            value={data.tags.join(', ')}
                                            onChange={(e) => handleTagsChange(e.target.value)}
                                            placeholder="tag1, tag2, tag3"
                                            disabled={processing}
                                        />
                                        <p className="text-xs text-gray-500">Separate tags with commas</p>
                                        <InputError message={errors.tags} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                                        <Input
                                            id="reading_time"
                                            type="number"
                                            min="1"
                                            value={data.reading_time}
                                            onChange={(e) => setData('reading_time', parseInt(e.target.value) || 5)}
                                            disabled={processing}
                                        />
                                        <InputError message={errors.reading_time} />
                                    </div>

                                    <div className="space-y-4">
                                        <Label>SEO Settings</Label>
                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="meta_title" className="text-sm">Meta Title</Label>
                                                <Input
                                                    id="meta_title"
                                                    value={data.meta_title}
                                                    onChange={(e) => setData('meta_title', e.target.value)}
                                                    placeholder="SEO title"
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.meta_title} />
                                            </div>
                                            <div>
                                                <Label htmlFor="meta_description" className="text-sm">Meta Description</Label>
                                                <Textarea
                                                    id="meta_description"
                                                    value={data.meta_description}
                                                    onChange={(e) => setData('meta_description', e.target.value)}
                                                    placeholder="SEO description (160 chars max)"
                                                    rows={2}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.meta_description} />
                                            </div>
                                            <div>
                                                <Label htmlFor="meta_keyword" className="text-sm">Meta Keywords</Label>
                                                <Input
                                                    id="meta_keyword"
                                                    value={data.meta_keyword}
                                                    onChange={(e) => setData('meta_keyword', e.target.value)}
                                                    placeholder="keyword1, keyword2"
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.meta_keyword} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Label>Status</Label>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="is_active"
                                                    checked={data.is_active}
                                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                                    disabled={processing}
                                                />
                                                <Label htmlFor="is_active">Published</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="is_featured"
                                                    checked={data.is_featured}
                                                    onCheckedChange={(checked) => setData('is_featured', checked)}
                                                    disabled={processing}
                                                />
                                                <Label htmlFor="is_featured">Featured</Label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </ScrollArea>
                        </div>

                        {/* Content Editor and Preview */}
                        <div className="flex-1 flex min-h-0">
                            <div className="w-1/2 border-r p-6 flex flex-col min-h-0">
                                <div className="flex items-center justify-between mb-2">
                                    <Label htmlFor="content">Content (Markdown) *</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowMarkdownHelp(true)}
                                    >
                                        <HelpCircle className="mr-1 h-3 w-3" />
                                        Help
                                    </Button>
                                </div>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="flex-1 font-mono resize-none"
                                    placeholder="Write your blog post content in markdown..."
                                    disabled={processing}
                                />
                                <InputError message={errors.content} />
                            </div>

                            <div className="w-1/2 p-6 overflow-y-auto">
                                <Label className="block mb-2">Preview</Label>
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm, remarkBreaks]}
                                        components={{
                                            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                                            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
                                            h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                                            p: ({node, ...props}) => <p className="my-2" {...props} />,
                                            ul: ({node, ...props}) => <ul className="list-disc list-inside my-2" {...props} />,
                                            ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2" {...props} />,
                                            li: ({node, ...props}) => <li className="my-1" {...props} />,
                                            a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
                                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 my-2 italic" {...props} />,
                                            code: ({inline, className, children, ...props}: any) =>
                                                inline ? (
                                                    <code className="bg-gray-100 px-1 py-0.5 rounded" {...props}>{children}</code>
                                                ) : (
                                                    <code className="block bg-gray-100 p-4 rounded-lg my-2 overflow-x-auto" {...props}>{children}</code>
                                                ),
                                        }}
                                    >
                                        {data.content || '_No content yet. Start writing in markdown..._'}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-6 py-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    {blog ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                <>
                                    <FileText className="mr-2 h-4 w-4" />
                                    {blog ? 'Update Blog' : 'Create Blog'}
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <MarkdownHelpDialog
                open={showMarkdownHelp}
                onClose={() => setShowMarkdownHelp(false)}
            />
        </>
    );
};

export default function Blogs() {
    const { blogs, flash } = usePage<BlogsPageProps>().props;
    const [openDialog, setOpenDialog] = useState(false);
    const [openMarkdownHelp, setOpenMarkdownHelp] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const { delete: destroy, processing: isDeleting } = useForm();

    const handleEdit = (blog: Blog) => {
        setSelectedBlog(blog);
        setOpenDialog(true);
    };

    const handleDeleteClick = (blog: Blog) => {
        setSelectedBlog(blog);
        setDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (!selectedBlog) return;

        destroy(route('auth.blog.destroy', selectedBlog.id), {
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setSelectedBlog(undefined);
            },
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatReadingTime = (minutes?: number) => {
        if (!minutes) return 'N/A';
        return `${minutes} min read`;
    };

    return (
        <PrimaryLayout>
            <Head title="Blog Management" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                            <p className="text-gray-600">Create and manage your blog posts</p>
                        </div>
                    </div>
                </div>

                {/* Flash Messages */}
                <AnimatePresence>
                    {flash?.success && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <Alert className="bg-green-50 border-green-200">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-700">
                                    {flash.success}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {flash?.error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <Alert className="bg-red-50 border-red-200">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <AlertDescription className="text-red-700">
                                    {flash.error}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Markdown Help Alert */}
                <Alert className="bg-blue-50 border-blue-200">
                    <AlertTitle className="text-blue-900 text-lg">
                        How do I use markdown to write blogs?
                    </AlertTitle>
                    <AlertDescription className="text-blue-800">
                        Markdown allows you to format your content with simple syntax.
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setOpenMarkdownHelp(true)}
                            className=""
                        >
                            Learn more about markdown formatting
                        </Button>
                    </AlertDescription>
                </Alert>

                {/* Statistics Cards */}
                {blogs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <FileText className="h-8 w-8 text-blue-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Posts</p>
                                        <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <Globe className="h-8 w-8 text-green-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Published</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {blogs.filter(blog => blog.is_active).length}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <Eye className="h-8 w-8 text-purple-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Views</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {blogs.reduce((sum, blog) => sum + blog.views, 0).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <ImageIcon className="h-8 w-8 text-yellow-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Featured</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {blogs.filter(blog => blog.is_featured).length}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Main Content */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Blog Posts
                            </CardTitle>
                            <CardDescription>
                                Manage your blog posts and content. Create engaging stories for your community.
                            </CardDescription>
                        </div>
                        <Button
                            onClick={() => {
                                setSelectedBlog(undefined);
                                setOpenDialog(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Blog Post
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Reading Time</TableHead>
                                    <TableHead>Views</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="w-[80px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blogs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            <div className="flex flex-col items-center gap-2">
                                                <FileText className="h-8 w-8 text-gray-400" />
                                                <p className="text-gray-500">No blog posts found</p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedBlog(undefined);
                                                        setOpenDialog(true);
                                                    }}
                                                >
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Create your first blog post
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    blogs.map((blog) => (
                                        <TableRow key={blog.id}>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium">{blog.title}</div>
                                                    <div className="text-sm text-gray-500">
                                                        /{blog.slug}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant={blog.is_active ? "default" : "secondary"}
                                                        className={blog.is_active ? "bg-green-100 text-green-800" : ""}
                                                    >
                                                        {blog.is_active ? 'Published' : 'Draft'}
                                                    </Badge>
                                                    {blog.is_featured && (
                                                        <Badge variant="outline" className="border-yellow-200 text-yellow-800">
                                                            Featured
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {blog.category ? (
                                                    <Badge variant="outline">
                                                        <Tag className="mr-1 h-3 w-3" />
                                                        {blog.category}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <Clock className="h-3 w-3" />
                                                    {formatReadingTime(blog.reading_time? blog.reading_time : 0)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <Eye className="h-3 w-3" />
                                                    {blog.views.toLocaleString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(blog.created_at)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleEdit(blog)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <a
                                                                href={route('auth.blog.show', blog.id)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </a>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDeleteClick(blog)}
                                                            className="text-red-600 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Dialogs */}
            <BlogDialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                    setSelectedBlog(undefined);
                }}
                blog={selectedBlog}
            />

            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setSelectedBlog(undefined);
                }}
                onConfirm={handleDelete}
                title={selectedBlog?.title || ''}
                isSubmitting={isDeleting}
            />

            <MarkdownHelpDialog
                open={openMarkdownHelp}
                onClose={() => setOpenMarkdownHelp(false)}
            />
        </PrimaryLayout>
    );
}
