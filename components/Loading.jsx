"use client"
import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[70vh] gap-6">
            <div className="relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-4 border-border border-t-primary"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
            </div>
            <p className="text-sm text-foreground/40 font-medium animate-pulse">Loading...</p>
        </div>
    )
}

export default Loading