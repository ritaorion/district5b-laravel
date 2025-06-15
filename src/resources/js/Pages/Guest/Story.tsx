import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import Breadcrumbs from "@/Components/Breadcrumbs";
import { Head } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Blog } from '@/types/Blog';

interface StoryProps {
    story: Blog;
}

const Story = ({ story }: StoryProps) => {
    const parseTags = (tags: string): string[] => {
        try {
            return JSON.parse(tags || '[]');
        } catch (e) {
            return [];
        }
    };

    const tags = parseTags(story.tags);

    return (
        <PrimaryLayout>
            <Head title={story.title} />
            <div className="container mx-auto py-6">
                <div className="max-w-3xl mx-auto">
                    <Breadcrumbs
                        pages={[
                            { title: 'Home', href: '/', active: false },
                            { title: 'Stories', href: '/stories', active: false },
                            { title: story.title, href: '#', active: true },
                        ]}
                    />
                    <Card>
                        {story.featured_image && (
                            <div className="relative h-[400px] overflow-hidden rounded-t-lg">
                                <img
                                    src={story.featured_image}
                                    alt={story.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <CardHeader>
                            <div className="space-y-1">
                                {story.category && (
                                    <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                                        {story.category}
                                    </span>
                                )}
                                <CardTitle className="text-3xl font-bold">{story.title}</CardTitle>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>By Anonymous A.</span>
                                    <span>•</span>
                                    <span>{story.published_at ? formatDate(story.published_at) : 'Not published'}</span>
                                    {story.reading_time_minutes && (
                                        <>
                                            <span>•</span>
                                            <span>{story.reading_time_minutes} min read</span>
                                        </>
                                    )}
                                </div>
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-lg max-w-none dark:prose-invert">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                                    components={{
                                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
                                        h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                                        p: ({node, ...props}) => <p className="my-4" {...props} />,
                                        ul: ({node, ...props}) => <ul className="list-disc list-inside my-4" {...props} />,
                                        ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4" {...props} />,
                                        li: ({node, ...props}) => <li className="my-2" {...props} />,
                                        a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 my-4 italic" {...props} />,
                                        img: ({node, ...props}) => <img className="rounded-lg my-4" {...props} />,
                                        code: ({inline, className, children, ...props}: {
                                            inline?: boolean;
                                            className?: string;
                                            children?: React.ReactNode;
                                        }) =>
                                            inline ? (
                                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>{children}</code>
                                            ) : (
                                                <code className="block bg-muted p-4 rounded-lg my-4 overflow-x-auto" {...props}>{children}</code>
                                            ),
                                    }}
                                >
                                    {story.content}
                                </ReactMarkdown>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PrimaryLayout>
    );
};

export default Story;
