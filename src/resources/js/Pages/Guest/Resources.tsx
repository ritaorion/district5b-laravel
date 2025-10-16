import { useState, useEffect } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/Components/ui/table';
import { Search, Download, Eye, X } from 'lucide-react';
import {cn, formatFileSize, isMobile} from "@/lib/utils";
import Breadcrumbs from '@/Components/Breadcrumbs';
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants } from "@/lib/animations";
import { Head, Link, router } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Document } from "@/types/Document";

interface PaginationData {
    current_page: number;
    data: Document[];
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

interface ResourcesProps {
    documents: PaginationData;
    filters: {
        search: string | null;
    };
}

export default function Resources({ documents, filters }: ResourcesProps) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            handleFilter();
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleFilter = () => {
        const params: Record<string, string> = {};

        if (search) params.search = search;

        router.get('/resources', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        router.get('/resources', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const cleanFileName = (filename: string) => {
        return filename
            .replace(/-/g, ' ')
            .replace(/\.pdf$/i, '')
            .replace(/\.docx?$/i, '')
            .replace(/\.xlsx?$/i, '');
    };

    const handleView = (fileName: string) => {
        const url = `/resources/${encodeURIComponent(fileName)}?action=view`;
        window.open(url, '_blank');
    };

    const handleDownload = (fileName: string) => {
        const url = `/resources/${encodeURIComponent(fileName)}?action=download`;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const hasActiveFilters = search;

    return (
        <PrimaryLayout>
            <Head title="Resources" />
            <motion.div
                className="container mx-auto py-6"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="flex justify-left"
                        variants={pageVariants}
                    >
                        <Breadcrumbs
                            pages={[
                                { title: 'Home', href: '/', active: false },
                                { title: 'Resources', href: '/resources', active: true },
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
                            Available Documents
                        </motion.h1>
                        <p className="text-muted-foreground">
                            This page provides access to downloadable documents and resources.
                            Use the search box to quickly find specific files.
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
                                    placeholder="Search documents..."
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
                            Showing {documents.from || 0} to {documents.to || 0} of {documents.total} documents
                            {hasActiveFilters && (
                                <span className="ml-2">
                                    with filters applied
                                </span>
                            )}
                        </div>
                    </motion.div>

                    {documents.data.length === 0 ? (
                        <motion.div
                            className="text-center py-12"
                            variants={pageVariants}
                        >
                            <h2 className="text-xl">
                                {hasActiveFilters ? 'No documents found matching your criteria' : 'No documents available'}
                            </h2>
                            {hasActiveFilters ? (
                                <p className="mt-2 text-muted-foreground">
                                    Try adjusting your search query
                                </p>
                            ) : (
                                <p className="mt-2 text-muted-foreground">
                                    Check back later for available resources
                                </p>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="border rounded-md mb-8"
                            variants={pageVariants}
                        >
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Document Name</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead className={'text-end'}>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <AnimatePresence>
                                        {documents.data.map((doc, index) => (
                                            <motion.tr
                                                key={doc.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: { delay: index * 0.05 }
                                                }}
                                                exit={{ opacity: 0, y: -20 }}
                                                whileHover={{
                                                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                                                    transition: { duration: 0.2 }
                                                }}
                                            >
                                                <TableCell className="font-medium whitespace-normal break-words">
                                                    {cleanFileName(doc.original_file_name)}
                                                </TableCell>
                                                <TableCell>
                                                    {formatFileSize(doc.file_size.toString())}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end gap-2">
                                                        <motion.div
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleView(doc.original_file_name)}
                                                            >
                                                                <Eye className={cn(isMobile() ? '' : 'mr-2', 'h-4 w-4')} />
                                                                {!isMobile() && (
                                                                    <span>View</span>
                                                                )}
                                                            </Button>
                                                        </motion.div>
                                                        <motion.div
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleDownload(doc.original_file_name)}
                                                            >
                                                                <Download className={cn(isMobile() ? '' : 'mr-2', 'h-4 w-4')} />
                                                                {!isMobile() && (
                                                                    <span>Download</span>
                                                                )}
                                                            </Button>
                                                        </motion.div>
                                                    </div>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </TableBody>
                            </Table>
                        </motion.div>
                    )}

                    {documents.last_page > 1 && (
                        <motion.div
                            className="flex justify-center"
                            variants={pageVariants}
                        >
                            <div className="flex items-center space-x-2">
                                {documents.prev_page_url && (
                                    <Link
                                        href={documents.prev_page_url}
                                        preserveState
                                    >
                                        <Button variant="outline" size="sm">
                                            Previous
                                        </Button>
                                    </Link>
                                )}

                                {documents.links
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

                                {documents.next_page_url && (
                                    <Link
                                        href={documents.next_page_url}
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
                </div>
            </motion.div>
        </PrimaryLayout>
    );
}
