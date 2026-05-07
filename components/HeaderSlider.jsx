"use client"
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const HeaderSlider = () => {
  const { router } = useAppContext();

  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
      productId: "67a1f52e3f34a77b6dde914a",
      color: "from-orange-500/20 to-amber-500/10"
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
      productId: "67a1f5ef3f34a77b6dde9150",
      color: "from-blue-500/20 to-indigo-500/10"
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
      productId: "67a1f7c93f34a77b6dde915a",
      color: "from-slate-500/20 to-slate-800/10"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  return (
    <div className="relative w-full h-[720px] md:h-[600px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] mt-6 shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-20 pt-16 pb-24 md:py-10 bg-gradient-to-br ${sliderData[currentSlide].color} glass-card border-none shadow-none`}
        >
          <div className="flex-1 space-y-6 z-10">
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-bold tracking-widest uppercase text-sm"
            >
              {sliderData[currentSlide].offer}
            </motion.p>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-6xl font-extrabold leading-tight"
            >
              {sliderData[currentSlide].title}
            </motion.h1>

            {/* Mobile Image - Shown between title and buttons */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="md:hidden flex justify-center items-center w-full py-4"
            >
              <Image
                className="w-56 object-contain drop-shadow-2xl"
                src={sliderData[currentSlide].imgSrc}
                alt="Slide image"
              />
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 pt-2"
            >
              <button
                onClick={() => router.push(`/product/${sliderData[currentSlide].productId}`)}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all"
              >
                {sliderData[currentSlide].buttonText1}
              </button>
              <button
                onClick={() => router.push('/all-products')}
                className="px-8 py-4 glass text-foreground font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 group"
              >
                {sliderData[currentSlide].buttonText2}
                <Image className="w-4 group-hover:translate-x-1 transition-transform dark:invert" src={assets.arrow_icon} alt="arrow" />
              </button>
            </motion.div>
          </div>

          {/* Desktop Image - Shown on the right */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="hidden md:flex flex-1 justify-center items-center"
          >
            <Image
              className="w-[450px] object-contain drop-shadow-2xl"
              src={sliderData[currentSlide].imgSrc}
              alt="Slide image"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index ? "w-10 bg-primary" : "w-2.5 bg-foreground/20"
            } h-2.5 rounded-full`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
