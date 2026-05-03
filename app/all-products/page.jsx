'use client'
import React, { useState, useEffect, useMemo, useDeferredValue } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const AllProducts = () => {
    const { products } = useAppContext();
    
    // State for filters
    const [search, setSearch] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [sortType, setSortType] = useState("relevant");
    const [priceRange, setPriceRange] = useState(5000); // Default max price

    // Deferred value for smoother slider performance
    const deferredPriceRange = useDeferredValue(priceRange);

    // State for dropdowns
    const [openCategory, setOpenCategory] = useState(true);
    const [openBrand, setOpenBrand] = useState(true);

    // Derived unique categories and brands
    const categories = useMemo(() => {
        return [...new Set(products.map(p => p.category))];
    }, [products]);

    const brands = useMemo(() => {
        return [...new Set(products.map(p => p.brand))];
    }, [products]);

    const maxProductPrice = useMemo(() => {
        if (products.length === 0) return 1000;
        return Math.ceil(Math.max(...products.map(p => p.offerPrice || p.price)));
    }, [products]);

    useEffect(() => {
        if (maxProductPrice > 0) {
            setPriceRange(maxProductPrice);
        }
    }, [maxProductPrice]);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    }

    const toggleBrand = (e) => {
        if (brand.includes(e.target.value)) {
            setBrand(prev => prev.filter(item => item !== e.target.value));
        } else {
            setBrand(prev => [...prev, e.target.value]);
        }
    }

    const filteredProducts = useMemo(() => {
        let temp = [...products];

        if (search) {
            const searchLower = search.toLowerCase();
            temp = temp.filter(p => 
                p.name.toLowerCase().includes(searchLower) || 
                p.category.toLowerCase().includes(searchLower) ||
                (p.brand && p.brand.toLowerCase().includes(searchLower))
            );
        }

        if (category.length > 0) {
            temp = temp.filter(p => category.includes(p.category));
        }

        if (brand.length > 0) {
            temp = temp.filter(p => brand.includes(p.brand));
        }

        // Use deferredPriceRange here for better performance
        temp = temp.filter(p => (p.offerPrice || p.price) <= deferredPriceRange);

        switch (sortType) {
            case 'low-high':
                return temp.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
            case 'high-low':
                return temp.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
            default:
                return temp;
        }
    }, [products, search, category, brand, deferredPriceRange, sortType]);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            
            <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-16 py-10">
                
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Explore Our Collection</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Discover premium products tailored for you</p>
                    </div>

                    <div className="relative group max-w-md w-full">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Filters Sidebar */}
                    <aside className={`lg:w-64 shrink-0 transition-all duration-300 ${showFilter ? 'block' : 'hidden lg:block'}`}>
                        <div className="sticky top-24 space-y-8">
                            
                            {/* Mobile Close Button */}
                            <div className="flex items-center justify-between lg:hidden mb-4">
                                <h2 className="text-xl font-bold">Filters</h2>
                                <button onClick={() => setShowFilter(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Price Range - MOVED TO TOP */}
                            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                <p className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-5">Price Range</p>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max={maxProductPrice} 
                                    value={priceRange} 
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between mt-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    <span>$0</span>
                                    <span className="text-primary font-bold">${priceRange}</span>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                                <button 
                                    onClick={() => setOpenCategory(!openCategory)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <p className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Categories</p>
                                    {openCategory ? <FaChevronUp className="text-xs text-gray-400" /> : <FaChevronDown className="text-xs text-gray-400" />}
                                </button>
                                {openCategory && (
                                    <div className="px-6 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
                                        {categories.map((cat) => (
                                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                                <input 
                                                    type="checkbox" 
                                                    value={cat} 
                                                    onChange={toggleCategory}
                                                    checked={category.includes(cat)}
                                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer transition-all"
                                                />
                                                <span className="text-gray-600 dark:text-gray-400 group-hover:text-foreground transition-colors">{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Brands */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                                <button 
                                    onClick={() => setOpenBrand(!openBrand)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <p className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Brands</p>
                                    {openBrand ? <FaChevronUp className="text-xs text-gray-400" /> : <FaChevronDown className="text-xs text-gray-400" />}
                                </button>
                                {openBrand && (
                                    <div className="px-6 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
                                        {brands.map((b) => (
                                            <label key={b} className="flex items-center gap-3 cursor-pointer group">
                                                <input 
                                                    type="checkbox" 
                                                    value={b} 
                                                    onChange={toggleBrand}
                                                    checked={brand.includes(b)}
                                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer transition-all"
                                                />
                                                <span className="text-gray-600 dark:text-gray-400 group-hover:text-foreground transition-colors">{b}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Product Listing */}
                    <div className="flex-grow">
                        
                        {/* Sort & Mobile Filter Toggle */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setShowFilter(!showFilter)} 
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-medium shadow-sm active:scale-95 transition-all"
                                >
                                    <FaFilter className="text-xs" /> Filters
                                </button>
                                <p className="hidden sm:block text-gray-600 dark:text-gray-400">
                                    Showing <span className="text-foreground font-bold">{filteredProducts.length}</span> products
                                </p>
                            </div>

                            <select 
                                onChange={(e) => setSortType(e.target.value)}
                                className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm cursor-pointer"
                            >
                                <option value="relevant">Sort by: Relevant</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                            </select>
                        </div>

                        {/* Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
                                {filteredProducts.map((product) => (
                                    <div key={product._id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                                    <FaSearch className="text-3xl text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No products found</h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                                    We couldn't find anything matching your filters. Try adjusting your search or filters.
                                </p>
                                <button 
                                    onClick={() => {
                                        setSearch("");
                                        setCategory([]);
                                        setBrand([]);
                                        setPriceRange(maxProductPrice);
                                    }}
                                    className="mt-6 text-primary font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllProducts;


