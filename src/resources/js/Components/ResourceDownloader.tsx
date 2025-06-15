import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import { CloudDownload } from 'lucide-react';
import { getApiUrl } from '@/lib/config';
import LoadingSpinner from '@/Components/LoadingSpinner';

export default function ResourceDownloader() {
    const { resourceName } = useParams<{ resourceName: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!resourceName) {
            console.error("No resource name provided");
            navigate('/404');
            return;
        }

        const downloadResource = async () => {
            try {
                const response = await fetch(getApiUrl(`/pdfs/download?file=${encodeURIComponent(resourceName)}`));
                if (!response.ok) {
                    throw new Error('Failed to download file');
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', resourceName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error(error);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        downloadResource().then(() => console.log('Resource downloaded! 🔥'));
    }, [resourceName, navigate]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <LoadingSpinner />
                <h2 className="text-2xl font-semibold mt-4">Preparing your download...</h2>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <CloudDownload className="h-16 w-16 text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Your download is starting...</h2>
            <p className="text-muted-foreground mb-8">
                If your download doesn't start automatically, please try again or contact support.
            </p>
            <Button onClick={() => navigate('/resources')}>
                Return to Resources
            </Button>
        </div>
    );
}
