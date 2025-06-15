import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import InputError from '@/Components/InputError';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';

interface ResetPasswordProps {
    token: string;
    email: string;
    status?: string;
}

export default function ResetPassword({ token, email, status }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <PrimaryLayout>
            <Head title="Reset Password" />

            <div className="max-w-md mx-auto mt-16">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <KeyRound className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Reset Password
                    </h1>
                    <p className="text-gray-600">
                        Create a new password for your account
                    </p>
                </div>

                {/* Status Message */}
                <AnimatePresence>
                    {status && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <Alert className="mb-6 bg-green-50 border-green-200">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-700">
                                    {status}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form Card */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">Create New Password</CardTitle>
                        <CardDescription>
                            Enter your email and choose a new secure password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-base font-medium">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email address"
                                    className="text-base"
                                    disabled={processing}
                                    autoComplete="username"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-base font-medium">
                                    New Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your new password"
                                    className="text-base"
                                    disabled={processing}
                                    autoComplete="new-password"
                                    autoFocus
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-base font-medium">
                                    Confirm New Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Confirm your new password"
                                    className="text-base"
                                    disabled={processing}
                                    autoComplete="new-password"
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full text-base"
                                >
                                    {processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Resetting Password...
                                        </>
                                    ) : (
                                        <>
                                            <KeyRound className="mr-2 h-4 w-4" />
                                            Reset Password
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Password Requirements */}
                <Card className="mt-6 bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                        <h3 className="font-medium text-blue-900 mb-2">Password Requirements:</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• At least 8 characters long</li>
                            <li>• Include both uppercase and lowercase letters</li>
                            <li>• Include at least one number</li>
                            <li>• Include at least one special character</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Back to Login Link */}
                <div className="mt-6 text-center">
                    <Link
                        href={route('login')}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </PrimaryLayout>
    );
}
