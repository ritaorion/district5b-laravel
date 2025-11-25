import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: string) {
    const size = parseInt(bytes, 10);
    if (size < 1024) {
        return `${size} B`;
    } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    } else {
        return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function isMobile(): boolean {
    if (typeof window !== 'undefined') {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const isMobileScreenSize = screenWidth < 768;
        const isMobileUserAgent = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
        return isMobileScreenSize || isMobileUserAgent;
    }
    return false;
}

export function enablePointerEvents() {
    if (typeof document !== 'undefined') {
        document.body.style.pointerEvents = '';
        document.body.style.removeProperty('pointer-events');
        document.body.style.removeProperty('overflow');
    }
}
