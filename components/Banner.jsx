"use client"
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const Banner = () => {
  const { router } = useAppContext();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl"
    >
      {/* Background glow effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]" />
      
      <div className="relative flex flex-col md:grid md:grid-cols-3 items-center py-10 md:py-0 md:h-[480px] px-6 md:px-0 gap-8 md:gap-0">
        
        {/* Left Section - Gaming Laptop */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center md:justify-end w-full order-1 md:order-none md:translate-x-24 lg:translate-x-36"
        >
          <Image
            className="w-64 md:w-[380px] lg:w-[440px] drop-shadow-2xl object-contain transition-transform duration-500 hover:scale-110"
            src={assets.gaming_pc_image}
            alt="Gaming PC"
          />
        </motion.div>

        {/* Center Text - Perfectly centered in the grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 z-10 w-full order-2 md:order-none"
        >
          <div className="space-y-2 md:space-y-4">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-widest">
              New Arrival
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-md mx-auto">
              Level Up Your <span className="text-gradient">Gaming</span> Experience
            </h2>
            <p className="text-slate-400 max-w-sm mx-auto leading-relaxed text-sm md:text-base">
              From immersive sound to precise controls — everything you need to dominate.
            </p>
          </div>
          
          <button
            onClick={() => router.push('/product/67a1f5ef3f34a77b6dde9150')}
            className="group inline-flex items-center gap-3 px-8 py-3.5 md:py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all"
          >
            Shop Now
            <Image className="w-4 group-hover:translate-x-1 transition-transform invert" src={assets.arrow_icon} alt="arrow" />
          </button>
        </motion.div>

        {/* Right Section - Controllers */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center md:justify-end md:pr-12 w-full order-3 md:order-none"
        >
          <Image
            className="w-56 md:w-80 lg:w-96 drop-shadow-2xl object-contain transition-transform duration-500 hover:scale-110"
            src={assets.md_controller_image}
            alt="Controller"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Banner;