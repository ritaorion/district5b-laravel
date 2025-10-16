import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import {
    Loader2,
    Mail,
    Phone,
    Search
} from 'lucide-react';
import {
    Alert,
    AlertDescription,
} from '@/Components/ui/alert';
import Breadcrumbs from "@/Components/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants, staggerContainer } from "@/lib/animations";
import {Head, useForm, usePage} from '@inertiajs/react';
import PrimaryLayout from '@/Layouts/PrimaryLayout';
import { RosterMember } from '@/types/Roster';

interface ContactProps {
    roster: RosterMember[];
}

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function Contact({ roster }: ContactProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('guest.contact.send'), {
            onSuccess: () => {
                reset();
            }
        });
    };

    const filteredRoster = roster.filter(member => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            member.title.toLowerCase().includes(query) ||
            member.name.toLowerCase().includes(query) ||
            (member.email?.toLowerCase().includes(query) ?? false) ||
            (member.phone?.toLowerCase().includes(query) ?? false)
        );
    });

    const { props } = usePage();
    const siteSettings = props.siteSettings;

    return (
        <PrimaryLayout>
            <Head title="Contact Us" />
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                className="container mx-auto py-6"
            >
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        className="flex justify-left"
                        variants={pageVariants}
                    >
                        <Breadcrumbs
                            pages={[
                                { title: 'Home', href: '/', active: false },
                                { title: 'Contact', href: route('guest.contact'), active: true },
                            ]}
                        />
                    </motion.div>

                    <motion.h1
                        className="text-3xl font-bold mb-6"
                        variants={pageVariants}
                    >
                        Contact Us
                    </motion.h1>

                    <AnimatePresence>
                        {wasSuccessful && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                            >
                                <Alert className="mb-6 bg-green-50 border-green-200">
                                    <AlertDescription className="text-green-700">
                                        Your message has been sent successfully! We will get back to you soon.
                                    </AlertDescription>
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid gap-6 max-w-2xl mx-auto">
                        <motion.div variants={pageVariants}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Send us a message</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </CardDescription>
                                </CardHeader>

                                <form onSubmit={handleSubmit}>
                                    <CardContent className="space-y-4">
                                        <motion.div
                                            className="space-y-2"
                                            variants={pageVariants}
                                        >
                                            <Label htmlFor="name">
                                                Name<span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData('name' as keyof ContactFormData, e.target.value)}
                                                placeholder="Your name"
                                                className={errors.name ? 'border-red-500' : ''}
                                            />
                                            <AnimatePresence>
                                                {errors.name && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="text-red-500 text-sm"
                                                    >
                                                        {errors.name}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        <motion.div
                                            className="space-y-2"
                                            variants={pageVariants}
                                        >
                                            <Label htmlFor="email">
                                                Email<span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email' as keyof ContactFormData, e.target.value)}
                                                placeholder="Your email address"
                                                className={errors.email ? 'border-red-500' : ''}
                                            />
                                            <AnimatePresence>
                                                {errors.email && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="text-red-500 text-sm"
                                                    >
                                                        {errors.email}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        <motion.div
                                            className="space-y-2"
                                            variants={pageVariants}
                                        >
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                value={data.subject}
                                                onChange={(e) => setData('subject' as keyof ContactFormData, e.target.value)}
                                                placeholder="What is this about?"
                                            />
                                        </motion.div>

                                        <motion.div
                                            className="space-y-2"
                                            variants={pageVariants}
                                        >
                                            <Label htmlFor="message">
                                                Message<span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={data.message}
                                                onChange={(e) => setData('message' as keyof ContactFormData, e.target.value)}
                                                placeholder="Your message"
                                                className={errors.message ? 'border-red-500' : ''}
                                                rows={5}
                                            />
                                            <AnimatePresence>
                                                {errors.message && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="text-red-500 text-sm"
                                                    >
                                                        {errors.message}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </CardContent>

                                    <CardFooter>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full"
                                        >
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full"
                                            >
                                                {processing ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    'Send Message'
                                                )}
                                            </Button>
                                        </motion.div>
                                    </CardFooter>
                                </form>
                            </Card>
                        </motion.div>

                        {siteSettings.roster_mod_enabled && (
                            <motion.div
                                className="space-y-6"
                                variants={pageVariants}
                            >
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">District Roster</h2>
                                    <p className="text-muted-foreground mb-4">
                                        Contact our district officers and committee chairs directly.
                                    </p>

                                    <motion.div
                                        className="relative mb-6"
                                        variants={pageVariants}
                                    >
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Search by title, name, email, or phone..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </motion.div>

                                    {filteredRoster.length === 0 ? (
                                        <motion.div
                                            className="text-center py-8"
                                            variants={pageVariants}
                                        >
                                            <p className="text-muted-foreground">
                                                {searchQuery ? 'No roster members found matching your search.' : 'No roster information available.'}
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            className="space-y-4"
                                            variants={staggerContainer}
                                        >
                                            {filteredRoster.map((member, index) => (
                                                <motion.div
                                                    key={member.id}
                                                    variants={pageVariants}
                                                    initial="initial"
                                                    animate="animate"
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Card className="h-full">
                                                        <CardHeader className="pb-3">
                                                            <CardTitle className="text-lg">{member.title}</CardTitle>
                                                            <CardDescription className="text-base font-medium">
                                                                {member.name}
                                                            </CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="pt-0">
                                                            <div className="space-y-2">
                                                                {member.phone && (
                                                                    <div className="flex items-center gap-2 text-sm">
                                                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                                                        <a
                                                                            href={`tel:${member.phone}`}
                                                                            className="hover:underline"
                                                                        >
                                                                            {member.phone}
                                                                        </a>
                                                                    </div>
                                                                )}
                                                                {member.email && (
                                                                    <div className="flex items-center gap-2 text-sm">
                                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                                        <a
                                                                            href={`mailto:${member.email}`}
                                                                            className="text-primary hover:underline"
                                                                        >
                                                                            {member.email}
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </PrimaryLayout>
    );
}
