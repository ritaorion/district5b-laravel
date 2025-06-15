import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { AlertTriangle, Home, ArrowLeft, RefreshCw } from 'lucide-react';

interface ErrorProps {
    status: number;
}

const Error = ({ status }: ErrorProps) => {
    const { url } = usePage();
    const title = getTitle(status);
    const description = getDescription(status);

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };

    return (
        <PrimaryLayout>
            <Head title={`${status} - ${title}`} />
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-lg border-0 shadow-none">
                    <CardContent className="pt-12 pb-8 px-8 text-center">
                        <div className="mb-6">
                            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2">
                                {status}
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                                {title}
                            </h2>
                        </div>
                        <div className="mb-8">
                            <p className="text-gray-600 text-base leading-relaxed">
                                {description}
                            </p>
                            {process.env.NODE_ENV === 'development' && (
                                <p className="text-sm text-gray-500 mt-3 font-mono bg-gray-50 p-2 rounded">
                                    URL: {url}
                                </p>
                            )}
                        </div>
                        <div className="space-y-3">
                            <Button asChild className="w-full">
                                <Link href="/">
                                    <Home className="w-4 h-4 mr-2" />
                                    Return to Home Page
                                </Link>
                            </Button>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={handleGoBack}
                                    className="flex-1"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Go Back
                                </Button>

                                {[419, 500, 503].includes(status) && (
                                    <Button
                                        variant="outline"
                                        onClick={handleRefresh}
                                        className="flex-1"
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Retry
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PrimaryLayout>
    );
};

function getTitle(status: number): string {
    switch (status) {
        case 401:
            return 'Unauthorized';
        case 402:
            return 'Payment Required';
        case 403:
            return 'Forbidden';
        case 404:
            return 'Page Not Found';
        case 419:
            return 'Page Expired';
        case 429:
            return 'Too Many Requests';
        case 500:
            return 'Server Error';
        case 503:
            return 'Service Unavailable';
        default:
            return 'An Error Occurred';
    }
}

function getDescription(status: number): string {
    switch (status) {
        case 401:
            return 'You need to be authenticated to access this page. Please log in and try again.';
        case 402:
            return 'Payment is required to access this resource. Please check your account status.';
        case 403:
            return 'You don\'t have permission to access this page. Contact an administrator if you believe this is an error.';
        case 404:
            return 'The page you\'re looking for doesn\'t exist or has been moved. Please check the URL or navigate back to safety.';
        case 419:
            return 'Your session has expired for security reasons. Please refresh the page and try again.';
        case 429:
            return 'You\'re making too many requests. Please wait a moment and try again.';
        case 500:
            return 'Something went wrong on our end. Our team has been notified and is working to fix the issue.';
        case 503:
            return 'The service is temporarily unavailable for maintenance. Please try again in a few minutes.';
        default:
            return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
    }
}

export default Error;
