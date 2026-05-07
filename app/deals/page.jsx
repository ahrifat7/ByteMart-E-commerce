'use client'
import React, { useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';
import { Tag, Sparkles, Clock } from 'lucide-react';

const DealsPage = () => {
  const { products } = useAppContext();

  const discountedProducts = useMemo(() => {
    return products.filter(product => product.offerPrice < product.price);
  }, [products]);

  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-28 pb-20 px-6 md:px-16 lg:px-32 min-h-screen"
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-amber-500 text-white p-8 md:p-16 mb-12 shadow-2xl shadow-orange-500/20">
          <div className="relative z-10 max-w-2xl">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 mb-4"
            >
              <Tag className="w-5 h-5" />
              <span className="font-bold uppercase tracking-widest text-sm">Exclusive Deals</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Unbeatable <span className="text-black/20">Savings</span> Just for You
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 mb-8"
            >
              Explore our best offers on top-rated electronics, gadgets, and more. Don't miss out!
            </motion.p>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-black/30" />
                <span className="font-medium">Ends in: 2d 14h 30m</span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-black/30" />
                <span className="font-medium">Up to 70% Off</span>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-150">
              <path fill="#FFF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C86.9,14.5,81.2,28.9,72.4,41.4C63.6,53.9,51.8,64.4,38.3,71.5C24.8,78.6,9.6,82.3,-5.1,81.1C-19.8,79.9,-33.9,73.8,-46.5,65.1C-59.1,56.4,-70.2,45.1,-76.8,31.7C-83.3,18.3,-85.4,2.8,-82.7,-11.5C-80,-25.9,-72.5,-39.1,-62.1,-50.2C-51.7,-61.2,-38.4,-70.2,-24.8,-77C-11.2,-83.8,2.7,-88.4,16.5,-85.6C30.3,-82.8,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Today's <span className="text-primary">Flash Sales</span></h2>
            <div className="flex gap-2">
               {/* Filters could go here */}
            </div>
          </div>

          {discountedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
              {discountedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-card rounded-3xl">
              <Tag className="w-16 h-16 text-foreground/10 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No active deals right now</h3>
              <p className="text-foreground/50">Check back later for fresh offers!</p>
            </div>
          )}
        </div>
      </motion.main>
      <Footer />
    </>
  );
};

export default DealsPage;
