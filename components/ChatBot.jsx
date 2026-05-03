"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { MessageCircle, Bot, X, Minus, Send, Smile } from "lucide-react";
import Image from "next/image";

const ChatBot = () => {
    const context = useAppContext();

    // If context is not available yet, don't render the chatbot to prevent crashes
    if (!context) {
        return null;
    }

    const { products, currency, router } = context;
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hi there! 👋 I'm ByteBot, your personal shopping assistant. I can help you find products, track orders, or show you our latest 40% OFF deals! How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const quickActionsRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
        setInput("");
        setIsTyping(true);

        // Simulate AI Thinking
        setTimeout(() => {
            const botResponse = generateResponse(userMessage);
            setMessages(prev => [...prev, { role: "bot", ...botResponse }]);
            setIsTyping(false);
        }, 1000);
    };

    const generateResponse = (query) => {
        const q = query.toLowerCase().trim();

        // 1. Specific Promotion Checks (As requested by user)
        if (q.includes("deal") || q.includes("offer") || q.includes("sale") || q.includes("best deals")) {
            const promoProducts = products.filter(p => 
                p.name.toLowerCase().includes("macbook") || 
                p.name.toLowerCase().includes("bose")
            ).slice(0, 3);

            return {
                text: "We have some amazing deals right now! 🔥\n\n• 40% OFF on MacBook Pro 16\n• 30% OFF on Bose QuietComfort Headphones\n\nCheck these out:",
                products: promoProducts.length > 0 ? promoProducts : products.filter(p => p.offerPrice < p.price).slice(0, 3)
            };
        }

        // 2. Earphones / Audio Category Check
        if (q.includes("earphone") || q.includes("headphone") || q.includes("airpod") || q.includes("buds") || q.includes("audio")) {
            const audioProducts = products.filter(p => 
                p.category.toLowerCase().includes("earphone") || 
                p.category.toLowerCase().includes("headphone") ||
                p.name.toLowerCase().includes("airpod") ||
                p.name.toLowerCase().includes("buds")
            ).slice(0, 4);

            if (audioProducts.length > 0) {
                return {
                    text: "We have a great selection of audio gear! Whether you're looking for Apple AirPods, Samsung Buds, or premium Sony/Bose headphones, we've got you covered:",
                    products: audioProducts
                };
            }
        }

        // 3. Laptop / Computer Check
        if (q.includes("laptop") || q.includes("macbook") || q.includes("computer") || q.includes("asus") || q.includes("rog")) {
             const laptops = products.filter(p => 
                p.category.toLowerCase().includes("laptop") || 
                p.name.toLowerCase().includes("macbook") ||
                p.name.toLowerCase().includes("asus")
            ).slice(0, 3);

            if (laptops.length > 0) {
                return {
                    text: "Looking for a new laptop? We have the latest MacBook Pro and high-performance gaming laptops like the ASUS ROG series:",
                    products: laptops
                };
            }
        }

        // 4. Watch / Smartwatch Check
        if (q.includes("watch") || q.includes("smartwatch") || q.includes("garmin") || q.includes("ultra")) {
            const watches = products.filter(p => 
                p.category.toLowerCase().includes("watch") || 
                p.name.toLowerCase().includes("watch")
            ).slice(0, 3);

            if (watches.length > 0) {
                return {
                    text: "Looking for a smartwatch? We have everything from high-performance Garmin watches to the Apple Watch Ultra:",
                    products: watches
                };
            }
        }

        // 5. Keyboard / Mouse / PC Accessories Check
        if (q.includes("keyboard") || q.includes("mouse") || q.includes("logitech") || q.includes("razer")) {
            const peripherals = products.filter(p => 
                p.category.toLowerCase().includes("keyboard") || 
                p.category.toLowerCase().includes("mouse") ||
                p.name.toLowerCase().includes("keyboard") ||
                p.name.toLowerCase().includes("mouse")
            ).slice(0, 4);

            if (peripherals.length > 0) {
                return {
                    text: "Upgrade your setup with our premium peripherals! We have high-performance gaming keyboards and mice from Razer, Logitech, and more:",
                    products: peripherals
                };
            }
        }

        // 6. Generic Product Search (More Robust)
        const cleanQuery = q.replace(/find|search|show me|looking for|buy|want to|me|some|any|a|the/g, "").trim();
        if (cleanQuery.length > 1) {
            const terms = cleanQuery.split(/\s+/).filter(t => t.length > 2);
            const foundProducts = products.filter(p => {
                const name = p.name.toLowerCase();
                const category = p.category.toLowerCase();
                const brand = p.brand?.toLowerCase() || "";
                
                // If it's a direct match with category or name
                if (name.includes(cleanQuery) || category.includes(cleanQuery) || cleanQuery.includes(category)) return true;
                
                // If any significant term matches
                return terms.some(term => name.includes(term) || brand.includes(term) || category.includes(term));
            }).slice(0, 4);

            if (foundProducts.length > 0) {
                return {
                    text: `I found these products for you:`,
                    products: foundProducts
                };
            }
        }

        // 7. Shipping/Delivery
        if (q.includes("shipping") || q.includes("delivery") || q.includes("arrive") || q.includes("track")) {
            return { text: "We offer fast worldwide shipping! Most orders arrive within 3-5 business days. You can track your order in the 'My Orders' section after logging in." };
        }

        // 8. Returns/Refunds
        if (q.includes("return") || q.includes("refund") || q.includes("exchange")) {
            return { text: "We have a 30-day hassle-free return policy. If you're not satisfied, you can initiate a return from your dashboard." };
        }

        // 9. Greetings
        if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("morning") || q.includes("evening")) {
            return { text: "Hello! 👋 I'm ByteBot. I can help you find the best tech deals, track your order, or answer questions about our products. What can I do for you today?" };
        }

        // Default
        return { text: "I'm not sure I understand exactly. I can help you find products (like 'earphones' or 'laptops'), check shipping times, or show you our best deals. What would you like to know?" };
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - quickActionsRef.current.offsetLeft);
        setScrollLeft(quickActionsRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - quickActionsRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast factor
        quickActionsRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleWheel = (e) => {
        if (quickActionsRef.current) {
            // Scroll horizontally
            quickActionsRef.current.scrollLeft += e.deltaY;
        }
    };

    const handleQuickAction = (action) => {
        const userMessage = action;
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
        setIsTyping(true);
        setTimeout(() => {
            const botResponse = generateResponse(userMessage);
            setMessages(prev => [...prev, { role: "bot", ...botResponse }]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans">
            {/* Chat Bubble */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="group relative w-14 h-14 bg-gradient-to-tr from-primary to-orange-500 text-white rounded-full shadow-[0_8px_30px_rgb(255,165,0,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden"
                >
                    {/* Animated background flare */}
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    
                    <MessageCircle className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    
                    {/* Pulsing online indicator */}
                    <span className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm">
                        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                    </span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-[350px] md:w-[400px] h-[500px] md:h-[600px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-orange-600 p-5 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight">ByteBot AI</h3>
                                <p className="text-xs text-white/70 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online • Always here to help
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <Minus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-800/30">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                    msg.role === "user" 
                                    ? "bg-primary text-white rounded-tr-none shadow-md shadow-primary/10" 
                                    : "bg-white dark:bg-gray-800 text-foreground rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm"
                                }`}>
                                    <p className="leading-relaxed">{msg.text}</p>
                                    
                                    {/* Product Suggestions */}
                                    {msg.products && (
                                        <div className="mt-3 space-y-2">
                                            {msg.products.map(p => (
                                                <div 
                                                    key={p._id} 
                                                    onClick={() => {
                                                        router.push(`/product/${p._id}`);
                                                        setIsOpen(false);
                                                    }}
                                                    className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-100 dark:border-gray-600"
                                                >
                                                    <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0">
                                                        <Image src={p.image[0]} alt={p.name} fill className="object-cover" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-xs truncate">{p.name}</p>
                                                        <p className="text-primary text-xs font-bold">{currency}{p.offerPrice || p.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => {
                                                    router.push('/all-products');
                                                    setIsOpen(false);
                                                }}
                                                className="w-full text-center text-xs text-primary font-bold hover:underline py-1 mt-2 cursor-pointer"
                                            >
                                                View all products
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div 
                        ref={quickActionsRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onWheel={handleWheel}
                        className={`px-4 py-4 flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shrink-0 select-none touch-pan-x overscroll-contain ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                    >
                        {["Best Deals 🔥", "Earphones", "MacBook Pro", "Smartwatches", "Track Order", "Shipping Info", "Returns"].map(action => (
                            <button 
                                key={action}
                                onClick={() => handleQuickAction(action)}
                                className="flex items-center justify-center h-9 text-[10px] md:text-xs px-4 bg-gray-50 dark:bg-gray-800 hover:bg-primary hover:text-white rounded-xl transition-all border border-gray-200 dark:border-gray-700 font-medium shrink-0 shadow-sm active:scale-95"
                            >
                                {action}
                            </button>
                        ))}
                        <div className="min-w-[20px] h-1 shrink-0"></div> {/* Spacer to prevent clipping at the end */}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-900 flex items-center gap-2 border-t border-gray-100 dark:border-gray-800 shrink-0">
                        <div className="relative flex-grow">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask ByteBot anything..."
                                className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                            <Smile className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-primary transition-colors" />
                        </div>
                        <button 
                            type="submit"
                            disabled={!input.trim()}
                            className="w-11 h-11 bg-gradient-to-tr from-primary to-orange-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shrink-0"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
