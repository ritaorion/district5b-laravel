import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Separator } from '@/Components/ui/separator';
import { Badge } from '@/Components/ui/badge';
import { User, Shield, Key, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { PageProps } from '@/types';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';

interface ProfilePageProps extends PageProps {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({ mustVerifyEmail, status }: ProfilePageProps) {
    const { auth } = usePage<PageProps>().props;

    return (
        <PrimaryLayout>
            <Head title="Profile Settings" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                            <p className="text-gray-600">Manage your account information and security settings</p>
                        </div>
                    </div>

                    {/* User Info Card */}
                    <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold text-lg">
                                        {auth?.user?.first_name?.charAt(0)}{auth?.user?.last_name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-blue-900">
                                            {auth?.user?.first_name} {auth?.user?.last_name}
                                        </h3>
                                        <p className="text-blue-700">{auth?.user?.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="default" className="mb-2">
                                        Active Account
                                    </Badge>
                                    <p className="text-sm text-blue-700">
                                        Member since {new Date().getFullYear()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Status Messages */}
                {status === 'profile-updated' && (
                    <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700">
                            Your profile information has been updated successfully.
                        </AlertDescription>
                    </Alert>
                )}

                {status === 'password-updated' && (
                    <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700">
                            Your password has been updated successfully.
                        </AlertDescription>
                    </Alert>
                )}

                {mustVerifyEmail && (
                    <Alert className="bg-yellow-50 border-yellow-200">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">
                            Your email address is unverified. Please check your email for a verification link.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Profile Information Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            <CardTitle>Profile Information</CardTitle>
                        </div>
                        <CardDescription>
                            Update your account's profile information and email address
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="w-full"
                        />
                    </CardContent>
                </Card>

                {/* Security Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-green-600" />
                            <CardTitle>Security Settings</CardTitle>
                        </div>
                        <CardDescription>
                            Manage your account security and password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* Password Strength Indicator */}
                            <div className="bg-gray-50 border rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Key className="h-4 w-4 text-gray-600" />
                                    <span className="font-medium text-gray-900">Password Security</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        Strong
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    Last changed: 30 days ago
                                </p>
                            </div>

                            <Separator />

                            <UpdatePasswordForm className="w-full" />
                        </div>
                    </CardContent>
                </Card>

                {/* Account Management Section */}
                <Card className="border-red-200">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-red-600" />
                            <CardTitle className="text-red-900">Danger Zone</CardTitle>
                        </div>
                        <CardDescription>
                            Permanently delete your account and all associated data
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-red-900 mb-1">
                                        Account Deletion Warning
                                    </h4>
                                    <p className="text-sm text-red-800">
                                        Once your account is deleted, all of its resources and data will be permanently deleted.
                                        Before deleting your account, please download any data or information that you wish to retain.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DeleteUserForm className="w-full" />
                    </CardContent>
                </Card>
            </div>
        </PrimaryLayout>
    );
}
