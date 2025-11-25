import React from 'react';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";
import { Head } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';

export default function PrivacyPolicy() {
    return (
        <PrimaryLayout>
            <Head title="Privacy Policy" />
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
                                { title: 'Privacy Policy', href: '/privacy-policy', active: true },
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
                            Privacy Policy
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
                                <h2 className="text-xl font-semibold mb-3">Introduction</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    District 5B ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            We may collect personal information that you voluntarily provide when you:
                                        </p>
                                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                            <li>Contact us through our contact form</li>
                                            <li>Submit stories or content</li>
                                            <li>Register for events or meetings</li>
                                            <li>Subscribe to our communications</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Automatic Information</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            We may automatically collect certain information about your device and usage patterns, including IP address, browser type, operating system, and pages visited.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    <li>Respond to your inquiries and provide customer support</li>
                                    <li>Process and manage event registrations</li>
                                    <li>Improve our website and services</li>
                                    <li>Send you updates about meetings and events (with your consent)</li>
                                    <li>Comply with legal obligations</li>
                                    <li>Protect against fraud and unauthorized access</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Information Sharing</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                    <li>When required by law or to comply with legal processes</li>
                                    <li>To protect our rights, property, or safety, or that of others</li>
                                    <li>With service providers who assist us in operating our website (subject to confidentiality agreements)</li>
                                    <li>In connection with a business transfer or merger</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Data Security</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    <li>Access and review your personal information</li>
                                    <li>Request corrections to inaccurate information</li>
                                    <li>Request deletion of your personal information</li>
                                    <li>Opt out of communications</li>
                                    <li>File a complaint with a supervisory authority</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Third-Party Links</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Children's Privacy</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    If you have any questions about this Privacy Policy or our privacy practices, please{' '}
                                    <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                                        contact us
                                    </a>.
                                </p>
                            </section>

                            <div className="border-t pt-6 mt-8">
                                <p className="text-sm text-gray-500">
                                    <strong>Disclaimer:</strong> District 5B is an independent organization and is not affiliated with, endorsed by, or approved by Alcoholics Anonymous World Services, Inc. The views and information provided on this website are those of District 5B and do not necessarily represent the official positions of Alcoholics Anonymous.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </PrimaryLayout>
    );
}