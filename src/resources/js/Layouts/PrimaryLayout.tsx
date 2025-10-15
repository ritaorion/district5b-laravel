import { PropsWithChildren, ReactNode, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription
} from '@/Components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import { Separator } from "@/Components/ui/separator";
import { Menu, LogOut, ChevronDown, ChevronRight, DatabaseZap } from 'lucide-react';
import LanguageSelector from "@/Components/LanguageSelector";
import { useTranslation } from "react-i18next";
import React from 'react';
import LoadingSpinner from "@/Components/LoadingSpinner";
import { Toaster } from "@/Components/ui/sonner";
import { PageProps } from "@/types";
import axios from 'axios';
import { SiteAlert } from "@/Components/SiteAlert";
import { toast } from 'sonner';

interface NavItem {
    name: string;
    path: string;
}

interface ResourceItem {
    name: string;
    path: string;
}

const PrimaryLayout = ({ header, children }: PropsWithChildren<{header?: ReactNode}>) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
    const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
    const [mobilePrivacyOpen, setMobilePrivacyOpen] = useState(false);
    const [mobileWebContentOpen, setMobileWebContentOpen] = useState(false);

    const { navigationResources, siteSettings } = usePage().props;
    const { t } = useTranslation();
    const [isClearing, setIsClearing] = useState(false);
    const pageProps = usePage<PageProps>().props;
    const user = pageProps?.auth?.user || null;

    console.log('Page Props:', pageProps);


    const sortedResources = (!user && navigationResources)
        ? [...navigationResources].sort((a, b) => a.name.localeCompare(b.name))
        : [];

    const handleLogout = () => {
        router.post('/logout')
    }

    const handleClearCache = async () => {
        setIsClearing(true);

        try {
            await axios.post(route('auth.clear-cache'));
            toast.success('Cache cleared successfully');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to clear cache';
            toast.error(errorMessage);
        } finally {
            setIsClearing(false);
        }
    };

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
        setMobileInfoOpen(false);
        setMobileResourcesOpen(false);
        setMobilePrivacyOpen(false);
        setMobileWebContentOpen(false);
    };

    const publicNavItems: NavItem[] = [
        { name: t('primary_navigation.home'), path: '/' },
        { name: t('primary_navigation.map'), path: '/map' },
        { name: t('primary_navigation.blogs'), path: '/stories' },
    ];

    const informationItems: NavItem[] = [
        { name: t('primary_navigation.acronyms'), path: '/acronyms' },
        { name: t('primary_navigation.agsr'), path: '/agsr' },
        { name: t('primary_navigation.gsr'), path: '/gsr' },
        { name: t('primary_navigation.meetings'), path: '/meetings' },
        { name: t('primary_navigation.events'), path: '/events' },
    ];

    const privacyItems: NavItem[] = [
        { name: t('footer.privacy_policy'), path: '/privacy-policy' },
        { name: t('footer.cookie_policy'), path: '/cookie-policy' },
        { name: t('footer.terms_of_use'), path: '/terms-of-use' },
    ];

    const authenticatedNavItems: NavItem[] = [
        { name: t('secondary_navigation.dashboard'), path: '/auth/dashboard' },
        { name: t('secondary_navigation.web_forms'), path: '/auth/contact-forms' },
        { name: t('secondary_navigation.users'), path: '/auth/users' },
        { name: t('secondary_navigation.site_settings'), path: '/auth/site-settings' },
    ];

    const webContentItems: NavItem[] = [
        { name: t('secondary_navigation.events'), path: '/auth/events' },
        { name: t('secondary_navigation.faqs'), path: '/auth/faqs' },
        { name: t('secondary_navigation.resources'), path: '/auth/resources' },
        { name: t('secondary_navigation.meetings'), path: '/auth/meetings' },
        { name: t('secondary_navigation.rosters'), path: '/auth/rosters' },
        { name: t('secondary_navigation.blogs'), path: '/auth/blogs' },
    ];

    const navItems = user ? authenticatedNavItems : publicNavItems;

    const headerStyle = {
        backgroundImage:
            "linear-gradient(to right, rgba(209, 213, 219, 0.15) 1px, transparent 1px), " +
            "linear-gradient(to bottom, rgba(209, 213, 219, 0.1) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        backgroundColor: "white"
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 bg-white border-b" style={headerStyle}>
                <div className="mx-auto px-4">
                    <div className="flex items-center justify-between h-24">
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center">
                                <img
                                    src={'/logo/v3/logo.png'}
                                    alt="District 5B Logo"
                                    className="h-20 w-auto"
                                />
                                <h1 className="text-xl font-bold sr-only">District 5B</h1>
                            </Link>
                        </div>

                        <div className="flex md:hidden">
                            <Sheet
                                open={isMobileMenuOpen}
                                onOpenChange={setIsMobileMenuOpen}
                            >
                                <SheetTrigger>
                                    <span className="flex justify-center items-center w-10 h-10 rounded-md hover:bg-gray-100">
                                        <Menu className="h-5 w-5"/>
                                    </span>
                                </SheetTrigger>
                                <SheetContent side="right" className="p-0 w-full max-w-sm">
                                    <div className="flex flex-col h-full">
                                        <div className="p-6 border-b bg-white">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <img
                                                        src={'/logo/v3/logo.png'}
                                                        alt="District 5B Logo"
                                                        className="h-12 w-auto"
                                                    />
                                                </div>
                                            </div>
                                            <SheetTitle className="text-left mt-2">
                                                Navigation Menu
                                            </SheetTitle>
                                            <SheetDescription className="text-left">
                                                Links to various pages on the site
                                            </SheetDescription>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-6">
                                            <nav className="flex flex-col gap-2">
                                                {navItems.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.path}
                                                        className="px-3 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors"
                                                        onClick={handleMobileMenuClose}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}

                                                {user && (
                                                    <Collapsible
                                                        open={mobileWebContentOpen}
                                                        onOpenChange={setMobileWebContentOpen}
                                                    >
                                                        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors">
                                                            Web Content
                                                            <ChevronRight className={`h-4 w-4 transition-transform ${mobileWebContentOpen ? 'rotate-90' : ''}`} />
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent className="pl-6">
                                                            {webContentItems.map((item) => (
                                                                <Link
                                                                    key={item.name}
                                                                    href={item.path}
                                                                    className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 transition-colors"
                                                                    onClick={handleMobileMenuClose}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            ))}
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                )}

                                                {user && (
                                                    <Link
                                                        href="/auth/profile"
                                                        className="px-3 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors"
                                                        onClick={handleMobileMenuClose}
                                                    >
                                                        {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : 'Profile'}
                                                    </Link>
                                                )}

                                                {!user && (
                                                    <>
                                                        <Collapsible
                                                            open={mobileInfoOpen}
                                                            onOpenChange={setMobileInfoOpen}
                                                        >
                                                            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors">
                                                                Information
                                                                <ChevronRight className={`h-4 w-4 transition-transform ${mobileInfoOpen ? 'rotate-90' : ''}`} />
                                                            </CollapsibleTrigger>
                                                            <CollapsibleContent className="pl-6">
                                                                {informationItems.map((item) => (
                                                                    <Link
                                                                        key={item.name}
                                                                        href={item.path}
                                                                        className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 transition-colors"
                                                                        onClick={handleMobileMenuClose}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                ))}
                                                            </CollapsibleContent>
                                                        </Collapsible>

                                                        <Collapsible
                                                            open={mobileResourcesOpen}
                                                            onOpenChange={setMobileResourcesOpen}
                                                        >
                                                            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors">
                                                                {t('primary_navigation.resources_label')}
                                                                <ChevronRight className={`h-4 w-4 transition-transform ${mobileResourcesOpen ? 'rotate-90' : ''}`} />
                                                            </CollapsibleTrigger>
                                                            <CollapsibleContent className="pl-6">
                                                                <Link
                                                                    href="/resources"
                                                                    className="block px-3 py-2 text-base font-semibold rounded-md hover:bg-gray-100 transition-colors"
                                                                    onClick={handleMobileMenuClose}
                                                                >
                                                                    View All Resources
                                                                </Link>
                                                                {sortedResources.map((item) => (
                                                                    <a
                                                                        key={item.name}
                                                                        href={`/resources/${encodeURIComponent(item.name)}?action=view`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 transition-colors"
                                                                        onClick={handleMobileMenuClose}
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                ))}
                                                            </CollapsibleContent>
                                                        </Collapsible>

                                                        <Collapsible
                                                            open={mobilePrivacyOpen}
                                                            onOpenChange={setMobilePrivacyOpen}
                                                        >
                                                            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors">
                                                                Privacy
                                                                <ChevronRight className={`h-4 w-4 transition-transform ${mobilePrivacyOpen ? 'rotate-90' : ''}`} />
                                                            </CollapsibleTrigger>
                                                            <CollapsibleContent className="pl-6">
                                                                {privacyItems.map((item) => (
                                                                    <Link
                                                                        key={item.name}
                                                                        href={item.path}
                                                                        className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 transition-colors"
                                                                        onClick={handleMobileMenuClose}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                ))}
                                                            </CollapsibleContent>
                                                        </Collapsible>

                                                        <Link
                                                            href="/contact"
                                                            className="px-3 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors"
                                                            onClick={handleMobileMenuClose}
                                                        >
                                                            Contact
                                                        </Link>

                                                        <Link
                                                            href="/login"
                                                            className="px-3 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors"
                                                            onClick={handleMobileMenuClose}
                                                        >
                                                            Login
                                                        </Link>
                                                    </>
                                                )}
                                            </nav>
                                        </div>

                                        {user && (
                                            <div className="p-6 border-t bg-gray-50">
                                                <div className="space-y-3">
                                                    <div className="text-sm font-medium text-gray-700">
                                                        Logged in as: {user?.first_name}
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Button
                                                            variant={'outline'}
                                                            size={'default'}
                                                            onClick={handleClearCache}
                                                            disabled={isClearing}
                                                            className="w-full justify-center"
                                                        >
                                                            {isClearing ? (
                                                                <LoadingSpinner />
                                                            ) : (
                                                                <>
                                                                    <DatabaseZap className="mr-2 h-4 w-4" />
                                                                    Clear Cache
                                                                </>
                                                            )}
                                                        </Button>
                                                        <Button
                                                            variant="default"
                                                            size="default"
                                                            onClick={handleLogout}
                                                            className="w-full"
                                                        >
                                                            <LogOut className="mr-2 h-4 w-4"/>
                                                            {t('primary_navigation.logout')}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {!user && (
                                            <div className="p-6 border-t bg-gray-50">
                                                <LanguageSelector />
                                            </div>
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        <nav className="hidden md:flex flex-1 justify-center">
                            <ul className="flex justify-center items-center gap-6">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.path}
                                            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 whitespace-nowrap"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}

                                {user && (
                                    <>
                                        <li>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 flex items-center whitespace-nowrap"
                                                    >
                                                        Web Content
                                                        <ChevronDown className="ml-1 h-4 w-4"/>
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="center" className="w-[200px]">
                                                    {webContentItems.map((item) => (
                                                        <DropdownMenuItem key={item.name} asChild>
                                                            <Link href={item.path}>
                                                                {item.name}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </li>
                                        <li>
                                            <Link
                                                href="/auth/profile"
                                                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 whitespace-nowrap flex items-center"
                                            >
                                                {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : 'Profile'}
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {!user && (
                                    <li>
                                        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 flex items-center whitespace-nowrap"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                >
                                                    {t('primary_navigation.information')}
                                                    <ChevronDown className="ml-1 h-4 w-4"/>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="center" className="w-[200px]">
                                                {informationItems.map((item) => (
                                                    <DropdownMenuItem key={item.name} asChild>
                                                        <Link href={item.path} onClick={() => setIsDropdownOpen(false)}>
                                                            {item.name}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </li>
                                )}

                                {!user && (
                                    <li>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 flex items-center whitespace-nowrap"
                                                >
                                                    {t('primary_navigation.resources_label')}
                                                    <ChevronDown className="ml-1 h-4 w-4"/>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="center" className="w-[300px]">
                                                <DropdownMenuItem asChild>
                                                    <Link href="/resources">
                                                        <strong>View All Resources</strong>
                                                    </Link>
                                                </DropdownMenuItem>
                                                {sortedResources.map((item, index) => (
                                                    <DropdownMenuItem key={index} asChild>
                                                        <a 
                                                            href={`/resources/${encodeURIComponent(item.name)}?action=view`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </li>
                                )}

                                {!user && (
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 whitespace-nowrap"
                                        >
                                            {t('primary_navigation.contact')}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </nav>

                        <div className="hidden md:flex items-center space-x-4">
                            {!user && (
                                <>
                                    <Button
                                        variant={'outline'}
                                        asChild
                                    >
                                        <Link
                                            href={'/login'}
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            {t('primary_navigation.login')}
                                        </Link>
                                    </Button>
                                </>
                            )}

                            {user && (
                                <div className="flex items-center space-x-3">
                                    <Button
                                        variant={'outline'}
                                        size={'default'}
                                        onClick={handleClearCache}
                                        disabled={isClearing}
                                        className="w-32 justify-center"
                                    >
                                        {isClearing ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <>
                                                <DatabaseZap className="mr-2 h-4 w-4" />
                                                Clear Cache
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="default"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="mr-1 h-4 w-4"/>
                                        {t('primary_navigation.logout')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <SiteAlert enabled={siteSettings.site_alert_enabled || false} content={siteSettings.site_alert_content || ''} />
                    {children}
                </div>
            </main>

            <footer className="w-full py-4 border-t" style={headerStyle}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-muted-foreground whitespace-nowrap">
                                © {new Date().getFullYear()} {siteSettings.site_title || ''}
                            </span>
                            {siteSettings.copyright_text_enabled && (
                                <span className="text-muted-foreground">
                                    {siteSettings.copyright_text_content || ''}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            {privacyItems.map((item, index) => (
                                <React.Fragment key={item.path}>
                                    <Link
                                        href={item.path}
                                        className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                                    >
                                        {item.name}
                                    </Link>
                                    {index < privacyItems.length - 1 && (
                                        <Separator orientation="vertical" className="h-3" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
            <Toaster richColors={true} />
        </div>
    );
};

export default PrimaryLayout;
