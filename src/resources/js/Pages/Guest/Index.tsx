import { Button } from '@/Components/ui/button';
import { MapPin } from 'lucide-react';
import {Head, Link} from '@inertiajs/react';
//import { useTranslation } from "react-i18next";
import PrimaryLayout from "@/Layouts/PrimaryLayout";
import { motion } from "framer-motion";
import { pageVariants, staggerContainer } from "@/lib/animations";

const Index = () => {

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
                <div className="w-full py-12 md:py-16 lg:min-h-[calc(100vh-6rem)]">
                    <motion.div
                        className="container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                        variants={staggerContainer}
                    >
                        {/* Left column - Text content */}
                        <motion.div
                            className="lg:col-span-5 space-y-6"
                            variants={pageVariants}
                        >
                            <motion.div variants={pageVariants}>
                                <h1 className="text-5xl md:text-7xl font-bold text-[#1a3a7e] mb-2">
                                    What is,
                                    <div className="text-[#1a3a7e]">District 5B?</div>
                                </h1>
                            </motion.div>

                            <motion.div
                                className="text-base text-gray-800 space-y-4"
                                variants={pageVariants}
                            >
                                <p className="text-lg">
                                    District 5B is part of <Link href="/area42" className="text-blue-600 hover:underline">Area
                                    42</Link>, and more specifically Southern Area 42 (SAGSC). District 5B
                                    includes meetings at the <Link href="/meetings" className="text-blue-600 hover:underline">Choices
                                    Fellowship</Link>, located at 4343 N. Rancho Dr. #240, Las
                                    Vegas on the second Saturday of every month from 1:15pm to 2:15pm.
                                </p>
                                <p className="text-lg">
                                    District 5B also includes rural areas to the north including Hiko, Alamo, Indian Springs, High Desert State
                                    Prison and the Southern Desert Correctional Center.
                                </p>
                            </motion.div>

                            <motion.div variants={pageVariants}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="mt-4"
                                    asChild
                                >
                                    <Link href="/meetings">
                                        <MapPin className="mr-2 h-4 w-4"/>
                                        Find Meetings in District 5B
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Right column - Map */}
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
                </div>
            </motion.div>
        </PrimaryLayout>
    );
};

export default Index;
