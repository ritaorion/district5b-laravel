import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import {
    Users,
    FileText,
    Calendar,
    TrendingUp,
    MessageSquare,
    Eye,
    Star,
    Clock,
    BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PageProps } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    const monthlyVisitors = [
        { month: 'Jan', visitors: 1250 },
        { month: 'Feb', visitors: 1420 },
        { month: 'Mar', visitors: 1680 },
        { month: 'Apr', visitors: 1950 },
        { month: 'May', visitors: 2100 },
        { month: 'Jun', visitors: 2350 },
    ];

    const contentStats = [
        { type: 'Blogs', count: 45 },
        { type: 'Events', count: 23 },
        { type: 'Resources', count: 67 },
        { type: 'Meetings', count: 156 },
    ];

    const recentActivity = [
        { action: 'New blog post published', time: '2 hours ago', type: 'success' },
        { action: 'Event updated: Monthly Meeting', time: '4 hours ago', type: 'info' },
        { action: 'User submitted contact form', time: '6 hours ago', type: 'warning' },
        { action: 'Resource document uploaded', time: '1 day ago', type: 'success' },
        { action: 'Meeting schedule updated', time: '2 days ago', type: 'info' },
    ];

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'success': return <FileText className="h-4 w-4 text-green-600" />;
            case 'warning': return <MessageSquare className="h-4 w-4 text-yellow-600" />;
            case 'info': return <Calendar className="h-4 w-4 text-blue-600" />;
            default: return <Clock className="h-4 w-4 text-gray-600" />;
        }
    };

    return (
        <PrimaryLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {auth?.user?.first_name}!
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Here's what's happening with District 5B today.
                    </p>
                </div>

                <Alert className="bg-yellow-50 border-yellow-200">
                    <AlertDescription className="text-yellow-800">
                        <strong>Demo Notice:</strong> This dashboard is showing placeholder data for demonstration purposes only.
                        Real metrics and data will be displayed here once the system is fully implemented.
                    </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12,845</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">+12.5%</span> from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2,467</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">+8.2%</span> from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Content Items</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">291</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-blue-600">+15</span> added this month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.8</div>
                            <p className="text-xs text-muted-foreground">
                                Based on 234 reviews
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Visitor Trends
                            </CardTitle>
                            <CardDescription>
                                Monthly website visitors over the past 6 months
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={monthlyVisitors}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="visitors"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={{ fill: '#3b82f6' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Content Distribution
                            </CardTitle>
                            <CardDescription>
                                Breakdown of content types on the website
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={contentStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="type" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Latest updates and changes to the website
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="mt-1">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                {activity.action}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {activity.time}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={activity.type === 'success' ? 'default' :
                                                activity.type === 'warning' ? 'secondary' : 'outline'}
                                            className="text-xs"
                                        >
                                            {activity.type}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Overview</CardTitle>
                            <CardDescription>
                                Key performance indicators at a glance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="font-medium">Page Load Speed</span>
                                        <span className="text-green-600">Excellent</span>
                                    </div>
                                    <Progress value={92} className="h-2" />
                                    <p className="text-xs text-gray-500 mt-1">92% - Average load time: 1.2s</p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="font-medium">SEO Score</span>
                                        <span className="text-green-600">Good</span>
                                    </div>
                                    <Progress value={85} className="h-2" />
                                    <p className="text-xs text-gray-500 mt-1">85/100 - Well optimized</p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="font-medium">User Engagement</span>
                                        <span className="text-blue-600">Growing</span>
                                    </div>
                                    <Progress value={78} className="h-2" />
                                    <p className="text-xs text-gray-500 mt-1">78% - Average session: 4.2 min</p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="font-medium">Content Freshness</span>
                                        <span className="text-yellow-600">Needs Update</span>
                                    </div>
                                    <Progress value={65} className="h-2" />
                                    <p className="text-xs text-gray-500 mt-1">65% - Last updated 3 days ago</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PrimaryLayout>
    );
}
