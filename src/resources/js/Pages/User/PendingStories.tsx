import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { formatDate } from '@/lib/utils';
import { MoreHorizontal, Eye, CheckCircle, XCircle, Loader2, MessageSquare, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

interface PendingStory {
    id: number;
    title: string;
    content: string;
    author: string | null;
    email: string;
    anonymous: boolean;
    status: 'new' | 'approved' | 'rejected';
    created_at: string;
}

interface PendingStoriesProps {
    stories: PendingStory[];
}

const PendingStories = ({ stories: initialStories }: PendingStoriesProps) => {
    const [stories, setStories] = useState<PendingStory[]>(initialStories || []);
    const [selectedStory, setSelectedStory] = useState<PendingStory | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
    const [isApproveDialogOpen, setIsApproveDialogOpen] = useState<boolean>(false);
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const openViewDialog = (story: PendingStory) => {
        setSelectedStory(story);
        setIsViewDialogOpen(true);
    };

    const openApproveDialog = (story: PendingStory) => {
        setSelectedStory(story);
        setIsApproveDialogOpen(true);
    };

    const openRejectDialog = (story: PendingStory) => {
        setSelectedStory(story);
        setIsRejectDialogOpen(true);
    };

    const openDeleteDialog = (story: PendingStory) => {
        setSelectedStory(story);
        setIsDeleteDialogOpen(true);
    };

    const handleConvertToBlog = (story: PendingStory) => {
        router.visit(`/auth/blogs?ref=${story.id}`);
    };

    const handleApproveStory = async () => {
        if (!selectedStory) return;

        setIsProcessing(true);
        try {
            const response = await axios.post(route('auth.pending-story.approve', selectedStory.id));
            setStories(prev => prev.map(story =>
                story.id === selectedStory.id
                    ? { ...story, status: 'approved' as const }
                    : story
            ));
            setIsApproveDialogOpen(false);
            setSelectedStory(null);
            toast.success('Story approved and user notified');
        } catch (error: any) {
            console.error('Error approving story:', error);
            toast.error(error.response?.data?.message || 'Failed to approve story');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRejectStory = async () => {
        if (!selectedStory) return;

        setIsProcessing(true);
        try {
            const response = await axios.post(route('auth.pending-story.reject', selectedStory.id));
            setStories(prev => prev.map(story =>
                story.id === selectedStory.id
                    ? { ...story, status: 'rejected' as const }
                    : story
            ));
            setIsRejectDialogOpen(false);
            setSelectedStory(null);
            toast.success('Story rejected and user notified');
        } catch (error: any) {
            console.error('Error rejecting story:', error);
            toast.error(error.response?.data?.message || 'Failed to reject story');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteStory = async () => {
        if (!selectedStory) return;

        setIsProcessing(true);
        try {
            await axios.delete(route('auth.pending-story.destroy', selectedStory.id));
            setStories(prev => prev.filter(story => story.id !== selectedStory.id));
            setIsDeleteDialogOpen(false);
            setSelectedStory(null);
            toast.success('Story deleted successfully');
        } catch (error: any) {
            console.error('Error deleting story:', error);
            toast.error(error.response?.data?.message || 'Failed to delete story');
        } finally {
            setIsProcessing(false);
        }
    };

    const truncateText = (text: string, length: number) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <PrimaryLayout>
            <Head title="Pending Stories" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pending Stories</h1>
                    <p className="text-muted-foreground">
                        Review and manage story submissions from users
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Story Submissions</CardTitle>
                        <CardDescription>
                            Review stories submitted by users and approve them for publication or provide feedback.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stories.length === 0 ? (
                            <div className="text-center py-8">
                                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No pending stories</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    All story submissions have been reviewed.
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Preview</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Submitted</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stories.map((story) => (
                                        <TableRow key={story.id}>
                                            <TableCell className="font-medium max-w-[200px]">
                                                {truncateText(story.title, 50)}
                                            </TableCell>
                                            <TableCell>
                                                {story.anonymous ? (
                                                    <Badge variant="secondary">Anonymous</Badge>
                                                ) : (
                                                    story.author
                                                )}
                                            </TableCell>
                                            <TableCell>{story.email}</TableCell>
                                            <TableCell className="max-w-[300px]">
                                                <span className="text-sm text-gray-600">
                                                    {truncateText(story.content, 100)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        story.status === 'new' ? 'default' :
                                                        story.status === 'approved' ? 'secondary' : 'destructive'
                                                    }
                                                    className={
                                                        story.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                                        story.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                    }
                                                >
                                                    {story.status === 'new' ? 'New' :
                                                     story.status === 'approved' ? 'Approved' : 'Rejected'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{formatDate(story.created_at)}</TableCell>
                                            <TableCell>
                                                <DropdownMenu modal={false}>
                                                    <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openViewDialog(story)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Full Story
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleConvertToBlog(story)}>
                                                            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                                            Convert to Blog
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => openApproveDialog(story)}>
                                                            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                                            Approve & Notify
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => openRejectDialog(story)}>
                                                            <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                                            Reject & Notify
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => openDeleteDialog(story)}
                                                            className="text-red-600 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Story
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{selectedStory?.title}</DialogTitle>
                            <DialogDescription>
                                {selectedStory ? (
                                    <>
                                        Submitted by {selectedStory.anonymous ? 'Anonymous' : selectedStory.author}
                                        ({selectedStory.email}) on {formatDate(selectedStory.created_at)}
                                    </>
                                ) : null}
                            </DialogDescription>
                        </DialogHeader>
                        {selectedStory && (
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Story Content</h4>
                                    <div className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-md max-h-60 overflow-y-auto">
                                        {selectedStory.content}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Author:</span> {selectedStory.anonymous ? 'Anonymous' : selectedStory.author}
                                    </div>
                                    <div>
                                        <span className="font-medium">Email:</span> {selectedStory.email}
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                                Close
                            </Button>
                            {selectedStory && (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsViewDialogOpen(false);
                                            handleConvertToBlog(selectedStory);
                                        }}
                                        className="text-green-600 border-green-600 hover:bg-green-50"
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Convert to Blog
                                    </Button>
                                </>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Approve Story</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to approve "{selectedStory?.title}"?
                                The author will be notified via email that their story has been approved.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsApproveDialogOpen(false)}
                                disabled={isProcessing}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleApproveStory}
                                disabled={isProcessing}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Approve & Notify
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Reject Story</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to reject "{selectedStory?.title}"?
                                The author will be notified via email that their story was not approved for publication.
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsRejectDialogOpen(false)}
                                disabled={isProcessing}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleRejectStory}
                                disabled={isProcessing}
                            >
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Reject & Notify
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Story</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to permanently delete "{selectedStory?.title}"?
                                This action cannot be undone and the story will be completely removed from the system.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteDialogOpen(false)}
                                disabled={isProcessing}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteStory}
                                disabled={isProcessing}
                            >
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Delete Permanently
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </PrimaryLayout>
    );
};

export default PendingStories;
