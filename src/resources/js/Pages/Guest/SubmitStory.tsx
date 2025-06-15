import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import InputError from '@/Components/InputError';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { PenTool, Send } from 'lucide-react';

interface SubmitStoryPageProps {
    flash?: {
        success?: string;
        error?: string;
    };
}

const SubmitStoryPage = ({ flash }: SubmitStoryPageProps) => {
    const [wasSuccessful, setWasSuccessful] = useState(false);
    const [showError, setShowError] = useState(false);

    const { data, setData, post, processing, errors, reset, wasSuccessful: formWasSuccessful } = useForm({
        title: '',
        content: '',
        author: '',
        anonymous: false as boolean,
    });

    useEffect(() => {
        if (formWasSuccessful) {
            setWasSuccessful(true);
            setData({
                title: '',
                content: '',
                author: '',
                anonymous: false,
            })
        }
    }, [formWasSuccessful, reset]);

    useEffect(() => {
        if (flash?.error) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.error]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('guest.story.store'), {
            preserveScroll: false,
            onBefore: () => {
                if (data.anonymous) {
                    setData('author', '');
                }
            },
        });
    };

    const handleAnonymousChange = (checked: boolean) => {
        setData('anonymous', checked);
        if (checked) {
            setData('author', ''); // Clear author when anonymous is checked
        }
    };

    return (
        <PrimaryLayout>
            <Head title="Submit Your Story" />

            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <PenTool className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Submit Your Story
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Share your experience, strength, and hope with the District 5B community.
                        Your story could inspire and help others on their journey.
                    </p>
                </div>

                {/* Success Message */}
                <AnimatePresence>
                    {wasSuccessful && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <Alert className="mb-6 bg-green-50 border-green-200">
                                <AlertDescription className="text-green-700">
                                    Thank you for sharing your story! Your submission has been received and will be reviewed before publication.
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                    {showError && flash?.error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <Alert className="mb-6 bg-red-50 border-red-200">
                                <AlertDescription className="text-red-700">
                                    {flash.error}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form Card */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Your Story Details</CardTitle>
                        <CardDescription>
                            Please fill out the form below to submit your story. All submissions are reviewed before publication.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Field */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-base font-medium">
                                    Story Title *
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Enter a title for your story"
                                    className="text-base"
                                    disabled={processing}
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            {/* Content Field */}
                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-base font-medium">
                                    Your Story *
                                </Label>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Share your experience, strength, and hope..."
                                    className="min-h-[200px] text-base resize-y"
                                    disabled={processing}
                                />
                                <InputError message={errors.content} className="mt-2" />
                            </div>

                            {/* Author Field */}
                            <div className="space-y-2">
                                <Label htmlFor="author" className="text-base font-medium">
                                    Author Name {!data.anonymous && '*'}
                                </Label>
                                <p className="text-sm text-gray-600 mb-2">
                                    If you wish to go by your first name, or last initial, etc. you may do so by filling out this field.
                                    Otherwise, check the box below to remain anonymous.
                                </p>
                                <Input
                                    id="author"
                                    type="text"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                    placeholder="Enter how you'd like to be credited"
                                    className="text-base"
                                    disabled={processing || data.anonymous}
                                />
                                <InputError message={errors.author} className="mt-2" />
                            </div>

                            {/* Anonymous Checkbox */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="anonymous"
                                    checked={data.anonymous}
                                    onCheckedChange={handleAnonymousChange}
                                    disabled={processing}
                                />
                                <Label htmlFor="anonymous" className="text-base font-medium cursor-pointer">
                                    I wish to remain anonymous
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full md:w-auto px-8 py-3 text-base"
                                >
                                    {processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Submit Story
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Guidelines Section */}
                <Card className="mt-8 bg-blue-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-xl text-blue-900">Submission Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-blue-800 space-y-2">
                            <li>• Stories should focus on experience, strength, and hope</li>
                            <li>• All submissions are reviewed before publication</li>
                            <li>• Please keep content appropriate and respectful</li>
                            <li>• Stories may be edited for length and clarity</li>
                            <li>• Anonymous submissions are welcome and encouraged</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </PrimaryLayout>
    );
};

export default SubmitStoryPage;
