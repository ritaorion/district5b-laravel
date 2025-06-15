import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import {
    MapPin,
    Calendar,
    Users,
    FileText,
    Download,
    Mail,
    ArrowRight,
    Clock,
    ExternalLink
} from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import PrimaryLayout from "@/Layouts/PrimaryLayout";
import { motion } from "framer-motion";
import { pageVariants, staggerContainer } from "@/lib/animations";

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
                <section className="w-full pb-8 md:pb-12 lg:min-h-[calc(100vh-8rem)]">
                    <motion.div
                        className="container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                        variants={staggerContainer}
                    >
                        <motion.div
                            className="lg:col-span-5 space-y-6"
                            variants={pageVariants}
                        >
                            <motion.div variants={pageVariants}>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2">
                                    What is,
                                    <div className="">District 5B?</div>
                                </h1>
                            </motion.div>

                            <motion.div
                                className="text-base md:text-lg text-gray-800 space-y-4"
                                variants={pageVariants}
                            >
                                <p>
                                    District 5B is part of <Link href="/area42" className="text-blue-600 hover:underline font-medium">Area 42</Link>, and more specifically Southern Area 42 (SAGSC). District 5B includes meetings at the <Link href="/meetings" className="text-blue-600 hover:underline font-medium">Choices Fellowship</Link>, located at 4343 N. Rancho Dr. #240, Las Vegas on the second Saturday of every month from 1:15pm to 2:15pm.
                                </p>
                                <p>
                                    District 5B also includes rural areas to the north including Hiko, Alamo, Indian Springs, High Desert State Prison and the Southern Desert Correctional Center.
                                </p>
                            </motion.div>

                            <motion.div variants={pageVariants} className="flex flex-col sm:flex-row gap-4">
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
                                <Button
                                    variant="outline"
                                    size="lg"
                                    asChild
                                >
                                    <Link href="/contact">
                                        <Mail className="mr-2 h-4 w-4"/>
                                        Contact Us
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="lg:col-span-7 relative"
                            variants={pageVariants}
                        >
                            <div className="w-full h-auto">
                                <img
                                    src="/assets/bw-map.webp"
                                    alt="District 5B Map"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Quick Access Cards */}
                <section className="py-16 bg-gray-50">
                    <div className="container">
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
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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
                                        <Button asChild className="w-full">
                                            <Link href="/meetings">
                                                View Meetings
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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

                {/* Information Section */}
                <section className="py-20">
                    <div className="container">
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
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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
                                        <Button asChild className="w-full" variant={'outline'}>
                                            <Link href="/gsr">
                                                Learn More
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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
                                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader className="text-center pb-4">
                                        <div className="mx-auto bg-white/20 p-4 rounded-full w-fit mb-4">
                                            <Calendar className="h-8 w-8" />
                                        </div>
                                        <CardTitle className="text-xl mb-2">District Meeting</CardTitle>
                                        <CardDescription className="">
                                            Second Saturday of every month
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
                        </motion.div>
                    </div>
                </section>

                {/* Community Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container">
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
                                <Card className="h-full text-center">
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
                                <Card className="h-full text-center">
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
                                <Card className="h-full text-center">
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
                <section className="py-20 bg-[#1a3a7e] rounded-lg">
                    <div className="container">
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
                                <Button asChild size="lg" variant="secondary">
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
