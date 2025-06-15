import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Progress } from '@/Components/ui/progress';
import InputError from '@/Components/InputError';
import { Key, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UpdatePasswordFormProps {
    className?: string;
}

export default function UpdatePasswordForm({ className = '' }: UpdatePasswordFormProps) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    // Calculate password strength
    const calculatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 12.5;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 12.5;
        return Math.min(strength, 100);
    };

    const passwordStrength = calculatePasswordStrength(data.password);

    const getStrengthLabel = (strength: number) => {
        if (strength === 0) return '';
        if (strength < 40) return 'Weak';
        if (strength < 70) return 'Fair';
        if (strength < 90) return 'Good';
        return 'Strong';
    };

    const getStrengthColor = (strength: number) => {
        if (strength < 40) return 'bg-red-500';
        if (strength < 70) return 'bg-yellow-500';
        if (strength < 90) return 'bg-blue-500';
        return 'bg-green-500';
    };

    return (
        <section className={className}>
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Update Password
                </h3>
                <p className="text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
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
                                Your password has been updated successfully.
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={updatePassword} className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                    <Label htmlFor="current_password" className="text-base font-medium">
                        Current Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type={showCurrentPassword ? 'text' : 'password'}
                            className="pr-10"
                            autoComplete="current-password"
                            disabled={processing}
                            placeholder="Enter your current password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-base font-medium">
                        New Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type={showNewPassword ? 'text' : 'password'}
                            className="pr-10"
                            autoComplete="new-password"
                            disabled={processing}
                            placeholder="Enter your new password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {data.password && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Password strength:</span>
                                <span className={`font-medium ${
                                    passwordStrength < 40 ? 'text-red-600' :
                                        passwordStrength < 70 ? 'text-yellow-600' :
                                            passwordStrength < 90 ? 'text-blue-600' : 'text-green-600'
                                }`}>
                                    {getStrengthLabel(passwordStrength)}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                                    style={{ width: `${passwordStrength}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label htmlFor="password_confirmation" className="text-base font-medium">
                        Confirm New Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="pr-10"
                            autoComplete="new-password"
                            disabled={processing}
                            placeholder="Confirm your new password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className={`flex items-center gap-2 ${data.password.length >= 8 ? 'text-green-600' : ''}`}>
                            <div className={`w-2 h-2 rounded-full ${data.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            At least 8 characters long
                        </li>
                        <li className={`flex items-center gap-2 ${data.password.match(/[a-z]/) ? 'text-green-600' : ''}`}>
                            <div className={`w-2 h-2 rounded-full ${data.password.match(/[a-z]/) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            Include lowercase letters
                        </li>
                        <li className={`flex items-center gap-2 ${data.password.match(/[A-Z]/) ? 'text-green-600' : ''}`}>
                            <div className={`w-2 h-2 rounded-full ${data.password.match(/[A-Z]/) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            Include uppercase letters
                        </li>
                        <li className={`flex items-center gap-2 ${data.password.match(/[0-9]/) ? 'text-green-600' : ''}`}>
                            <div className={`w-2 h-2 rounded-full ${data.password.match(/[0-9]/) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            Include numbers
                        </li>
                        <li className={`flex items-center gap-2 ${data.password.match(/[^a-zA-Z0-9]/) ? 'text-green-600' : ''}`}>
                            <div className={`w-2 h-2 rounded-full ${data.password.match(/[^a-zA-Z0-9]/) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            Include special characters
                        </li>
                    </ul>
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
                                Updating Password...
                            </>
                        ) : (
                            <>
                                <Key className="mr-2 h-4 w-4" />
                                Update Password
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </section>
    );
}
