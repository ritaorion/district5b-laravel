import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Calendar, Clock, MapPin, Search, X, Download, FileText } from 'lucide-react';
import Breadcrumbs from "@/Components/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants, staggerContainer } from "@/lib/animations";
import { Head, Link, router } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { NativeEvent } from '@/types/Event';

interface PaginationData {
    current_page: number;
    data: NativeEvent[];
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

interface EventsProps {
    events: PaginationData;
    filters: {
        search: string | null;
    };
}

const Events = ({ events, filters }: EventsProps) => {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedEvent, setSelectedEvent] = useState<NativeEvent | null>(null);
    const [isEventDetailOpen, setIsEventDetailOpen] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleFilter();
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleFilter = () => {
        const params: Record<string, string> = {};

        if (search) params.search = search;

        router.get('/events', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        router.get('/events', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const openEventDetail = (event: NativeEvent) => {
        setSelectedEvent(event);
        setIsEventDetailOpen(true);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        return new Date(dateString).toLocaleTimeString(undefined, options);
    };

    const createPreviewText = (html: string) => {
        const text = html.replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        return text.length > 150 ? text.substring(0, 147) + '...' : text;
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getS3FileUrl = (storagePath: string): string => {
        const bucketName = import.meta.env.VITE_AWS_BUCKET;
        const region = import.meta.env.VITE_AWS_DEFAULT_REGION;
        return `https://${bucketName}.s3.${region}.amazonaws.com/${storagePath}`;
    };

    const hasActiveFilters = search;

    return (
        <PrimaryLayout>
            <Head title="Upcoming Events" />
            <motion.div
                className="container mx-auto py-6"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className={'flex justify-left'}
                        variants={pageVariants}
                    >
                        <Breadcrumbs
                            pages={[
                                { title: 'Home', href: '/', active: false },
                                { title: 'Events', href: '/events', active: true },
                            ]}
                        />
                    </motion.div>

                    <motion.div
                        className="mb-6"
                        variants={pageVariants}
                    >
                        <motion.h1
                            className="text-3xl font-bold mb-2"
                            variants={pageVariants}
                        >
                            Upcoming Events
                        </motion.h1>
                        <p className="text-muted-foreground">
                            Discover upcoming events and activities in your community.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mb-8 space-y-4"
                        variants={pageVariants}
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search events..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

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
                            Showing {events.from || 0} to {events.to || 0} of {events.total} events
                            {hasActiveFilters && (
                                <span className="ml-2">
                                    with filters applied
                                </span>
                            )}
                        </div>
                    </motion.div>

                    {events.data.length === 0 ? (
                        <motion.div
                            className="text-center py-12"
                            variants={pageVariants}
                        >
                            <h2 className="text-xl">
                                {hasActiveFilters ? 'No events found matching your criteria' : 'No upcoming events found'}
                            </h2>
                            {hasActiveFilters ? (
                                <p className="mt-2 text-muted-foreground">
                                    Try adjusting your search query
                                </p>
                            ) : (
                                <p className="mt-2 text-muted-foreground">
                                    Check back later for upcoming events and activities
                                </p>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8"
                            variants={staggerContainer}
                        >
                            {events.data.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Card className="flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow duration-200"
                                          onClick={() => openEventDetail(event)}>
                                        <CardHeader>
                                            <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                                            <CardDescription className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{formatDate(event.start_time)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    <span>
                                                        {formatTime(event.start_time)} - {formatTime(event.end_time)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="text-sm text-muted-foreground">
                                                {createPreviewText(event.description)}
                                            </p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    openEventDetail(event)
                                                }}
                                                className="w-full"
                                            >
                                                View Details
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Pagination */}
                    {events.last_page > 1 && (
                        <motion.div
                            className="flex justify-center"
                            variants={pageVariants}
                        >
                            <div className="flex items-center space-x-2">
                                {events.prev_page_url && (
                                    <Link
                                        href={events.prev_page_url}
                                        preserveState
                                    >
                                        <Button variant="outline" size="sm">
                                            Previous
                                        </Button>
                                    </Link>
                                )}

                                {events.links
                                    .filter(link => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                                    .map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveState
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

                                {events.next_page_url && (
                                    <Link
                                        href={events.next_page_url}
                                        preserveState
                                    >
                                        <Button variant="outline" size="sm">
                                            Next
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}

                    <AnimatePresence>
                        {isEventDetailOpen && selectedEvent && (
                            <Dialog open={isEventDetailOpen} onOpenChange={setIsEventDetailOpen}>
                                <DialogContent>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <DialogHeader>
                                            <DialogTitle>{selectedEvent.title}</DialogTitle>
                                            <DialogDescription>
                                                <div className="space-y-2 mt-2">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{formatDate(selectedEvent.start_time)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        <span>
                                                            {formatTime(selectedEvent.start_time)} - {formatTime(selectedEvent.end_time)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{selectedEvent.location}</span>
                                                    </div>
                                                </div>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="mt-4">
                                            <div dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />
                                        </div>

                                        {/* File Attachment */}
                                        {selectedEvent.original_file_name && selectedEvent.storage_path && (
                                            <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-start gap-3 flex-1">
                                                        <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium break-words">
                                                                {selectedEvent.original_file_name}
                                                            </p>
                                                            {selectedEvent.file_size && (
                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                    {formatFileSize(selectedEvent.file_size)}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        asChild
                                                    >
                                                        <a
                                                            href={getS3FileUrl(selectedEvent.storage_path)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            download={selectedEvent.original_file_name}
                                                        >
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        <DialogFooter className="mt-6">
                                            <Button onClick={() => setIsEventDetailOpen(false)}>Close</Button>
                                        </DialogFooter>
                                    </motion.div>
                                </DialogContent>
                            </Dialog>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </PrimaryLayout>
    );
};

export default Events;
