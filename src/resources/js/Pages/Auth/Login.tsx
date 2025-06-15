import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import InputError from '@/Components/InputError';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { LogIn, AlertCircle } from 'lucide-react';

interface LoginProps {
    canResetPassword?: boolean;
    status?: string;
}

const Login = ({ canResetPassword, status }: LoginProps) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const getStatusMessage = () => {
        if (status) return status;

        const queryParams = new URLSearchParams(window.location.search);
        const expiredParam = queryParams.get('expired');
        if (expiredParam) return 'Session expired. Please login again.';

        return null;
    };

    const statusMessage = getStatusMessage();

    return (
        <PrimaryLayout>
            <Head title="Login" />

            <div className="max-w-md mx-auto mt-16">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <LogIn className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                    {statusMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <Alert className="mb-6 bg-blue-50 border-blue-200">
                                <AlertCircle className="h-4 w-4 text-blue-600" />
                                <AlertDescription className="text-blue-700">
                                    {statusMessage}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {errors.email && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <Alert className="mb-6 bg-red-50 border-red-200">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <AlertDescription className="text-red-700">
                                    {errors.email || "Please check your credentials and try again."}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form Card */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign In</CardTitle>
                        <CardDescription>
                            Enter your email and password to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                    autoComplete="username"
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-base font-medium">
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                    className="text-base"
                                    disabled={processing}
                                    autoComplete="current-password"
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
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
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="mr-2 h-4 w-4" />
                                            Sign In
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Additional Links */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Need help accessing your account?{' '}
                        <Link
                            href="/contact"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            Contact us
                        </Link>
                    </p>
                </div>
            </div>
        </PrimaryLayout>
    );
};

export default Login;
