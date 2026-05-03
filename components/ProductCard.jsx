import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer group/card"
        >
            <div className="cursor-pointer relative bg-gray-50 dark:bg-[#18181b] border border-gray-100 dark:border-white/10 rounded-2xl w-full h-52 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover/card:shadow-2xl group-hover/card:shadow-orange-500/10 dark:group-hover/card:border-orange-500/20">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover/card:scale-110 transition-all duration-500 object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal [mask-image:radial-gradient(circle,white_65%,transparent_100%)]"
                    width={800}
                    height={800}
                />
                <button className="absolute top-2 right-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-600 hover:scale-110 transition-transform">
                    <Image
                        className="h-3 w-3 dark:invert opacity-70 dark:opacity-100"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate text-foreground">{product.name}</p>
            <p className="w-full text-xs text-gray-600 dark:text-gray-400 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium text-foreground">{currency}{product.offerPrice}</p>
                <button className="max-sm:hidden px-4 py-1.5 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-full text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Buy now
                </button>
            </div>
        </div>
    )
}

export default ProductCard