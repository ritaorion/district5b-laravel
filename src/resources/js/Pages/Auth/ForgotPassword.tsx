import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import InputError from '@/Components/InputError';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface ForgotPasswordProps {
    status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <PrimaryLayout>
            <Head title="Forgot Password" />

            <div className="max-w-md mx-auto mt-16">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Mail className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Forgot Password?
                    </h1>
                    <p className="text-gray-600">
                        No problem. We'll send you a reset link.
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
                        <CardTitle className="text-xl">Reset Your Password</CardTitle>
                        <CardDescription>
                            Enter your email address and we'll send you a password reset link.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
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
                                    autoFocus
                                />
                                <InputError message={errors.email} className="mt-2" />
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
                                            Sending Reset Link...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="mr-2 h-4 w-4" />
                                            Email Password Reset Link
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
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
