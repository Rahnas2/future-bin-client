import React, { JSX } from "react";
import { motion } from 'motion/react'

type Props = {
    children: JSX.Element
}

const PageWrapper: React.FC<Props> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}       // starting state (invisible & slightly lower)
            animate={{ opacity: 1, y: 0 }}        // final state (visible & at normal position)
            transition={{ duration: 0.5, ease: "easeOut" }} // animation timing
        >
            {children}
        </motion.div>
    );
};

export default PageWrapper;