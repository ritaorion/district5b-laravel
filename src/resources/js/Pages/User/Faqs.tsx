import React, { useState, useEffect } from 'react';
import PrimaryLayout from "@/Layouts/PrimaryLayout";
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
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import {
    AlertCircle,
    MoreHorizontal,
    Plus,
    Loader2,
} from 'lucide-react';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import axios from 'axios';
import { Faq } from '@/types/Faq';

interface FaqsProps {
    faqs: Faq[];
}

const Faqs = ({ faqs: initialFaqs }: FaqsProps) => {
    const [faqs, setFaqs] = useState<Faq[]>(initialFaqs || []);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const createForm = useForm({
        title: '',
        content: '',
    });

    const editForm = useForm({
        title: '',
        content: '',
    });

    const resetCreateForm = () => {
        createForm.reset();
        createForm.clearErrors();
    };

    const resetEditForm = () => {
        editForm.reset();
        editForm.clearErrors();
    };

    const handleCreateFaq = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await axios.post(route('auth.faq.store'), createForm.data);

            setFaqs(prevFaqs => [response.data.faq, ...prevFaqs]);

            toast.success('FAQ created successfully');
            setIsCreateDialogOpen(false);
            resetCreateForm();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to create FAQ';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditFaq = async () => {
        if (!selectedFaq) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await axios.patch(route('auth.faq.update', selectedFaq.id), editForm.data);

            setFaqs(prevFaqs =>
                prevFaqs.map(faq =>
                    faq.id === selectedFaq.id
                        ? { ...faq, ...editForm.data }
                        : faq
                )
            );

            toast.success('FAQ updated successfully');
            setIsEditDialogOpen(false);
            setSelectedFaq(null);
            resetEditForm();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to update FAQ';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteFaq = async () => {
        if (!selectedFaq) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await axios.delete(route('auth.faq.destroy', selectedFaq.id));

            setFaqs(prevFaqs => prevFaqs.filter(faq => faq.id !== selectedFaq.id));

            toast.success('FAQ deleted successfully');
            setIsDeleteDialogOpen(false);
            setSelectedFaq(null);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to delete FAQ';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openEditDialog = (faq: Faq) => {
        setSelectedFaq(faq);
        editForm.setData({
            title: faq.title,
            content: faq.content,
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (faq: Faq) => {
        setSelectedFaq(faq);
        setIsDeleteDialogOpen(true);
    };

    const openCreateDialog = () => {
        resetCreateForm();
        setIsCreateDialogOpen(true);
    };

    const truncateText = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <PrimaryLayout>
            <Head title="FAQs" />
            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                            <CardDescription>
                                Manage frequently asked questions and answers.
                                {faqs.length > 0 && ` (${faqs.length} total FAQs)`}
                            </CardDescription>
                        </div>
                        <Button onClick={openCreateDialog}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add FAQ
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[30%]">Question</TableHead>
                                        <TableHead className="w-[60%]">Answer</TableHead>
                                        <TableHead className="w-[10%]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {faqs.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-10">
                                                <div className="text-muted-foreground">
                                                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                                                    <p>No FAQs found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        faqs.map((faq) => (
                                            <TableRow key={faq.id}>
                                                <TableCell className="font-medium">
                                                    {truncateText(faq.title, 50) + '...'}
                                                </TableCell>
                                                <TableCell>
                                                    <span title={faq.content}>
                                                        {truncateText(faq.content, 75) + '...'}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Open menu</span>
                                                            </div>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => openEditDialog(faq)}>
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => openDeleteDialog(faq)}
                                                                className="text-red-600 focus:text-red-600"
                                                            >
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
                        )}
                    </CardContent>
                </Card>

                {/* Create FAQ Dialog */}
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Create New FAQ</DialogTitle>
                            <DialogDescription>
                                Add a new frequently asked question and answer.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="question" className="text-right">
                                    Question
                                </Label>
                                <Input
                                    id="question"
                                    name="question"
                                    value={createForm.data.title}
                                    onChange={(e) => createForm.setData('title', e.target.value)}
                                    className="col-span-3"
                                    placeholder="Enter the question..."
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="answer" className="text-right pt-2">
                                    Answer
                                </Label>
                                <Textarea
                                    id="answer"
                                    name="answer"
                                    value={createForm.data.content}
                                    onChange={(e) => createForm.setData('content', e.target.value)}
                                    placeholder="Enter the answer..."
                                    className="col-span-3 min-h-[120px]"
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsCreateDialogOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateFaq}
                                disabled={isSubmitting || !createForm.data.title || !createForm.data.content}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create FAQ
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit FAQ Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Edit FAQ</DialogTitle>
                            <DialogDescription>
                                Make changes to this FAQ.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-question" className="text-right">
                                    Question
                                </Label>
                                <Input
                                    id="edit-question"
                                    name="question"
                                    value={editForm.data.title}
                                    onChange={(e) => editForm.setData('title', e.target.value)}
                                    className="col-span-3"
                                    placeholder="Enter the question..."
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="edit-answer" className="text-right pt-2">
                                    Answer
                                </Label>
                                <Textarea
                                    id="edit-answer"
                                    name="answer"
                                    value={editForm.data.content}
                                    onChange={(e) => editForm.setData('content', e.target.value)}
                                    placeholder="Enter the answer..."
                                    className="col-span-3 min-h-[120px]"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleEditFaq}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete FAQ Dialog */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this FAQ?
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteDialogOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteFaq}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Delete FAQ
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </PrimaryLayout>
    );
};

export default Faqs;
