import React from 'react';
import PrimaryLayout from "@/Layouts/PrimaryLayout";
import { useState, useEffect } from 'react';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { AlertCircle, MoreHorizontal, Plus, Loader2 } from 'lucide-react';
import { User } from '@/types/User';
import { toast } from 'sonner';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';

interface IUsersProps {
    users: User[];
}

interface IUsersState {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
}

const Users = ({ users: initialUsers }: IUsersProps) => {
    const [users, setUsers] = useState<User[]>(initialUsers || []);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<Partial<IUsersState>>({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        is_admin: false,
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const resetFormData = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            is_admin: false,
        });
    };

    const handleCreateUser = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const payload = {
                username: formData.username || "",
                email: formData.email || "",
                password: formData.password || "password123",
                first_name: formData.first_name || "",
                last_name: formData.last_name || "",
                is_admin: Boolean(formData.is_admin)
            };

            // Create user via API (you'll need to add this route)
            const response = await axios.post(route('auth.user.store'), payload);

            // Add the new user to local state
            setUsers(prevUsers => [response.data.user, ...prevUsers]);

            toast.success('User created successfully');
            setIsCreateDialogOpen(false);
            resetFormData();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to create user';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditUser = async () => {
        if (!selectedUser) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const payload = {
                username: formData.username || selectedUser.username,
                email: formData.email || selectedUser.email,
                first_name: formData.first_name || selectedUser.first_name,
                last_name: formData.last_name || selectedUser.last_name,
                is_admin: formData.is_admin !== undefined ? formData.is_admin : selectedUser.is_admin,
                ...(formData.password ? { password: formData.password } : {})
            };

            await axios.patch(route('auth.user.update', selectedUser.id), payload);

            // Update user in local state
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === selectedUser.id
                        ? { ...user, ...payload }
                        : user
                )
            );

            toast.success('User updated successfully');
            setIsEditDialogOpen(false);
            setSelectedUser(null);
            resetFormData();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to update user';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await axios.delete(route('auth.user.destroy', selectedUser.id));

            // Remove user from local state
            setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUser.id));

            toast.success('User deleted successfully');
            setIsDeleteDialogOpen(false);
            setSelectedUser(null);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to delete user';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const openEditDialog = (user: User) => {
        setSelectedUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            is_admin: user.is_admin,
            password: '', // Don't pre-fill password
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (user: User) => {
        setSelectedUser(user);
        setIsDeleteDialogOpen(true);
    };

    const openCreateDialog = () => {
        resetFormData();
        setIsCreateDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
            <Head title="Users" />
            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>
                                Manage user accounts and permissions.
                                {users.length > 0 && ` (${users.length} total users)`}
                            </CardDescription>
                        </div>
                        <Button onClick={openCreateDialog}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
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
                                        <TableHead>Username</TableHead>
                                        <TableHead>Full Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Admin</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="w-[80px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-10">
                                                <div className="text-muted-foreground">
                                                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                                                    <p>No users found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.username}</TableCell>
                                                <TableCell>{user.first_name} {user.last_name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        user.is_admin
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {user.is_admin ? 'Yes' : 'No'}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{formatDate(user.created_at)}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Open menu</span>
                                                            </div>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => openEditDialog(user)}>
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => openDeleteDialog(user)}
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

                {/* Create User Dialog */}
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New User</DialogTitle>
                            <DialogDescription>
                                Add a new user to the system.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    name="username"
                                    value={formData.username || ''}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="first_name" className="text-right">
                                    First Name
                                </Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name || ''}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="last_name" className="text-right">
                                    Last Name
                                </Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name || ''}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="password" className="text-right">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password || ''}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                    placeholder="Default: password123"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="is_admin" className="text-right">
                                    Admin
                                </Label>
                                <div className="col-span-3 flex items-center space-x-2">
                                    <input
                                        id="is_admin"
                                        name="is_admin"
                                        type="checkbox"
                                        checked={formData.is_admin === true}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <Label htmlFor="is_admin">User has admin privileges</Label>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsCreateDialogOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={handleCreateUser}
                                disabled={isSubmitting || !formData.username || !formData.email}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create User
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit User Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                            <DialogDescription>
                                Make changes to {selectedUser?.username}'s information.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-username" className="text-right">
                                    Username
                                </Label>
                                <Input
                                    id="edit-username"
                                    name="username"
                                    value={formData.username || ''}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="edit-email"
                                    name="email"
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-first_name" className="text-right">
                                    First Name
                                </Label>
                                <Input
                                    id="edit-first_name"
                                    name="first_name"
                                    value={formData.first_name || ''}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-last_name" className="text-right">
                                    Last Name
                                </Label>
                                <Input
                                    id="edit-last_name"
                                    name="last_name"
                                    value={formData.last_name || ''}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-password" className="text-right">
                                    Password
                                </Label>
                                <Input
                                    id="edit-password"
                                    name="password"
                                    type="password"
                                    value={formData.password || ''}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-is_admin" className="text-right">
                                    Admin
                                </Label>
                                <div className="col-span-3 flex items-center space-x-2">
                                    <input
                                        id="edit-is_admin"
                                        name="is_admin"
                                        type="checkbox"
                                        checked={formData.is_admin === true}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <Label htmlFor="edit-is_admin">User has admin privileges</Label>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={handleEditUser}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete User Dialog */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete <strong>{selectedUser?.username}</strong>
                                ({selectedUser?.first_name} {selectedUser?.last_name})?
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDeleteDialogOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleDeleteUser}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Delete User
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </PrimaryLayout>
    );
};

export default Users;
