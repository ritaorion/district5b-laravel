import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Shield, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

interface PasswordSetupProps {
    user: User;
}

const PasswordSetup = ({ user }: PasswordSetupProps) => {
    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: '',
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validatePasswords = () => {
        const newErrors: {[key: string]: string} = {};

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Password confirmation is required';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validatePasswords();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setProcessing(true);
        setErrors({});

        try {
            const response = await axios.post(window.location.href, formData);

            toast.success(response.data.message);

            if (response.data.redirect_url) {
                window.location.href = response.data.redirect_url;
            } else {
                router.visit('/auth/dashboard');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to set up password';
            toast.error(errorMessage);

            if (error.response?.status === 422 && error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setProcessing(false);
        }
    };

    const getPasswordStrength = () => {
        const password = formData.password;
        if (!password) return { strength: 0, text: '' };

        let score = 0;
        const checks = [
            password.length >= 8,
            /[a-z]/.test(password),
            /[A-Z]/.test(password),
            /[0-9]/.test(password),
            /[^A-Za-z0-9]/.test(password),
        ];

        score = checks.filter(Boolean).length;

        if (score < 3) return { strength: 1, text: 'Weak', color: 'bg-red-500' };
        if (score < 4) return { strength: 2, text: 'Fair', color: 'bg-yellow-500' };
        if (score < 5) return { strength: 3, text: 'Good', color: 'bg-blue-500' };
        return { strength: 4, text: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength();

    return (
        <PrimaryLayout>
            <Head title="Set Up Your Password" />

            <div className="max-w-md mx-auto mt-16">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <Shield className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome, {user.first_name}!
                    </h1>
                    <p className="text-gray-600">
                        Please set up a secure password for your account
                    </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Account Details</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Name:</span> {user.first_name} {user.last_name}</p>
                        <p><span className="font-medium">Username:</span> {user.username}</p>
                        <p><span className="font-medium">Email:</span> {user.email}</p>
                    </div>
                </div>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">Set Up Your Password</CardTitle>
                        <CardDescription>
                            Create a secure password to complete your account setup
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-base font-medium">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter a secure password"
                                    className="text-base"
                                    disabled={processing}
                                    autoFocus
                                    required
                                />

                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-gray-600">Password strength:</span>
                                            <span className={`font-medium ${
                                                passwordStrength.strength <= 2 ? 'text-red-600' :
                                                passwordStrength.strength === 3 ? 'text-blue-600' : 'text-green-600'
                                            }`}>
                                                {passwordStrength.text}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                                style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {errors.password && (
                                    <div className="text-red-600 text-sm mt-1">{errors.password}</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-base font-medium">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
                                    className="text-base"
                                    disabled={processing}
                                    required
                                />
                                {errors.password_confirmation && (
                                    <div className="text-red-600 text-sm mt-1">{errors.password_confirmation}</div>
                                )}

                                {formData.password_confirmation && formData.password === formData.password_confirmation && (
                                    <div className="flex items-center text-green-600 text-sm mt-1">
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Passwords match
                                    </div>
                                )}
                            </div>

                            <div className="bg-blue-50 rounded-lg p-3">
                                <h4 className="text-sm font-medium text-blue-900 mb-2">Password Requirements:</h4>
                                <ul className="text-xs text-blue-800 space-y-1">
                                    <li>• At least 8 characters long</li>
                                    <li>• Include uppercase and lowercase letters</li>
                                    <li>• Include at least one number</li>
                                    <li>• Include at least one special character</li>
                                </ul>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full text-base"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Setting up password...
                                        </>
                                    ) : (
                                        <>
                                            <Shield className="mr-2 h-4 w-4" />
                                            Set Up Password
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Security Notice */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    <Alert className="bg-yellow-50 border-yellow-200">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-700">
                            This link will expire in 24 hours for your security
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </PrimaryLayout>
    );
};

export default PasswordSetup;
