import { useEffect } from 'react';
import { useForm as useInertiaForm } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PrimaryLayout from "@/Layouts/PrimaryLayout";
import { Button } from '@/Components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { Switch } from '@/Components/ui/switch';
import { Textarea } from '@/Components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/Components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Badge } from '@/Components/ui/badge';
import {
    AlertCircle,
    Loader2,
    Settings,
    Globe,
    Shield,
    Mail,
    AlertTriangle,
    FileText,
    Calendar,
    Users,
    HelpCircle,
    Database,
    BookOpen,
    Copyright,
    Bell
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import { toast } from 'sonner';

const siteSettingsSchema = z.object({
    blog_mod_enabled: z.boolean(),
    events_mod_enabled: z.boolean(),
    faqs_mod_enabled: z.boolean(),
    resources_mod_enabled: z.boolean(),
    meetings_mod_enabled: z.boolean(),
    roster_mod_enabled: z.boolean(),
    copyright_text_enabled: z.boolean(),
    copyright_text_content: z.string().nullable(),
    notify_contact_form_submission: z.boolean(),
    notify_contact_form_email: z.string().email().nullable().or(z.literal('')),
    site_title: z.string().nullable(),
    site_alert_enabled: z.boolean(),
    site_alert_content: z.string().nullable(),
});

type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;

interface Setting {
    id: number;
    blog_mod_enabled: boolean;
    events_mod_enabled: boolean;
    faqs_mod_enabled: boolean;
    resources_mod_enabled: boolean;
    meetings_mod_enabled: boolean;
    roster_mod_enabled: boolean;
    copyright_text_enabled: boolean;
    copyright_text_content: string | null;
    notify_contact_form_submission: boolean;
    notify_contact_form_email: string | null;
    site_title: string | null;
    site_alert_enabled: boolean;
    site_alert_content: string | null;
    created_at: string;
    updated_at: string;
}

interface SiteSettingsProps {
    settings: Setting;
}

export default function SiteSettings({ settings }: SiteSettingsProps) {
    const { data, setData, patch, processing, errors: inertiaErrors, reset } = useInertiaForm<SiteSettingsFormData>({
        blog_mod_enabled: settings.blog_mod_enabled || false,
        events_mod_enabled: settings.events_mod_enabled || false,
        faqs_mod_enabled: settings.faqs_mod_enabled || false,
        resources_mod_enabled: settings.resources_mod_enabled || false,
        meetings_mod_enabled: settings.meetings_mod_enabled || false,
        roster_mod_enabled: settings.roster_mod_enabled || false,
        copyright_text_enabled: settings.copyright_text_enabled || false,
        copyright_text_content: settings.copyright_text_content || null,
        notify_contact_form_submission: settings.notify_contact_form_submission || false,
        notify_contact_form_email: settings.notify_contact_form_email || null,
        site_title: settings.site_title || null,
        site_alert_enabled: settings.site_alert_enabled || false,
        site_alert_content: settings.site_alert_content || null,
    });

    const form = useForm<SiteSettingsFormData>({
        resolver: zodResolver(siteSettingsSchema),
        defaultValues: data,
    });

    useEffect(() => {
        form.reset(data);
    }, [data, form]);

    const onSubmit = async () => {
        patch(route('auth.site-settings.update'), {
            onSuccess: () => {
                toast.success('Site settings updated successfully');
            },
            onError: (errors) => {
                const errorMessage = Object.values(errors)[0] as string || 'Failed to update site settings';
                toast.error(errorMessage);
            },
        });
    };

    const hasErrors = Object.keys(inertiaErrors).length > 0;

    const moduleItems = [
        { key: 'blog_mod_enabled', label: 'Blog Module', description: 'Manage blog posts and stories', icon: FileText },
        { key: 'events_mod_enabled', label: 'Events Module', description: 'Manage events and activities', icon: Calendar },
        { key: 'faqs_mod_enabled', label: 'FAQs Module', description: 'Manage frequently asked questions', icon: HelpCircle },
        { key: 'resources_mod_enabled', label: 'Resources Module', description: 'Manage downloadable resources', icon: Database },
        { key: 'meetings_mod_enabled', label: 'Meetings Module', description: 'Manage meeting schedules', icon: Users },
        { key: 'roster_mod_enabled', label: 'Roster Module', description: 'Manage member rosters', icon: BookOpen },
    ];

    const getEnabledModulesCount = () => {
        return moduleItems.filter(item => data[item.key as keyof SiteSettingsFormData]).length;
    };

    return (
        <PrimaryLayout>
            <Head title="Site Settings" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Settings className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
                            <p className="text-gray-600">Configure global settings and modules for your website</p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-900">Active Modules</p>
                                        <p className="text-2xl font-bold text-blue-900">{getEnabledModulesCount()}/6</p>
                                    </div>
                                    <Globe className="h-8 w-8 text-blue-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-green-900">Site Status</p>
                                        <p className="text-lg font-semibold text-green-900">Online</p>
                                    </div>
                                    <Shield className="h-8 w-8 text-green-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-purple-900">Notifications</p>
                                        <p className="text-lg font-semibold text-purple-900">
                                            {data.notify_contact_form_submission ? 'Enabled' : 'Disabled'}
                                        </p>
                                    </div>
                                    <Bell className="h-8 w-8 text-purple-600" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Error Alert */}
                {hasErrors && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Validation Error</AlertTitle>
                        <AlertDescription>
                            {Object.values(inertiaErrors)[0]}
                        </AlertDescription>
                    </Alert>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        {/* General Settings */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-blue-600" />
                                    <CardTitle>General Settings</CardTitle>
                                </div>
                                <CardDescription>
                                    Basic website configuration and branding
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="site_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    name={field.name}
                                                    value={field.value ?? ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setData('site_title', e.target.value);
                                                    }}
                                                    onBlur={field.onBlur}
                                                    placeholder="District 5B - Alcoholics Anonymous"
                                                    className="max-w-lg"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                The title displayed in browser tabs and search engine results
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Module Settings */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Database className="h-5 w-5 text-green-600" />
                                    <CardTitle>Module Management</CardTitle>
                                </div>
                                <CardDescription>
                                    Enable or disable specific website features and functionality
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {moduleItems.map((module) => {
                                        const IconComponent = module.icon;
                                        return (
                                            <FormField
                                                key={module.key}
                                                control={form.control}
                                                name={module.key as keyof SiteSettingsFormData}
                                                render={({ field }) => (
                                                    <FormItem className="flex items-center justify-between rounded-lg border p-4 hover:shadow-sm transition-shadow">
                                                        <div className="flex items-center space-x-3 flex-1">
                                                            <div className="bg-gray-100 p-2 rounded-md">
                                                                <IconComponent className="h-4 w-4 text-gray-600" />
                                                            </div>
                                                            <div className="space-y-0.5 flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <FormLabel className="font-medium">{module.label}</FormLabel>
                                                                    <Badge variant={field.value ? "default" : "secondary"} className="text-xs">
                                                                        {field.value ? "Active" : "Inactive"}
                                                                    </Badge>
                                                                </div>
                                                                <FormDescription className="text-sm">
                                                                    {module.description}
                                                                </FormDescription>
                                                            </div>
                                                        </div>
                                                        <FormControl>
                                                            <Switch
                                                                checked={field.value as boolean}
                                                                onCheckedChange={(checked) => {
                                                                    field.onChange(checked);
                                                                    setData(module.key as keyof SiteSettingsFormData, checked);
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Site Alerts */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                                    <CardTitle>Site Alerts</CardTitle>
                                </div>
                                <CardDescription>
                                    Configure site-wide alert banners for important announcements
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="site_alert_enabled"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="font-medium">Enable Site Alert Banner</FormLabel>
                                                <FormDescription>
                                                    Display an alert banner at the top of all pages
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        setData('site_alert_enabled', checked);
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="site_alert_content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alert Message</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    name={field.name}
                                                    value={field.value ?? ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setData('site_alert_content', e.target.value);
                                                    }}
                                                    onBlur={field.onBlur}
                                                    placeholder="Enter your important announcement here..."
                                                    className="w-full"
                                                    rows={3}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This message will be displayed prominently on all pages
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Contact Form Settings */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <CardTitle>Contact Form Notifications</CardTitle>
                                </div>
                                <CardDescription>
                                    Configure email notifications for contact form submissions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="notify_contact_form_submission"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="font-medium">Email Notifications</FormLabel>
                                                <FormDescription>
                                                    Receive email alerts when someone submits the contact form
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        setData('notify_contact_form_submission', checked);
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {data.notify_contact_form_submission && (
                                    <FormField
                                        control={form.control}
                                        name="notify_contact_form_email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Notification Email Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        name={field.name}
                                                        value={field.value ?? ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setData('notify_contact_form_email', e.target.value);
                                                        }}
                                                        onBlur={field.onBlur}
                                                        type="email"
                                                        placeholder="admin@district5b.org"
                                                        className="max-w-lg"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Email address where contact form notifications will be sent
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </CardContent>
                        </Card>

                        {/* Copyright Settings */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Copyright className="h-5 w-5 text-gray-600" />
                                    <CardTitle>Copyright Settings</CardTitle>
                                </div>
                                <CardDescription>
                                    Configure footer copyright information and legal text
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="copyright_text_enabled"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="font-medium">Show Copyright Text</FormLabel>
                                                <FormDescription>
                                                    Display copyright information in the website footer
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        setData('copyright_text_enabled', checked);
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {data.copyright_text_enabled && (
                                    <FormField
                                        control={form.control}
                                        name="copyright_text_content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Copyright Text</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        name={field.name}
                                                        value={field.value ?? ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setData('copyright_text_content', e.target.value);
                                                        }}
                                                        onBlur={field.onBlur}
                                                        placeholder="© 2024 District 5B. All rights reserved."
                                                        className="max-w-2xl"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    The copyright text displayed in the website footer
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </CardContent>
                        </Card>

                        {/* Save Button */}
                        <div className="flex justify-end pt-6">
                            <Button type="submit" disabled={processing} size="lg" className="min-w-[140px]">
                                {processing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Save All Settings
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </PrimaryLayout>
    );
}
