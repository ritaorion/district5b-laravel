import React from 'react';
import { motion } from "framer-motion";

interface GSRMissionSectionProps {
    className?: string;
}

const GSRMissionSection: React.FC<GSRMissionSectionProps> = ({ className = '' }) => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const backgroundWords = [
        'Service', 'Unity', 'Fellowship', 'Conscience', 'Communication',
        'Strength', 'Wisdom', 'Courage', 'Patience', 'Tolerance', 'Link',
        'Authority', 'God', 'Group', 'Conference', 'Representatives',
        'Information', 'Listen', 'Share', 'Trust', 'Servants'
    ];

    const mainText = `We are the General Service Representatives. We are the link in the chain of communication for our groups with the General Service Conference and the world of A.A. We realize the ultimate authority is a loving God as he may express Himself in our Group Conscience. As trusted servants, our job is to bring information to our groups in order that they can reach an informed group conscience. In passing along this group conscience, we are helping to maintain the unity and strength so vital to our fellowship.`;

    return (
        <section className={`relative isolate overflow-hidden ${className}`}>
            {/* Background Pattern - matching hero */}
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

            {/* Gradient Blur - matching hero */}
            <div className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48" aria-hidden="true">
                <div className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#1a3a7e] to-[#4f46e5] opacity-20" style={{clipPath: 'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)'}}></div>
            </div>

            {/* Smooth transition gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50/50 -z-10"></div>

            {/* Large background words */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-16 left-8 text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900/[0.04] transform -rotate-12 select-none">
                    Service
                </div>
                <div className="absolute top-32 right-12 text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a3a7e]/[0.05] transform rotate-6 select-none">
                    Unity
                </div>
                <div className="absolute top-80 left-24 text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800/[0.04] transform -rotate-6 select-none">
                    Fellowship
                </div>
                <div className="absolute bottom-40 right-8 text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a3a7e]/[0.05] transform rotate-12 select-none">
                    Conscience
                </div>
                <div className="absolute bottom-80 left-12 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700/[0.04] transform -rotate-3 select-none">
                    Communication
                </div>
                <div className="absolute top-60 right-32 text-4xl md:text-6xl lg:text-7xl font-bold text-gray-600/[0.04] transform rotate-15 select-none">
                    Strength
                </div>
                <div className="absolute bottom-20 right-48 text-6xl md:text-8xl lg:text-9xl font-bold text-[#1a3a7e]/[0.05] transform -rotate-8 select-none">
                    Wisdom
                </div>
                <div className="absolute top-44 left-48 text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800/[0.04] transform rotate-8 select-none">
                    Courage
                </div>
                <div className="absolute bottom-60 left-32 text-4xl md:text-6xl lg:text-7xl font-bold text-gray-700/[0.04] transform rotate-3 select-none">
                    Patience
                </div>
                <div className="absolute top-24 right-64 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-600/[0.04] transform -rotate-15 select-none">
                    Tolerance
                </div>
                <div className="absolute bottom-12 left-64 text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a3a7e]/[0.05] transform rotate-10 select-none">
                    Trust
                </div>
                <div className="absolute top-96 right-24 text-3xl md:text-5xl lg:text-6xl font-bold text-gray-500/[0.04] transform -rotate-4 select-none">
                    Servants
                </div>
            </div>

            {/* Main Content */}
            <div className="overflow-hidden">
                <div className="container mx-auto px-6 pt-20 pb-22 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Our Mission as GSRs
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Understanding our role in the fellowship and our responsibility to the groups we serve.
                        </p>
                    </motion.div>

                    <motion.div
                        className="max-w-5xl mx-auto"
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {/* Main Mission Statement */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 mb-12 relative">
                            <p className="text-lg leading-relaxed text-gray-800 font-medium text-center">
                                {mainText}
                            </p>
                        </div>

                        {/* Closing Principles - Clean Card Style */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-8 relative">
                            <div className="text-center space-y-8">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-8">Let us, therefore,</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base md:text-lg">
                                    <div className="text-center space-y-4">
                                        <div className="text-3xl font-bold text-[#1a3a7e] mb-2">Have</div>
                                        <div className="text-gray-700">
                                            <strong className="text-gray-900">patience and tolerance</strong> to listen while others share
                                        </div>
                                    </div>

                                    <div className="text-center space-y-4">
                                        <div className="text-3xl font-bold text-[#1a3a7e] mb-2">The</div>
                                        <div className="text-gray-700">
                                            <strong className="text-gray-900">courage</strong> to speak up when we have something to share
                                        </div>
                                    </div>

                                    <div className="text-center space-y-4">
                                        <div className="text-3xl font-bold text-[#1a3a7e] mb-2">And</div>
                                        <div className="text-gray-700">
                                            <strong className="text-gray-900">wisdom</strong> to do what is right for our group and A.A. as a whole
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GSRMissionSection;
