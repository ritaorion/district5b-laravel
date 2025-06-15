import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
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
import { Separator } from "@/Components/ui/separator";
import { Menu, LogOut, ChevronDown, SquareUserRound, DatabaseZap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from "@/Components/LanguageSelector";
import { useTranslation } from "react-i18next";
import React from 'react';
import { getApiUrl } from "@/lib/config.ts";
import LoadingSpinner from "@/Components/LoadingSpinner";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner";

interface NavItem {
    name: string;
    path: string;
}

interface ResourceItem {
    name: string;
    path: string;
}

const Layout = () => {
    const { isAuthenticated, user, logout, tokens } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslation();
    const [isClearing, setIsClearing] = useState(false);

    const resourceItems: ResourceItem[] = [
        { name: t('primary_navigation.resources.new_gsr_checklist'), path: '/resources/New-GSR-Checklist.pdf' },
        { name: t('primary_navigation.resources.new_meeting_form'), path: '/resources/New-Meeting-Form.pdf' },
        { name: t('primary_navigation.resources.roberts_rules_overview'), path: '/resources/Roberts-Rules-Overview.pdf' },
        { name: t('primary_navigation.resources.sample_gsr_report'), path: '/resources/Sample-GSR-Report.pdf' },
        { name: t('primary_navigation.resources.aa_service_manual'), path: '/resources/AA-Service-Manual-2024-BM-31.pdf' },
        { name: t('primary_navigation.resources.new_group_listing_guidelines'), path: '/resources/New-Group-Listing-Guidelines-Form.pdf' },
        { name: t('primary_navigation.resources.gsr_orientation_manual'), path: '/resources/GSR-Orientation-Manual.pdf' },
        { name: t('primary_navigation.resources.group_information_change'), path: '/resources/Group-Information-Change-Form.pdf' },
        { name: t('primary_navigation.resources.group_contributions'), path: '/resources/Group-Contributions.pdf' },
        { name: t('primary_navigation.resources.aa_member_resource_flyer'), path: '/resources/AA-Member-Resource-Flyer.pdf' },
    ];
    resourceItems.sort((a, b) => a.name.localeCompare(b.name));

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

    const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const headerStyle = {
        backgroundImage:
            "linear-gradient(to right, rgba(209, 213, 219, 0.15) 1px, transparent 1px), " +
            "linear-gradient(to bottom, rgba(209, 213, 219, 0.1) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        backgroundColor: "white"
    };

    const clearRedisCache = async () => {
        setIsClearing(true);

        if (!tokens) {
            console.error('No tokens found - cannot clear cache');
            toast.error('No tokens found - cannot clear cache');
            setIsClearing(false);
            return false;
        }

        const apiUrl = getApiUrl('/cache/dump');

        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', `Bearer ${tokens.access_token}`);
            if (tokens.refresh_token) {
                headers.append('X-Refresh-Token', tokens.refresh_token);
            }

            const requestOptions: RequestInit = {
                method: 'DELETE',
                headers: headers,
                credentials: 'include' as RequestCredentials
            };

            const response = await fetch(apiUrl, requestOptions);

            if (!response.ok) {
                console.error('Failed to clear cache:', response.statusText);
                toast.error('Failed to clear cache');
                return false;
            }

            await response.json();
            toast.success('Cache cleared successfully');
            return true;
        } catch (error) {
            console.error('Error clearing cache:', error);
            toast.error('Error clearing cache');
            return false;
        } finally {
            setIsClearing(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 bg-white border-b" style={headerStyle}>
                <div className="mx-auto px-4">
                    <div className="flex items-center justify-between h-24">
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center">
                                <img
                                    src={'/logo/v3/logo.png'}
                                    alt="District 5B Logo"
                                    className="h-20 w-auto"
                                />
                                <h1 className="text-xl font-bold sr-only">District 5B</h1>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
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
                                <SheetContent side="right" className={'p-6'}>
                                    <SheetTitle>
                                        Navigation Menu
                                    </SheetTitle>
                                    <SheetDescription>
                                        Links to various pages on the site
                                    </SheetDescription>
                                    <nav className="flex flex-col gap-1 mt-8">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.path}
                                                className="px-3 py-2 text-2xl font-medium rounded-md hover:bg-gray-100"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}

                                        {!isAuthenticated && (
                                            <>
                                                <div className="px-3 py-2 text-2xl font-medium">
                                                    Information
                                                </div>
                                                {informationItems.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.path}
                                                        className="px-6 py-2 text-xl font-medium rounded-md hover:bg-gray-100"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                                <div className="px-3 py-2 text-2xl font-medium">
                                                    {t('primary_navigation.resources_label')}
                                                </div>
                                                <Link
                                                    to="/resources"
                                                    className="px-6 py-2 text-xl font-medium rounded-md hover:bg-gray-100"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    View All Resources
                                                </Link>
                                                {resourceItems.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.path}
                                                        className="px-6 py-2 text-xl font-medium rounded-md hover:bg-gray-100"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                                <div className="px-3 py-2 text-2xl font-medium">
                                                    Privacy
                                                </div>
                                                {privacyItems.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.path}
                                                        className="px-6 py-2 text-xl font-medium rounded-md hover:bg-gray-100"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                                <Link
                                                    to="/contact"
                                                    className="px-3 py-2 text-2xl font-medium rounded-md hover:bg-gray-100"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Contact
                                                </Link>
                                                <Link
                                                    to="/login"
                                                    className="px-3 py-2 text-2xl font-medium rounded-md hover:bg-gray-100"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Login
                                                </Link>
                                            </>
                                        )}

                                        {isAuthenticated && (
                                            <div className="mt-4 border-t pt-4">
                                                <div className="px-3 py-2 text-sm font-medium text-gray-700">
                                                    Logged in as: {user?.first_name} {user?.last_name}
                                                </div>
                                                <Button
                                                    variant="default"
                                                    className="mt-2 w-full"
                                                    onClick={handleLogout}
                                                >
                                                    <LogOut className="mr-2 h-4 w-4"/>
                                                    {t('primary_navigation.logout')}
                                                </Button>
                                            </div>
                                        )}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Navigation links (center aligned) - hidden on mobile */}
                        <nav className="hidden md:flex flex-1 justify-center">
                            <ul className="flex justify-center items-center gap-6">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.path}
                                            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 whitespace-nowrap"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}

                                {/* Web Content dropdown for authenticated users */}
                                {isAuthenticated && (
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
                                                            <Link to={item.path}>
                                                                {item.name}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </li>
                                        <li>
                                            <Link
                                                to="/auth/profile"
                                                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 whitespace-nowrap flex items-center"
                                            >
                                                <SquareUserRound className="mr-2 h-4 w-4" />
                                                {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : 'Profile'}
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {/* Information dropdown in desktop menu */}
                                {!isAuthenticated && (
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
                                                        <Link to={item.path} onClick={() => setIsDropdownOpen(false)}>
                                                            {item.name}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </li>
                                )}

                                {/* Resources dropdown in desktop menu */}
                                {!isAuthenticated && (
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
                                                    <Link to="/resources">
                                                        <strong>View All Resources</strong>
                                                    </Link>
                                                </DropdownMenuItem>
                                                {resourceItems.map((item, index) => (
                                                    <DropdownMenuItem key={index} asChild>
                                                        <Link to={item.path}>
                                                            {item.name}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </li>
                                )}

                                {/* Privacy dropdown in desktop menu */}
                                {!isAuthenticated && (
                                    <li>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 flex items-center whitespace-nowrap"
                                                >
                                                    Privacy
                                                    <ChevronDown className="ml-1 h-4 w-4"/>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="center" className="w-[200px]">
                                                {privacyItems.map((item) => (
                                                    <DropdownMenuItem key={item.name} asChild>
                                                        <Link to={item.path}>
                                                            {item.name}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </li>
                                )}

                                {/* Contact link in desktop menu */}
                                {!isAuthenticated && (
                                    <li>
                                        <Link
                                            to="/contact"
                                            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 whitespace-nowrap"
                                        >
                                            {t('primary_navigation.contact')}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </nav>

                        {/* Right side actions - hidden on mobile */}
                        <div className="hidden md:flex items-center space-x-4">
                            {!isAuthenticated && (
                                <>
                                    <Button
                                        variant={'outline'}
                                        asChild
                                    >
                                        <Link
                                            to={'/login'}
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            {t('primary_navigation.login')}
                                        </Link>
                                    </Button>
                                    <LanguageSelector />
                                </>
                            )}

                            {isAuthenticated && (
                                <div className="flex items-center space-x-3">
                                    <Button
                                        variant={'outline'}
                                        size={'default'}
                                        onClick={clearRedisCache}
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
                    <Outlet/>
                </div>
            </main>

            <footer className="w-full py-4 border-t" style={headerStyle}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-muted-foreground whitespace-nowrap">
                                © {new Date().getFullYear()} District 5B
                            </span>
                            <span className="text-muted-foreground">
                                These pages are neither endorsed nor approved by Alcoholics Anonymous World Services, Inc.
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {privacyItems.map((item, index) => (
                                <React.Fragment key={item.path}>
                                    <Link
                                        to={item.path}
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
            <Toaster />
        </div>
    );
};

export default Layout;