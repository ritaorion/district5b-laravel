import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    MapPin,
    Calendar,
    Users,
    FileText,
    Download,
    Mail,
    ArrowRight,
    Clock,
    ExternalLink, Quote
} from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import PrimaryLayout from "@/Layouts/PrimaryLayout";
import { motion } from "framer-motion";
import { pageVariants, staggerContainer } from "@/lib/animations";
import GSRMissionSection from "@/Components/GSRMissionSection";

const Index = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <PrimaryLayout>
            <Head title={'District 5B'} />
            <motion.div
                className="page home-page"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
            >
                {/* Hero Section */}
                <section className="relative isolate overflow-hidden">
                    {/* Background Pattern */}
                    <svg className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]" aria-hidden="true">
                        <defs>
                            <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                            <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth="0" />
                        </svg>
                        <rect width="100%" height="100%" strokeWidth="0" fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
                    </svg>

                    {/* Gradient Blur */}
                    <div className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48" aria-hidden="true">
                        <div className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#1a3a7e] to-[#4f46e5] opacity-20" style={{clipPath: 'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)'}}></div>
                    </div>

                    {/* Smooth transition gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50/50 -z-10"></div>

                    <div className="overflow-hidden">
                        <div className="container mx-auto px-6 pt-26 pb-22 sm:pt-32 lg:px-8 lg:pt-20">
                            <motion.div
                                className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center"
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                            >
                                <motion.div
                                    className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl"
                                    variants={pageVariants}
                                >
                                    <div className="mb-0">
                                        <span className="text-xl md:text-2xl font-semibold uppercase tracking-widest text-gray-500">Area 42</span>
                                    </div>
                                    <h1 className="text-6xl font-semibold tracking-tight text-gray-900 sm:text-7xl md:text-8xl">
                                        District 5B
                                    </h1>
                                    <p className="mt-8 text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl lg:max-w-none">
                                        District 5B is part of <Link href="/area42" className="text-[#1a3a7e] hover:underline font-semibold">Area 42</Link>, and more specifically Southern Area 42 (SAGSC). We support AA groups and members through service work and leadership development in Las Vegas and rural northern areas.
                                    </p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <Button
                                            size="lg"
                                            className="bg-[#1a3a7e] hover:bg-[#143163]"
                                            asChild
                                        >
                                            <Link href="/meetings">
                                                <MapPin className="mr-2 h-4 w-4"/>
                                                Find Meetings
                                            </Link>
                                        </Button>
                                        <Link href="/contact" className="text-sm font-semibold text-gray-900">
                                            Contact Us <span aria-hidden="true">→</span>
                                        </Link>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
                                    variants={pageVariants}
                                >
                                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                        <div className="relative">
                                            <img src="/assets/aa-10th-img.png" alt="AA 10th Anniversary Historical Photo" className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                        </div>
                                    </div>
                                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                        <div className="relative">
                                            <img src="/assets/aa-sister-ignatia.png" alt="AA Historical Photo of Sister Ignatia" className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                        </div>
                                        <div className="relative">
                                            <img src="/assets/aa-1960-conv.jpg" alt="AA 1960 Convention Historical Photo" className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                        </div>
                                    </div>
                                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                        <div className="relative">
                                            <img src="/assets/aa-bill-w.jpg" alt="AA Bill W. Historical Photo" className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                        </div>
                                        <div className="relative">
                                            <img src="/assets/aa-doctor-bob.jpg" alt="AA Doctor Bob Historical Photo" className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Quick Access Cards */}
                <section className="relative py-20 bg-gradient-to-b from-gray-50/50 to-white">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-30">
                        <svg className="absolute inset-0 h-full w-full stroke-gray-200/50" aria-hidden="true">
                            <defs>
                                <pattern id="quick-access-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M.5 40V.5H40" fill="none" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#quick-access-pattern)" />
                        </svg>
                    </div>

                    <div className="container mx-auto px-6 lg:px-8 relative">
                        <motion.div
                            className="text-center mb-12"
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Quick Access
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto px-2">
                                Find what you need quickly with our most popular resources and information.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                            variants={staggerChildren}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <motion.div variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                                    <CardHeader className="text-center">
                                        <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                                            <MapPin className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <CardTitle>Meeting Finder</CardTitle>
                                        <CardDescription>
                                            Locate AA meetings in District 5B
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Button asChild className="w-full" variant={'outline'}>
                                            <Link href="/meetings">
                                                View Meetings
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                                    <CardHeader className="text-center">
                                        <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                                            <Calendar className="h-6 w-6 text-green-600" />
                                        </div>
                                        <CardTitle>Upcoming Events</CardTitle>
                                        <CardDescription>
                                            District meetings and special events
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/events">
                                                View Events
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                                    <CardHeader className="text-center">
                                        <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit mb-4">
                                            <FileText className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <CardTitle>Member Stories</CardTitle>
                                        <CardDescription>
                                            Read inspiring recovery stories
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/stories">
                                                Read Stories
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                                    <CardHeader className="text-center">
                                        <div className="mx-auto bg-orange-100 p-3 rounded-full w-fit mb-4">
                                            <Download className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <CardTitle>Resources</CardTitle>
                                        <CardDescription>
                                            Download helpful documents
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/resources">
                                                Browse Resources
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
                {/* Service Section */}
                <section className="relative py-20 bg-gradient-to-b from-white to-gray-50/50">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <svg className="absolute inset-0 h-full w-full stroke-gray-200/50" aria-hidden="true">
                            <defs>
                                <pattern id="service-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M.5 60V.5H60" fill="none" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#service-pattern)" />
                        </svg>
                    </div>

                    <div className="container mx-auto px-6 lg:px-8 relative">
                        <motion.div
                            className="text-center mb-16"
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Service
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                District 5B is committed to supporting AA groups and members through service work and leadership development. Learn about the roles that help keep our fellowship strong.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
                            variants={staggerChildren}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <motion.div variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                                    <CardHeader className="text-center pb-4">
                                        <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit mb-4">
                                            <Users className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <CardTitle className="text-xl mb-2">GSR Information</CardTitle>
                                        <CardDescription className="text-base">
                                            General Service Representative
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0 text-center">
                                        <p className="text-gray-600 mb-6">
                                            Learn about the important role of GSRs in connecting groups to AA as a whole.
                                        </p>
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/gsr">
                                                Learn More
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                                    <CardHeader className="text-center pb-4">
                                        <div className="mx-auto bg-green-100 p-4 rounded-full w-fit mb-4">
                                            <Users className="h-8 w-8 text-green-600" />
                                        </div>
                                        <CardTitle className="text-xl mb-2">AGSR Information</CardTitle>
                                        <CardDescription className="text-base">
                                            Alternate General Service Representative
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0 text-center">
                                        <p className="text-gray-600 mb-6">
                                            Discover how AGSRs support GSRs and help ensure consistent service.
                                        </p>
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/agsr">
                                                Learn More
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                                    <CardHeader className="text-center pb-4">
                                        <div className="mx-auto bg-purple-100 p-4 rounded-full w-fit mb-4">
                                            <Calendar className="h-8 w-8 text-purple-600" />
                                        </div>
                                        <CardTitle className="text-xl mb-2">District Meeting</CardTitle>
                                        <CardDescription className="text-base">
                                            Second Saturday of every month
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0 text-center">
                                        <div className="space-y-3 mb-6 text-gray-600">
                                            <div className="flex items-center justify-center space-x-2">
                                                <MapPin className="h-4 w-4" />
                                                <span className="text-sm">Choices Fellowship</span>
                                            </div>
                                            <div className="text-sm">
                                                4343 N. Rancho Dr. #240, Las Vegas
                                            </div>
                                            <div className="flex items-center justify-center space-x-2">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-sm">1:15pm - 2:15pm</span>
                                            </div>
                                        </div>
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/meetings">
                                                Get Directions
                                                <ExternalLink className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
                {/* Community Section */}
                <section className="relative py-20 bg-gradient-to-b from-gray-50/50 to-gray-100/30">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <svg className="absolute inset-0 h-full w-full stroke-gray-200/50" aria-hidden="true">
                            <defs>
                                <pattern id="community-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                                    <path d="M.5 80V.5H80" fill="none" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#community-pattern)" />
                        </svg>
                    </div>

                    <div className="container mx-auto px-6 lg:px-8 relative">
                        <motion.div
                            className="text-center mb-12"
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Get Involved
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                There are many ways to contribute to our fellowship and support others in recovery.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            variants={staggerChildren}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <motion.div variants={fadeInUp}>
                                <Card className="h-full text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                                            <FileText className="h-6 w-6 text-green-600" />
                                        </div>
                                        <CardTitle>Share Your Story</CardTitle>
                                        <CardDescription>
                                            Your daily dose of experience, strength, and hope.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/submit-story">
                                                Submit Story
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Card className="h-full text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                                            <Users className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <CardTitle>Learn the Acronyms</CardTitle>
                                        <CardDescription>
                                            Understand common AA terms and abbreviations
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/acronyms">
                                                View Acronyms
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Card className="h-full text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit mb-4">
                                            <Mail className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <CardTitle>Contact District 5B</CardTitle>
                                        <CardDescription>
                                            Have questions or need help?
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/contact">
                                                Get in Touch
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-20 bg-gradient-to-br from-[#1a3a7e] via-[#1e40af] to-[#1a3a7e] overflow-hidden rounded-lg">
                    {/* Background pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="absolute inset-0 h-full w-full stroke-white/20" aria-hidden="true">
                            <defs>
                                <pattern id="cta-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                                    <path d="M.5 100V.5H100" fill="none" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
                        </svg>
                    </div>

                    {/* Subtle gradient orbs */}
                    <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-6 lg:px-8 relative">
                        <motion.div
                            className="text-center text-white"
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Get Involved?
                            </h2>
                            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto px-2">
                                Whether you're new to AA or looking to get more involved in service, District 5B is here to support your journey.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center px-3">
                                <Button asChild size="lg" variant="secondary" className="bg-white text-[#1a3a7e] hover:bg-gray-100">
                                    <Link href="/meetings">
                                        <MapPin className="mr-2 h-4 w-4"/>
                                        Find a Meeting
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="secondary">
                                    <Link href="/contact">
                                        <Mail className="mr-2 h-4 w-4"/>
                                        Contact Us
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </motion.div>
        </PrimaryLayout>
    );
};

export default Index;
