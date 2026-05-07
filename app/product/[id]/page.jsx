"use client"
import { useEffect, useState, useRef, useMemo } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Product = () => {

    const { id } = useParams();

    const { products, router, addToCart } = useAppContext()

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length])

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const featuredProducts = useMemo(() => {
        const firstFive = products.slice(0, 5);
        const lastFive = products.length > 5 ? products.slice(-5) : [];
        return [...new Set([...firstFive, ...lastFive])];
    }, [products]);

    return productData ? (<>
        <Navbar />
        <div className="px-6 md:px-16 lg:px-32 pt-28 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-3xl overflow-hidden bg-gray-50 dark:bg-[#18181b] mb-4 flex justify-center items-center shadow-lg transition-all duration-500 hover:scale-[1.02] dark:border dark:border-white/10 relative">
                        <Image
                            src={mainImage || productData.image[0]}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply dark:mix-blend-normal [mask-image:radial-gradient(circle,white_70%,transparent_100%)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productData.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className="cursor-pointer rounded-xl overflow-hidden bg-gray-50 dark:bg-[#18181b] flex justify-center items-center shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 border-2 border-transparent hover:scale-105 dark:border-white/10"
                            >
                                <Image
                                    src={image}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply dark:mix-blend-normal [mask-image:radial-gradient(circle,white_65%,transparent_100%)]"
                                    width={1280}
                                    height={720}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-800 dark:text-gray-100 mb-4">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">(4.5)</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6 text-foreground">
                        ${productData.offerPrice}
                        <span className="text-base font-normal text-gray-500 dark:text-gray-400 line-through ml-2">
                            ${productData.price}
                        </span>
                    </p>
                    <hr className="border-t border-gray-300 dark:border-gray-700 my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 dark:text-gray-400 font-medium py-1">Brand</td>
                                    <td className="text-gray-800 dark:text-gray-300 py-1">
                                        {productData.brand || "Generic"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 dark:text-gray-400 font-medium py-1">Color</td>
                                    <td className="text-gray-800 dark:text-gray-300 py-1">Multi</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 dark:text-gray-400 font-medium py-1">Category</td>
                                    <td className="text-gray-800 dark:text-gray-300 py-1">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center mt-10 gap-4">
                        <button onClick={() => addToCart(productData._id)} className="w-full py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-sm hover:shadow">
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(productData._id); router.push('/cart') }} className="w-full py-3.5 bg-primary text-white hover:bg-orange-600 transition shadow-sm hover:shadow">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium text-foreground">Featured <span className="font-medium text-primary">Products</span></p>
                    <div className="w-28 h-0.5 bg-primary mt-2"></div>
                </div>
                <div className="relative w-full group px-4 md:px-0">
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity active:scale-95 flex items-center justify-center text-primary"
                    >
                        <FaChevronLeft size={16} />
                    </button>
                    
                    <div 
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8"
                    >
                        {featuredProducts.map((product, index) => (
                            <div key={index} className="w-44 sm:w-56 md:w-68 shrink-0">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => scroll('right')}
                        className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity active:scale-95 flex items-center justify-center text-primary"
                    >
                        <FaChevronRight size={16} />
                    </button>
                </div>
                <button onClick={() => router.push('/all-products')} className="px-8 py-2 mb-16 border border-gray-300 dark:border-gray-700 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    See more
                </button>
            </div>
        </div>
        <Footer />
    </>
    ) : <Loading />
};

export default Product;