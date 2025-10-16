import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/ui/accordion';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";
import { Head } from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';

interface Faq {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

interface FaqsProps {
    faqs: Faq[];
}

export default function Faqs({ faqs }: FaqsProps) {
    return (
        <PrimaryLayout>
            <Head title="Frequently Asked Questions" />
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
                                { title: 'FAQs', href: '/faqs', active: true },
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
                            Frequently Asked Questions
                        </motion.h1>
                        <p className="text-muted-foreground">
                            Find answers to common questions about District 5B and Alcoholics Anonymous.
                            If you don't find what you're looking for, feel free to contact us.
                        </p>
                    </motion.div>

                    <motion.div
                        className="space-y-4"
                        variants={pageVariants}
                    >
                        {faqs.length === 0 ? (
                            <motion.div
                                className="text-center py-12"
                                variants={pageVariants}
                            >
                                <h2 className="text-xl mb-2">No FAQs Available</h2>
                                <p className="text-muted-foreground">
                                    Check back later for frequently asked questions.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="bg-white rounded-lg border shadow-sm"
                                variants={pageVariants}
                            >
                                <Accordion type="single" collapsible className="w-full">
                                    {faqs.map((faq, index) => (
                                        <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                                            <AccordionTrigger className="px-6 py-4 text-left">
                                                <span className="text-base font-medium">
                                                    {faq.title}
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 pb-4">
                                                <div 
                                                    className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: faq.content }}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        className="mt-12 text-center"
                        variants={pageVariants}
                    >
                        <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
                        <p className="text-muted-foreground mb-4">
                            Can't find the answer you're looking for? Please reach out to us.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            Contact Us
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </PrimaryLayout>
    );
}