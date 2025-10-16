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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    MoreHorizontal,
    Plus,
    Loader2,
    Edit,
    Trash2,
} from 'lucide-react';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import axios from 'axios';

interface Roster {
    id: number;
    name: string;
    title: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
}

interface RostersProps {
    rosters: Roster[];
}

const Rosters = ({ rosters: initialRosters }: RostersProps) => {
    const [rosters, setRosters] = useState<Roster[]>(initialRosters || []);
    const [error, setError] = useState<string | null>(null);
    const [selectedRoster, setSelectedRoster] = useState<Roster | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


    const createForm = useForm({
        name: '',
        title: '',
        phone: '',
        email: '',
    });

    const editForm = useForm({
        name: '',
        title: '',
        phone: '',
        email: '',
    });

    const resetCreateForm = () => {
        createForm.reset();
        createForm.clearErrors();
    };

    const resetEditForm = () => {
        editForm.reset();
        editForm.clearErrors();
    };

    const handleCreateRoster = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/auth/rosters', createForm.data);
            if (response.data.roster) {
                setRosters(prevRosters => [response.data.roster, ...prevRosters]);
                toast.success('Roster entry created successfully!');
                setIsCreateDialogOpen(false);
                resetCreateForm();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to create roster entry';
            toast.error(errorMessage);
            if (error.response?.data?.errors) {
                Object.keys(error.response.data.errors).forEach(key => {
                    createForm.setError(key as keyof typeof createForm.data, error.response.data.errors[key][0]);
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditRoster = async () => {
        if (!selectedRoster) return;

        setIsSubmitting(true);
        try {
            await axios.patch(`/auth/rosters/${selectedRoster.id}`, editForm.data);
            setRosters(prevRosters =>
                prevRosters.map(roster =>
                    roster.id === selectedRoster.id
                        ? { ...roster, ...editForm.data }
                        : roster
                )
            );
            toast.success('Roster entry updated successfully!');
            setIsEditDialogOpen(false);
            setSelectedRoster(null);
            resetEditForm();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to update roster entry';
            toast.error(errorMessage);
            if (error.response?.data?.errors) {
                Object.keys(error.response.data.errors).forEach(key => {
                    editForm.setError(key as keyof typeof editForm.data, error.response.data.errors[key][0]);
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteRoster = async () => {
        if (!selectedRoster) return;

        setIsSubmitting(true);
        try {
            await axios.delete(`/auth/rosters/${selectedRoster.id}`);
            setRosters(prevRosters => prevRosters.filter(roster => roster.id !== selectedRoster.id));
            toast.success('Roster entry deleted successfully!');
            setIsDeleteDialogOpen(false);
            setSelectedRoster(null);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to delete roster entry';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openEditDialog = (roster: Roster) => {
        setSelectedRoster(roster);
        editForm.setData({
            name: roster.name,
            title: roster.title,
            phone: roster.phone || '',
            email: roster.email || '',
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (roster: Roster) => {
        setSelectedRoster(roster);
        setIsDeleteDialogOpen(true);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);


    return (
        <PrimaryLayout>
            <Head title="Rosters" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Rosters</h1>
                        <p className="text-muted-foreground">
                            Manage district roster entries including contact information.
                        </p>
                    </div>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Roster Entry
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Roster Entries</CardTitle>
                        <CardDescription>
                            A list of all roster entries with their contact information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {rosters.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">No roster entries found.</p>
                                <Button
                                    onClick={() => setIsCreateDialogOpen(true)}
                                    className="mt-4"
                                    variant="outline"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First Entry
                                </Button>
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead className="w-[100px]">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rosters.map((roster) => (
                                            <TableRow key={roster.id}>
                                                <TableCell className="font-medium">
                                                    {roster.name}
                                                </TableCell>
                                                <TableCell>
                                                    {roster.title}
                                                </TableCell>
                                                <TableCell>
                                                    {roster.phone || 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    {roster.email || 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu modal={false}>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => openEditDialog(roster)}>
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => openDeleteDialog(roster)}
                                                                className="text-destructive"
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog
                key="create-dialog"
                open={isCreateDialogOpen}
                onOpenChange={(open) => {
                    setIsCreateDialogOpen(open);
                    if (!open) {
                        resetCreateForm();
                    }
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Roster Entry</DialogTitle>
                        <DialogDescription>
                            Create a new roster entry. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="create-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="create-name"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                className="col-span-3"
                                placeholder="Enter full name"
                            />
                            {createForm.errors.name && (
                                <div className="col-span-4 text-sm text-destructive">
                                    {createForm.errors.name}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="create-title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="create-title"
                                value={createForm.data.title}
                                onChange={(e) => createForm.setData('title', e.target.value)}
                                className="col-span-3"
                                placeholder="Enter job title"
                            />
                            {createForm.errors.title && (
                                <div className="col-span-4 text-sm text-destructive">
                                    {createForm.errors.title}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="create-phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="create-phone"
                                value={createForm.data.phone}
                                onChange={(e) => createForm.setData('phone', e.target.value)}
                                className="col-span-3"
                                placeholder="Enter phone number"
                            />
                            {createForm.errors.phone && (
                                <div className="col-span-4 text-sm text-destructive">
                                    {createForm.errors.phone}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="create-email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="create-email"
                                type="email"
                                value={createForm.data.email}
                                onChange={(e) => createForm.setData('email', e.target.value)}
                                className="col-span-3"
                                placeholder="Enter email address"
                            />
                            {createForm.errors.email && (
                                <div className="col-span-4 text-sm text-destructive">
                                    {createForm.errors.email}
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsCreateDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleCreateRoster} disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Entry
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                key={`edit-${selectedRoster?.id || 'none'}`}
                open={isEditDialogOpen}
                onOpenChange={(open) => {
                    setIsEditDialogOpen(open);
                    if (!open) {
                        setSelectedRoster(null);
                        resetEditForm();
                    }
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Roster Entry</DialogTitle>
                        <DialogDescription>
                            Make changes to the roster entry. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="edit-name"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                className="col-span-3"
                                placeholder="Enter full name"
                            />
                            {editForm.errors.name && (
                                <div className="col-span-4 text-sm text-destructive">
                                    {editForm.errors.name}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="edit-title"
                                value={editForm.data.title}
                                onChange={(e) => editForm.setData('title', e.target.value)}
                                className="col-span-3"
                                placeholder="Enter job title"
                            />
                            {editForm.errors.title && (
                                <div className="col-span-4 text-sm text-destructive">
                                    {editForm.errors.title}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="edit-phone"
                                value={editForm.data.phone}
                                onChange={(e) => editForm.setData('phone', e.target.value)}
                                className="col-span-3"
                                placeholder="Enter phone number"
                            />
                            {editForm.errors.phone && (
                                <div className="col-span-4 text-sm text-destructive">
                                    {editForm.errors.phone}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="edit-email"
                                type="email"
                                value={editForm.data.email}
                                onChange={(e) => editForm.setData('email', e.target.value)}
                                className="col-span-3"
                                placeholder="Enter email address"
                            />
                            {editForm.errors.email && (
                                <div className="col-span-4 text-sm text-destructive">
                                    {editForm.errors.email}
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleEditRoster} disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog
                key={`delete-${selectedRoster?.id || 'none'}`}
                open={isDeleteDialogOpen}
                onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open);
                    if (!open) {
                        setSelectedRoster(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the roster entry
                            for <strong>{selectedRoster?.name}</strong> from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteRoster}
                            disabled={isSubmitting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete Entry
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </PrimaryLayout>
    );
};

export default Rosters;
