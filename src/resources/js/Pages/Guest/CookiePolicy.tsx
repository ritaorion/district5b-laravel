import React from 'react';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";
import { Head } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';

export default function CookiePolicy() {
    return (
        <PrimaryLayout>
            <Head title="Cookie Policy" />
            <motion.div
                className="container mx-auto py-6"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="flex justify-left"
                        variants={pageVariants}
                    >
                        <Breadcrumbs
                            pages={[
                                { title: 'Home', href: '/', active: false },
                                { title: 'Cookie Policy', href: '/cookie-policy', active: true },
                            ]}
                        />
                    </motion.div>

                    <motion.div
                        className="mb-8"
                        variants={pageVariants}
                    >
                        <motion.h1
                            className="text-3xl font-bold mb-4"
                            variants={pageVariants}
                        >
                            Cookie Policy
                        </motion.h1>
                        <p className="text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </motion.div>

                    <motion.div
                        className="prose prose-gray max-w-none"
                        variants={pageVariants}
                    >
                        <div className="bg-white rounded-lg border shadow-sm p-8 space-y-6">
                            <section>
                                <h2 className="text-xl font-semibold mb-3">What Are Cookies</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third-party to recognize you and make your next visit easier and the service more useful to you.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">How We Use Cookies</h2>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    District 5B uses cookies for the following purposes:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    <li>To maintain your session and keep you logged in</li>
                                    <li>To remember your preferences and settings</li>
                                    <li>To improve website performance and functionality</li>
                                    <li>To analyze website usage and traffic patterns</li>
                                    <li>To ensure website security and prevent fraud</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Types of Cookies We Use</h2>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            These cookies are necessary for the website to function properly. They include:
                                        </p>
                                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                            <li><strong>Session:</strong> Maintains your session state and authentication</li>
                                            <li><strong>CSRF Token:</strong> Protects against cross-site request forgery attacks</li>
                                            <li><strong>Security Cookies:</strong> Help secure your interactions with our website</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Analytics Cookies</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            We use Google Analytics to understand how visitors interact with our website. These cookies collect information such as:
                                        </p>
                                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                            <li>Number of visitors and page views</li>
                                            <li>How users navigate through the site</li>
                                            <li>Which pages are most popular</li>
                                            <li>Geographic location (anonymized)</li>
                                            <li>Device and browser information</li>
                                        </ul>
                                        <p className="text-gray-700 leading-relaxed mt-2">
                                            This information helps us improve our website and provide better content for our users.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Functional Cookies</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            These cookies enable enhanced functionality and personalization, such as:
                                        </p>
                                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                            <li>Remembering your language preferences</li>
                                            <li>Storing your login information (if you choose to stay logged in)</li>
                                            <li>Maintaining your search filters and preferences</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Third-Party Cookies</h2>
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Google Analytics</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            We use Google Analytics to analyze website traffic and usage patterns. Google Analytics uses cookies to collect anonymous information about how visitors use our site. For more information about Google Analytics cookies, please visit{' '}
                                            <a href="https://support.google.com/analytics/answer/11397207?hl=en"
                                               className="text-blue-600 hover:text-blue-800 underline"
                                               target="_blank"
                                               rel="noopener noreferrer">
                                                Google's Analytics Cookie Usage guide
                                            </a>.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Managing Cookies</h2>
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Browser Settings</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            Most web browsers allow you to control cookies through their settings. You can:
                                        </p>
                                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                            <li>View and delete cookies</li>
                                            <li>Block cookies from specific websites</li>
                                            <li>Block third-party cookies</li>
                                            <li>Block all cookies</li>
                                            <li>Delete all cookies when you close your browser</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Cookie Retention</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Different cookies have different retention periods:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                    <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                                    <li><strong>Persistent Cookies:</strong> Remain until they expire or you delete them</li>
                                    <li><strong>Laravel Session:</strong> Typically expires after 2 hours of inactivity</li>
                                    <li><strong>Google Analytics:</strong> Various expiration periods up to 2 years</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Updates to This Policy</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will post any changes on this page with an updated effective date.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    If you have any questions about our use of cookies or this Cookie Policy, please{' '}
                                    <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                                        contact us
                                    </a>.
                                </p>
                            </section>

                            <div className="border-t pt-6 mt-8">
                                <p className="text-sm text-gray-500">
                                    <strong>Disclaimer:</strong> District 5B is an independent organization and is not affiliated with, endorsed by, or approved by Alcoholics Anonymous World Services, Inc.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </PrimaryLayout>
    );
}
