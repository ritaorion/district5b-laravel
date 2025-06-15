import { Variants } from "framer-motion";

export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            opacity: { duration: 0.2 }
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
};

export const staggerContainer: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};
