import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { currency, router } = useAppContext()

    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-2 w-full cursor-pointer group/card"
        >
            <div className="relative glass-card rounded-2xl w-full aspect-square flex items-center justify-center overflow-hidden transition-all duration-500 group-hover/card:shadow-orange-500/20 group-hover/card:border-primary/30">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover/card:scale-110 transition-transform duration-700 object-contain w-4/5 h-4/5 mix-blend-multiply dark:mix-blend-normal"
                    width={800}
                    height={800}
                />
                
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2.5 rounded-full shadow-sm border border-white/20 hover:bg-primary hover:text-white transition-colors"
                    >
                        <Image
                            className="h-3.5 w-3.5 dark:invert group-hover/card:invert-0 opacity-70 dark:opacity-100"
                            src={assets.heart_icon}
                            alt="heart_icon"
                        />
                    </motion.button>
                </div>

                {product.offerPrice < product.price && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        Sale
                    </div>
                )}
            </div>

            <div className="w-full space-y-1">
                <p className="text-sm font-semibold text-foreground/90 group-hover/card:text-primary transition-colors truncate">{product.name}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg font-bold text-primary">{currency}{product.offerPrice}</span>
                        {product.offerPrice < product.price && (
                            <span className="text-xs text-foreground/40 line-through font-medium">{currency}{product.price}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-0.5 bg-secondary/50 px-2 py-0.5 rounded-full">
                        <Image className="h-2.5 w-2.5" src={assets.star_icon} alt="star" />
                        <span className="text-[10px] font-bold">4.5</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard