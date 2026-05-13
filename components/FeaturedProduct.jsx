"use client"
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
    productId: "69ff480e697b4a45908d1e16",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
    productId: "69ff4644697b4a45908d1e15",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
    productId: "6a000c00282bb0bc8ad8f6b0",
  },
];

const FeaturedProduct = () => {
  const { router } = useAppContext();

  return (
    <section className="mt-14">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-foreground tracking-tight">Curated <span className="text-primary">Collections</span></h2>
        <div className="w-20 h-1.5 bg-primary mt-4 rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 md:px-0 px-4">
        {products.map(({ id, image, title, description, productId }, index) => (
          <motion.div 
            key={id} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group overflow-hidden rounded-[2rem] cursor-pointer"
            onClick={() => router.push(`/product/${productId}`)}
          >
            <div className="relative h-[450px] w-full overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="group-hover:scale-110 group-hover:brightness-75 transition-all duration-700 object-cover"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-extrabold text-2xl text-white mb-2">{title}</h3>
              <p className="text-white/70 text-sm mb-6 max-w-[250px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {description}
              </p>
              <button
                className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-xl"
              >
                Discover Now
                <Image className="h-3 w-3 dark:invert group-hover:invert-0" src={assets.redirect_icon} alt="icon" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;

