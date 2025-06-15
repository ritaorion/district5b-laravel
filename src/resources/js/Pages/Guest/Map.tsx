import { useState } from 'react';
import PrimaryLayout from "@/Layouts/PrimaryLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import Breadcrumbs from '@/Components/Breadcrumbs';
import LoadingSpinner from '@/Components/LoadingSpinner';
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants, staggerContainer } from "@/lib/animations";
import {Head} from "@inertiajs/react";

const Map = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    return (
        <PrimaryLayout>
            <Head title={'Map'} />
            <motion.div
                className="page map-page"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
            >
                <motion.div variants={pageVariants}>
                    <Breadcrumbs
                        pages={[
                            { title: 'Home', href: '/', active: false },
                            { title: 'Map', href: '/map', active: true },
                        ]}
                    />
                </motion.div>
                <motion.div variants={staggerContainer}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Map</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="relative min-h-[600px]">
                            <AnimatePresence>
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex items-center justify-center bg-background/80"
                                    >
                                        <LoadingSpinner />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{
                                    opacity: isLoading ? 0 : 1,
                                    scale: isLoading ? 0.95 : 1
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <iframe
                                    src="https://www.google.com/maps/d/embed?mid=1hcFJSeBWCnPac8SInQREQK1zW-gb53U5&ehbc=2E312F"
                                    width="100%"
                                    height="600px"
                                    onLoad={handleIframeLoad}
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </motion.div>
                        </CardContent>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </motion.div>
            </motion.div>
        </PrimaryLayout>
    );
};

export default Map;
