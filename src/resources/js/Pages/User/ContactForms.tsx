import { useState } from 'react';
import axios from 'axios';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { AlertCircle, MoreHorizontal, Loader2, Sheet } from 'lucide-react';
import { ContactForm } from '@/types/ContactForm';
import { toast } from 'sonner'
import { Head } from '@inertiajs/react';


interface IContactFormsProps {
    forms: ContactForm[];
}

const ContactForms = ({ forms: initialForms }: IContactFormsProps) => {
    const [forms, setForms] = useState<ContactForm[]>(initialForms || []);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

    const fetchContactDetails = async (id: string | number) => {
        setLoadingDetails(true);
        setError(null);

        try {
            const response = await axios.get(route('auth.contact-form.show', id));
            setSelectedForm(response.data);
            setIsViewDialogOpen(true);
        } catch (error: any) {
            console.error('Error fetching contact details:', error);
            setError(error.response?.data?.message || 'Failed to fetch contact details');
            toast.error('Failed to fetch contact details');
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleDeleteContact = async () => {
        if (!selectedForm) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await axios.delete(route('auth.contact-form.destroy', selectedForm.id));
            setForms(prevForms => prevForms.filter(form => form.id !== selectedForm.id));
            setIsDeleteDialogOpen(false);
            setSelectedForm(null);
            toast.success('Contact form deleted successfully');
        } catch (error: any) {
            console.error('Error deleting contact form:', error);
            setError(error.response?.data?.message || 'Failed to delete contact form');
            toast.error('Failed to delete contact form');
        } finally {
            setIsSubmitting(false);
        }
    };

    const openViewDialog = async (id: string | number) => {
        setIsViewDialogOpen(true);
        await fetchContactDetails(id);
    };

    const openDeleteDialog = (contact: ContactForm) => {
        setSelectedForm(contact);
        setIsDeleteDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const exportSingleForm = async (id: string) => {
        const contact = forms.find((contact) => contact.id === id);
        if (!contact) {
            setError('Contact form not found');
            return;
        }

        const { name, email, subject, message, created_at } = contact;
        const formattedDate = new Date(created_at).toLocaleDateString();
        const csvData = `Name,Email,Subject,Message,Submitted On\n"${name}","${email}","${subject}","${message}","${formattedDate}"`;

        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contact-form-${id}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const exportAllForms = async () => {
        const headers = "ID,Name,Email,Subject,Message,Submitted On\n";
        const csvData = headers + forms.map(({ id, name, email, subject, message, created_at }) => {
            const formattedDate = new Date(created_at).toLocaleDateString();
            return `"${id}","${name}","${email}","${subject}","${message}","${formattedDate}"`;
        }).join('\n');

        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `all-contact-forms.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    useState(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    });

    return (
        <PrimaryLayout>
            <Head title="Contact Forms" />
            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Contact Form Submissions</CardTitle>
                            <CardDescription>
                                View and manage contact form submissions from your website.
                                {forms.length > 0 && ` (${forms.length} total submissions)`}
                            </CardDescription>
                        </div>
                        <Button
                            onClick={() => exportAllForms()}
                            disabled={forms.length === 0}
                        >
                            <Sheet className="mr-2 h-4 w-4"/>
                            Export All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4"/>
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
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="w-[80px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {forms.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-10">
                                                <div className="text-muted-foreground">
                                                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                                                    <p>No contact form submissions found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        forms.map((contact) => (
                                            <TableRow key={contact.id}>
                                                <TableCell className="font-medium">{contact.name}</TableCell>
                                                <TableCell>{contact.email}</TableCell>
                                                <TableCell className="max-w-xs truncate" title={contact.subject}>
                                                    {contact.subject}
                                                </TableCell>
                                                <TableCell>{formatDate(contact.created_at)}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Open menu</span>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => openViewDialog(contact.id)}>
                                                                <Sheet className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => exportSingleForm(contact.id)}>
                                                                <Sheet className="mr-2 h-4 w-4" />
                                                                Export
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => openDeleteDialog(contact)}>
                                                                <AlertCircle className="mr-2 h-4 w-4 text-red-600" />
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
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Contact Form Details</DialogTitle>
                            <DialogDescription>
                                {selectedForm ? (
                                    <>Submission from {selectedForm.name} on {formatDate(selectedForm.created_at)}</>
                                ) : (
                                    'Loading contact details...'
                                )}
                            </DialogDescription>
                        </DialogHeader>
                        {loadingDetails ? (
                            <div className="flex justify-center items-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : selectedForm ? (
                            <div className="space-y-4 py-2">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Name</h4>
                                    <p className="text-sm text-gray-600">{selectedForm.name}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Email</h4>
                                    <p className="text-sm text-gray-600">
                                        <a href={`mailto:${selectedForm.email}`} className="text-blue-600 hover:underline">
                                            {selectedForm.email}
                                        </a>
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Subject</h4>
                                    <p className="text-sm text-gray-600">{selectedForm.subject}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Message</h4>
                                    <div className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded-md max-h-40 overflow-y-auto">
                                        {selectedForm.message}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Submitted On</h4>
                                    <p className="text-sm text-gray-600">{formatDate(selectedForm.created_at)}</p>
                                </div>
                            </div>
                        ) : null}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                                Close
                            </Button>
                            {selectedForm && (
                                <Button onClick={() => exportSingleForm(selectedForm.id)}>
                                    <Sheet className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this contact form submission from <strong>{selectedForm?.name}</strong>?
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
                                onClick={handleDeleteContact}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </PrimaryLayout>
    );
};

export default ContactForms;
