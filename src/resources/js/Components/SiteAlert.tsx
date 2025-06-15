import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SiteAlertProps {
    enabled: boolean;
    content: string;
    className?: string;
}

export const SiteAlert: React.FC<SiteAlertProps> = ({ enabled, content, className }) => {
    const [isDismissed, setIsDismissed] = useState(false);

    if (!enabled || !content || isDismissed) {
        return null;
    }

    const handleDismiss = () => {
        setIsDismissed(true);
    };

    return (
        <div className={cn("w-full bg-amber-50 border-b border-amber-200", className)}>
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />

                    <div
                        className="flex-1 text-amber-800 text-sm md:text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDismiss}
                        className="h-8 w-8 p-0 text-amber-700 hover:text-amber-900 hover:bg-amber-100 flex-shrink-0"
                        aria-label="Dismiss alert"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
