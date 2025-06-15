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
import { Checkbox } from '@/Components/ui/checkbox';
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
    Upload,
    File,
} from 'lucide-react';
import { Progress } from '@/Components/ui/progress';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface Document {
    id: number;
    file_name: string;
    original_file_name: string;
    file_size: number;
    mime_type: string;
    app_type: string;
    uploaded_by: number;
    storage_path: string;
    is_public: boolean;
    created_at: string;
    updated_at: string;
}

interface ResourcesProps {
    resources: Document[];
}

const Resources = ({ resources: initialResources }: ResourcesProps) => {
    const [resources, setResources] = useState<Document[]>(initialResources || []);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedResource, setSelectedResource] = useState<Document | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const editForm = useForm({
        file_name: '',
        original_file_name: '',
        is_public: false as boolean,
    });

    const resetEditForm = () => {
        editForm.reset();
        editForm.clearErrors();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUploadResource = async () => {
        if (!selectedFile) return;

        setIsSubmitting(true);
        setError(null);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('app_type', 'file');

            const response = await axios.post(route('auth.resource.store'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadProgress(progress);
                    }
                },
            });

            setResources(prevResources => [response.data.resource, ...prevResources]);

            toast.success('Resource uploaded successfully');
            setIsUploadDialogOpen(false);
            setSelectedFile(null);
            setUploadProgress(0);
        } catch (error: any) {
            console.error('Upload error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to upload resource';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditResource = async () => {
        if (!selectedResource) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await axios.patch(route('auth.resource.update', selectedResource.id), editForm.data);

            // Update resource in local state
            setResources(prevResources =>
                prevResources.map(resource =>
                    resource.id === selectedResource.id
                        ? { ...resource, ...editForm.data }
                        : resource
                )
            );

            toast.success('Resource updated successfully');
            setIsEditDialogOpen(false);
            setSelectedResource(null);
            resetEditForm();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to update resource';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteResource = async () => {
        if (!selectedResource) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await axios.delete(route('auth.resource.destroy', selectedResource.id));

            setResources(prevResources => prevResources.filter(resource => resource.id !== selectedResource.id));

            toast.success('Resource deleted successfully');
            setIsDeleteDialogOpen(false);
            setSelectedResource(null);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to delete resource';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openEditDialog = (resource: Document) => {
        setSelectedResource(resource);
        editForm.setData({
            file_name: resource.file_name,
            original_file_name: resource.original_file_name,
            is_public: resource.is_public,
        });
        setIsEditDialogOpen(true);
    };

    const viewDocument = (resource: Document) => {
        const viewUrl = route('auth.resource.show', resource.id);
        window.open(viewUrl, '_blank');
    };

    const openDeleteDialog = (resource: Document) => {
        setSelectedResource(resource);
        setIsDeleteDialogOpen(true);
    };

    const openUploadDialog = () => {
        setSelectedFile(null);
        setUploadProgress(0);
        setIsUploadDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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
            <Head title="Resources" />
            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Resources</CardTitle>
                            <CardDescription>
                                Manage document resources and files.
                                {resources.length > 0 && ` (${resources.length} total resources)`}
                            </CardDescription>
                        </div>
                        <Button onClick={openUploadDialog}>
                            <Plus className="mr-2 h-4 w-4" />
                            Upload Document
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
                                        <TableHead>Filename</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Public</TableHead>
                                        <TableHead>Uploaded</TableHead>
                                        <TableHead className="w-[80px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {resources.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-10">
                                                <div className="text-muted-foreground">
                                                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                                                    <p>No resources found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        resources.map((resource) => (
                                            <TableRow key={resource.id}>
                                                <TableCell className="font-medium">
                                                    {resource.original_file_name}
                                                </TableCell>
                                                <TableCell>{formatFileSize(resource.file_size)}</TableCell>
                                                <TableCell>{resource.mime_type}</TableCell>
                                                <TableCell>
                                                    <span className={cn(
                                                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                                        resource.is_public
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    )}>
                                                        {resource.is_public ? 'Public' : 'Private'}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{formatDate(resource.created_at)}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Open menu</span>
                                                            </div>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => viewDocument(resource)}>
                                                                View
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => openEditDialog(resource)}>
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => openDeleteDialog(resource)}
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

                {/* Upload Document Dialog */}
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Upload Document</DialogTitle>
                            <DialogDescription>
                                Select a file to upload as a resource.
                            </DialogDescription>
                        </DialogHeader>
                        <div
                            className={cn(
                                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
                                "flex flex-col items-center justify-center gap-4"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <input
                                type="file"
                                id="file-upload"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <div className="text-sm text-muted-foreground">
                                <p>Drag and drop your file here, or click to select</p>
                                <p className="text-xs mt-1">All file types are supported</p>
                            </div>
                            {selectedFile && (
                                <div className="flex items-center gap-2 mt-2">
                                    <File className="h-4 w-4" />
                                    <span className="text-sm">{selectedFile.name}</span>
                                </div>
                            )}
                        </div>
                        {selectedFile && uploadProgress > 0 && (
                            <div className="space-y-2 mt-4">
                                <Progress value={uploadProgress} className="w-full" />
                                <p className="text-sm text-muted-foreground text-center">
                                    Uploading... {Math.round(uploadProgress)}%
                                </p>
                            </div>
                        )}
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsUploadDialogOpen(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUploadResource}
                                disabled={!selectedFile || isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Upload
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Resource Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Edit Resource</DialogTitle>
                            <DialogDescription>
                                Update the resource metadata.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-file_name" className="text-right">
                                    File Name
                                </Label>
                                <Input
                                    id="edit-file_name"
                                    name="file_name"
                                    value={editForm.data.file_name}
                                    onChange={(e) => editForm.setData('file_name', e.target.value)}
                                    className="col-span-3"
                                    placeholder="Enter file name..."
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-original_file_name" className="text-right">
                                    Original Name
                                </Label>
                                <Input
                                    id="edit-original_file_name"
                                    name="original_file_name"
                                    value={editForm.data.original_file_name}
                                    onChange={(e) => editForm.setData('original_file_name', e.target.value)}
                                    className="col-span-3"
                                    placeholder="Enter original file name..."
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-is_public" className="text-right">
                                    Public Access
                                </Label>
                                <div className="col-span-3 flex items-center space-x-2">
                                    <Checkbox
                                        id="edit-is_public"
                                        checked={editForm.data.is_public}
                                        onCheckedChange={(checked) => editForm.setData('is_public', checked as boolean)}
                                    />
                                    <Label htmlFor="edit-is_public" className="text-sm">
                                        Make this resource publicly accessible
                                    </Label>
                                </div>
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
                                onClick={handleEditResource}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Resource Dialog */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete <strong>"{selectedResource?.original_file_name}"</strong>?
                                This action cannot be undone and will remove the file from storage.
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
                                onClick={handleDeleteResource}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Delete Resource
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </PrimaryLayout>
    );
};

export default Resources;
