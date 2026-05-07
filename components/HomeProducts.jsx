"use client"
import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-10"
      >
        <div>
          <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Trending Now</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Popular Products</h2>
        </div>
        <button 
          onClick={() => router.push('/all-products')}
          className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all group"
        >
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8"
      >
        {products.slice(0, 10).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12"
      >
        <button 
          onClick={() => router.push('/all-products')} 
          className="group flex items-center gap-3 px-10 py-4 bg-foreground/5 hover:bg-primary hover:text-white rounded-2xl font-bold transition-all duration-300 border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95"
        >
          Explore All Products
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};

export default HomeProducts;

