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

interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
}

interface EventsProps {
    events: Event[];
}

const Events = ({ events: initialEvents }: EventsProps) => {
    const [events, setEvents] = useState<Event[]>(initialEvents || []);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const createForm = useForm({
        title: '',
        description: '',
        location: '',
        start_time: '',
        end_time: '',
    });

    const editForm = useForm({
        title: '',
        description: '',
        location: '',
        start_time: '',
        end_time: '',
    });

    const resetCreateForm = () => {
        createForm.reset();
        createForm.clearErrors();
    };

    const resetEditForm = () => {
        editForm.reset();
        editForm.clearErrors();
    };

    const handleCreateEvent = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await axios.post(route('auth.event.store'), {
                ...createForm.data,
                start_time: createForm.data.start_time ? formatDateTimeForAPI(createForm.data.start_time) : '',
                end_time: createForm.data.end_time ? formatDateTimeForAPI(createForm.data.end_time) : ''
            });

            setEvents(prevEvents => [response.data.event, ...prevEvents]);

            toast.success('Event created successfully');
            setIsCreateDialogOpen(false);
            resetCreateForm();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to create event';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditEvent = async () => {
        if (!selectedEvent) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await axios.patch(route('auth.event.update', selectedEvent.id), {
                ...editForm.data,
                start_time: editForm.data.start_time ? formatDateTimeForAPI(editForm.data.start_time) : '',
                end_time: editForm.data.end_time ? formatDateTimeForAPI(editForm.data.end_time) : ''
            });

            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event.id === selectedEvent.id
                        ? { ...event, ...editForm.data }
                        : event
                )
            );

            toast.success('Event updated successfully');
            setIsEditDialogOpen(false);
            setSelectedEvent(null);
            resetEditForm();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to update event';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteEvent = async () => {
        if (!selectedEvent) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await axios.delete(route('auth.event.destroy', selectedEvent.id));

            setEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEvent.id));

            toast.success('Event deleted successfully');
            setIsDeleteDialogOpen(false);
            setSelectedEvent(null);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to delete event';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openEditDialog = (event: Event) => {
        setSelectedEvent(event);
        editForm.setData({
            title: event.title,
            description: event.description,
            location: event.location,
            start_time: formatDateTimeForInput(event.start_time),
            end_time: formatDateTimeForInput(event.end_time),
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (event: Event) => {
        setSelectedEvent(event);
        setIsDeleteDialogOpen(true);
    };

    const openCreateDialog = () => {
        resetCreateForm();
        setIsCreateDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDateTimeForInput = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    const formatDateTimeForAPI = (dateString: string) => {
        const date = new Date(dateString);
        const tzOffset = -date.getTimezoneOffset();
        const tzOffsetHours = Math.floor(Math.abs(tzOffset) / 60);
        const tzOffsetMinutes = Math.abs(tzOffset) % 60;
        const tzSign = tzOffset >= 0 ? '+' : '-';
        const tzString = `${tzSign}${String(tzOffsetHours).padStart(2, '0')}:${String(tzOffsetMinutes).padStart(2, '0')}`;
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:00${tzString}`;
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <PrimaryLayout>
            <Head title="Events" />
            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Events</CardTitle>
                            <CardDescription>
                                Manage events and announcements.
                                {events.length > 0 && ` (${events.length} total events)`}
                            </CardDescription>
                        </div>
                        <Button onClick={openCreateDialog}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Event
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
                                        <TableHead>Title</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Start Time</TableHead>
                                        <TableHead>End Time</TableHead>
                                        <TableHead className="w-[80px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {events.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-10">
                                                <div className="text-muted-foreground">
                                                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                                                    <p>No events found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        events.map((event) => (
                                            <TableRow key={event.id}>
                                                <TableCell className="font-medium">{event.title}</TableCell>
                                                <TableCell>{event.location}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span>{formatDate(event.start_time)}</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {formatTime(event.start_time)}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span>{formatDate(event.end_time)}</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {formatTime(event.end_time)}
                                                        </span>
                                                    </div>
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
                                                            <DropdownMenuItem onClick={() => openEditDialog(event)}>
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => openDeleteDialog(event)}
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
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Create New Event</DialogTitle>
                            <DialogDescription>
                                Add a new event or announcement.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={createForm.data.title}
                                    onChange={(e) => createForm.setData('title', e.target.value)}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="description" className="text-right pt-2">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={createForm.data.description}
                                    onChange={(e) => createForm.setData('description', e.target.value)}
                                    placeholder="Enter event description..."
                                    className="col-span-3 min-h-[120px]"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="location" className="text-right">
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    name="location"
                                    value={createForm.data.location}
                                    onChange={(e) => createForm.setData('location', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="start_time" className="text-right">
                                    Start Time
                                </Label>
                                <Input
                                    id="start_time"
                                    name="start_time"
                                    type="datetime-local"
                                    value={createForm.data.start_time}
                                    onChange={(e) => createForm.setData('start_time', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="end_time" className="text-right">
                                    End Time
                                </Label>
                                <Input
                                    id="end_time"
                                    name="end_time"
                                    type="datetime-local"
                                    value={createForm.data.end_time}
                                    onChange={(e) => createForm.setData('end_time', e.target.value)}
                                    className="col-span-3"
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
                                onClick={handleCreateEvent}
                                disabled={isSubmitting || !createForm.data.title}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Event
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Edit Event</DialogTitle>
                            <DialogDescription>
                                Make changes to "{selectedEvent?.title}".
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="edit-title"
                                    name="title"
                                    value={editForm.data.title}
                                    onChange={(e) => editForm.setData('title', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="edit-description" className="text-right pt-2">
                                    Description
                                </Label>
                                <Textarea
                                    id="edit-description"
                                    name="description"
                                    value={editForm.data.description}
                                    onChange={(e) => editForm.setData('description', e.target.value)}
                                    placeholder="Enter event description..."
                                    className="col-span-3 min-h-[120px]"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-location" className="text-right">
                                    Location
                                </Label>
                                <Input
                                    id="edit-location"
                                    name="location"
                                    value={editForm.data.location}
                                    onChange={(e) => editForm.setData('location', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-start_time" className="text-right">
                                    Start Time
                                </Label>
                                <Input
                                    id="edit-start_time"
                                    name="start_time"
                                    type="datetime-local"
                                    value={editForm.data.start_time}
                                    onChange={(e) => editForm.setData('start_time', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-end_time" className="text-right">
                                    End Time
                                </Label>
                                <Input
                                    id="edit-end_time"
                                    name="end_time"
                                    type="datetime-local"
                                    value={editForm.data.end_time}
                                    onChange={(e) => editForm.setData('end_time', e.target.value)}
                                    className="col-span-3"
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
                                onClick={handleEditEvent}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete the event <strong>"{selectedEvent?.title}"</strong>?
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
                                onClick={handleDeleteEvent}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Delete Event
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </PrimaryLayout>
    );
};

export default Events;
