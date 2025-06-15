import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Badge } from '@/Components/ui/badge';
import InputError from '@/Components/InputError';
import { User, Mail, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageProps } from '@/types';

interface UpdateProfileInformationProps {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}

export default function UpdateProfileInformation({mustVerifyEmail, status, className = ''}: UpdateProfileInformationProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Profile Information
                </h3>
                <p className="text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </div>

            {/* Success Message */}
            <AnimatePresence>
                {recentlySuccessful && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6"
                    >
                        <Alert className="bg-green-50 border-green-200">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-700">
                                Your profile information has been updated successfully.
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Email Verification Warning */}
            {mustVerifyEmail && user?.email_verified_at === null && (
                <div className="mb-6">
                    <Alert className="bg-yellow-50 border-yellow-200">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">
                            <div className="space-y-2">
                                <p className="font-medium">Email Verification Required</p>
                                <p>
                                    Your email address is unverified. Please verify your email to ensure account security.
                                </p>
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center gap-1 text-sm text-yellow-700 underline hover:text-yellow-900 font-medium"
                                >
                                    <RefreshCw className="h-3 w-3" />
                                    Resend verification email
                                </Link>
                            </div>
                        </AlertDescription>
                    </Alert>

                    {status === 'verification-link-sent' && (
                        <Alert className="mt-4 bg-blue-50 border-blue-200">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <AlertDescription className="text-blue-700">
                                A new verification link has been sent to your email address.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first_name" className="text-base font-medium">
                            First Name
                        </Label>
                        <div className="relative">
                            <Input
                                id="first_name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="pl-10"
                                required
                                autoFocus
                                autoComplete="given-name"
                                disabled={processing}
                                placeholder="Enter your first name"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <InputError message={errors.first_name} className="mt-2" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="last_name" className="text-base font-medium">
                            Last Name
                        </Label>
                        <div className="relative">
                            <Input
                                id="last_name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="pl-10"
                                required
                                autoComplete="family-name"
                                disabled={processing}
                                placeholder="Enter your last name"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <InputError message={errors.last_name} className="mt-2" />
                    </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="email" className="text-base font-medium">
                            Email Address
                        </Label>
                        {user?.email_verified_at ? (
                            <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Unverified
                            </Badge>
                        )}
                    </div>
                    <div className="relative">
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="pl-10"
                            required
                            autoComplete="username"
                            disabled={processing}
                            placeholder="Enter your email address"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                    <p className="text-xs text-gray-500">
                        Changing your email will require re-verification.
                    </p>
                </div>

                {/* Account Information */}
                <div className="bg-gray-50 border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Account Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-gray-700">Member Since:</span>
                            <p className="text-gray-600">
                                {user?.created_at
                                    ? new Date(user.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                    : 'N/A'
                                }
                            </p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Last Updated:</span>
                            <p className="text-gray-600">
                                {user?.updated_at
                                    ? new Date(user.updated_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                    : 'N/A'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full md:w-auto px-8"
                    >
                        {processing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <User className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </section>
    );
}
