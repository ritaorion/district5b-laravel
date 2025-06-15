import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
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
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import InputError from '@/Components/InputError';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteUserFormProps {
    className?: string;
}

export default function DeleteUserForm({ className = '' }: DeleteUserFormProps) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e: React.FormEvent) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Delete Account
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                    Before deleting your account, please download any data or information that you wish to retain.
                </p>
            </div>

            <Dialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
                <DialogTrigger asChild>
                    <Button
                        variant="destructive"
                        onClick={confirmUserDeletion}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-900">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            Delete Account Confirmation
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            This action cannot be undone. This will permanently delete your account and remove all data.
                        </DialogDescription>
                    </DialogHeader>

                    <Alert className="bg-red-50 border-red-200">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                            <strong>Warning:</strong> Once your account is deleted, all of its resources and data will be permanently deleted.
                            Please enter your password to confirm you would like to permanently delete your account.
                        </AlertDescription>
                    </Alert>

                    <form onSubmit={deleteUser} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password to confirm"
                                className="w-full"
                                autoFocus
                                disabled={processing}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <DialogFooter className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeModal}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={processing || !data.password}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Deleting Account...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Account
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
