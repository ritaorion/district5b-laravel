import React from 'react';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";
import { Head } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';

export default function TermsOfUse() {
    return (
        <PrimaryLayout>
            <Head title="Terms of Use" />
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
                                { title: 'Terms of Use', href: '/terms-of-use', active: true },
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
                            Terms of Use
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
                                <h2 className="text-xl font-semibold mb-3">Agreement to Terms</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    By accessing and using the District 5B website, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users, and others who access or use the service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Use License</h2>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    Permission is granted to temporarily access the materials on District 5B's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    <li>Modify or copy the materials</li>
                                    <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                                    <li>Attempt to reverse engineer any software contained on the website</li>
                                    <li>Remove any copyright or other proprietary notations from the materials</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mt-3">
                                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by District 5B at any time.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">User Content</h2>
                                <div className="space-y-3">
                                    <p className="text-gray-700 leading-relaxed">
                                        When you submit content to our website (including but not limited to stories, comments, or contact forms), you agree that:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                                        <li>You own the content or have the right to submit it</li>
                                        <li>The content does not violate any third-party rights</li>
                                        <li>The content is accurate and not misleading</li>
                                        <li>The content does not contain harmful or malicious code</li>
                                        <li>You grant us the right to review, edit, or remove content at our discretion</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Prohibited Uses</h2>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    You may not use our website:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                                    <li>To submit false or misleading information</li>
                                    <li>To upload or transmit viruses or any other type of malicious code</li>
                                    <li>To spam, phish, farm, pretext, spider, crawl, or scrape</li>
                                    <li>For any obscene or immoral purpose</li>
                                    <li>To interfere with or circumvent the security features of our website</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    The materials on District 5B's website are provided on an 'as is' basis. District 5B makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Limitations</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    In no event shall District 5B or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on District 5B's website, even if District 5B or a District 5B authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Accuracy of Materials</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    The materials appearing on District 5B's website could include technical, typographical, or photographic errors. District 5B does not warrant that any of the materials on its website are accurate, complete, or current. District 5B may make changes to the materials contained on its website at any time without notice. However, District 5B does not make any commitment to update the materials.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Links</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    District 5B has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by District 5B of the site. Use of any such linked website is at the user's own risk.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Privacy Policy</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Your privacy is important to us. Please review our{' '}
                                    <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                                        Privacy Policy
                                    </a>, which also governs your use of the website, to understand our practices.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Governing Law</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    These terms and conditions are governed by and construed in accordance with the laws of Nevada, United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    District 5B may revise these terms of use at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of use.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Termination</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    If you have any questions about these Terms of Use, please{' '}
                                    <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                                        contact us
                                    </a>.
                                </p>
                            </section>

                            <div className="border-t pt-6 mt-8">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-700">
                                        <strong>Important Disclaimer:</strong> District 5B is an independent organization and is not affiliated with, endorsed by, or approved by Alcoholics Anonymous World Services, Inc. The views, opinions, and information provided on this website are those of District 5B and its members, and do not necessarily represent the official positions or policies of Alcoholics Anonymous. Alcoholics Anonymous World Services, Inc. does not endorse or approve this website or its contents.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </PrimaryLayout>
    );
}