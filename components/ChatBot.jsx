"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { MessageCircle, Bot, X, Send, Smile, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotResponses } from "@/lib/help-data";

const ChatBot = () => {
    const context = useAppContext();

    if (!context) {
        return null;
    }

    const { products, currency, router } = context;
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: chatbotResponses.greetings[0] }
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

        setTimeout(() => {
            const botResponse = generateResponse(userMessage);
            setMessages(prev => [...prev, { role: "bot", ...botResponse }]);
            setIsTyping(false);
        }, 1000);
    };

    const generateResponse = (query) => {
        const q = query.toLowerCase().trim();

        // Check structured help topics
        for (const topic of chatbotResponses.topics) {
            if (topic.keywords.some(keyword => q.includes(keyword))) {
                return { text: topic.response };
            }
        }

        // Support / Help Center
        if (q.includes("support") || q.includes("help") || q.includes("documentation") || q.includes("guide")) {
            return { 
                text: "You can find all our guides and documentation in the Help Center. Would you like to go there?",
                action: { label: "Visit Help Center", path: "/support" }
            };
        }

        // CEO / Founder Info
        if (q.includes("ceo") || q.includes("founder") || q.includes("owner") || q.includes("who started") || q.includes("halim")) {
            return { 
                text: "ByteMart was founded by Md. Abdul Halim, a visionary leader and technology enthusiast. He started the company with a mission to make cutting-edge technology accessible to everyone! 🚀" 
            };
        }

        // Contact Info
        if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("call") || q.includes("address") || q.includes("location") || q.includes("reach") || q.includes("whatsapp")) {
            return { 
                text: "You can reach us through multiple channels:\n\n📧 Email: ahrifat141@gmail.com\n📞 Phone: +880 1602 541 452\n💬 WhatsApp: +880 1602 541 452\n📍 Location: Dhaka, Bangladesh\n\nOr use our Contact Us page for a direct message!" 
            };
        }

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

        const cleanQuery = q.replace(/find|search|show me|looking for|buy|want to|me|some|any|a|the/g, "").trim();
        if (cleanQuery.length > 1) {
            const terms = cleanQuery.split(/\s+/).filter(t => t.length > 2);
            const foundProducts = products.filter(p => {
                const name = p.name.toLowerCase();
                const category = p.category.toLowerCase();
                const brand = p.brand?.toLowerCase() || "";
                
                if (name.includes(cleanQuery) || category.includes(cleanQuery) || cleanQuery.includes(category)) return true;
                return terms.some(term => name.includes(term) || brand.includes(term) || category.includes(term));
            }).slice(0, 4);

            if (foundProducts.length > 0) {
                return {
                    text: `I found these products for you:`,
                    products: foundProducts
                };
            }
        }

        if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
            return { text: "Hello! 👋 I'm ByteBot. I can help you find the best tech deals, track your order, or answer questions. What can I do for you?" };
        }

        return { text: chatbotResponses.fallback };
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - quickActionsRef.current.offsetLeft);
        setScrollLeft(quickActionsRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - quickActionsRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        quickActionsRef.current.scrollLeft = scrollLeft - walk;
    };

    useEffect(() => {
        const el = quickActionsRef.current;
        if (el && isOpen) {
            const onWheel = (e) => {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    el.scrollLeft += e.deltaY;
                }
            };
            el.addEventListener("wheel", onWheel, { passive: false });
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, [isOpen]);

    const handleQuickAction = (action) => {
        setMessages(prev => [...prev, { role: "user", text: action }]);
        setIsTyping(true);
        setTimeout(() => {
            const botResponse = generateResponse(action);
            setMessages(prev => [...prev, { role: "bot", ...botResponse }]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[9999] font-sans">
            <AnimatePresence>
                {!isOpen ? (
                    <motion.button 
                        key="bubble"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                            scale: 1, 
                            opacity: 1,
                            y: [0, -10, 0]
                        }}
                        transition={{
                            y: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            scale: { duration: 0.2 },
                            opacity: { duration: 0.2 }
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
                    >
                        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm">
                            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                        </span>
                    </motion.button>
                ) : (
                    <motion.div 
                        key="window"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="w-[320px] md:w-[350px] h-[500px] md:h-[580px] glass shadow-2xl rounded-[2rem] flex flex-col overflow-hidden border border-white/20 relative"
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md border-b border-white/10 shrink-0 z-[110]">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-primary/20 text-primary rounded-xl flex items-center justify-center border border-primary/30">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-tight text-white">ByteBot AI</h3>
                                    <p className="text-[9px] text-white/50 flex items-center gap-1 font-medium uppercase tracking-wider">
                                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-500 rounded-lg transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto px-6 space-y-6 pb-4 relative pt-6">
                            {messages.map((msg, idx) => (
                                <motion.div 
                                    key={idx} 
                                    initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                                        msg.role === "user" 
                                        ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10" 
                                        : "glass-card rounded-tl-none border border-white/10"
                                    }`}>
                                        <p>{msg.text}</p>
                                        
                                        {msg.action && (
                                            <button 
                                                onClick={() => {
                                                    router.push(msg.action.path);
                                                    setIsOpen(false);
                                                }}
                                                className="mt-3 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                            >
                                                {msg.action.label}
                                                <ArrowRight className="w-3 h-3" />
                                            </button>
                                        )}

                                        {msg.products && (
                                            <div className="mt-4 space-y-3">
                                                {msg.products.map(p => (
                                                    <div 
                                                        key={p._id} 
                                                        onClick={() => {
                                                            router.push(`/product/${p._id}`);
                                                            setIsOpen(false);
                                                        }}
                                                        className="flex items-center gap-3 p-2.5 bg-white/10 rounded-2xl cursor-pointer hover:bg-white/20 transition-all border border-white/5"
                                                    >
                                                        <div className="w-12 h-12 relative rounded-xl overflow-hidden shrink-0 bg-white">
                                                            <Image src={p.image[0]} alt={p.name} fill className="object-contain p-1" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-[11px] truncate">{p.name}</p>
                                                            <p className="text-primary text-xs font-black">{currency}{p.offerPrice || p.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button 
                                                    onClick={() => {
                                                        router.push('/all-products');
                                                        setIsOpen(false);
                                                    }}
                                                    className="w-full text-center text-xs text-primary font-bold hover:underline pt-2"
                                                >
                                                    Explore all products →
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="glass-card p-4 rounded-3xl rounded-tl-none flex gap-1.5">
                                        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.div>
                                        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.div>
                                        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.div>
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
                            className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap bg-foreground/5 shrink-0 select-none cursor-grab active:cursor-grabbing"
                        >
                            {["Best Deals 🔥", "Earphones", "MacBook Pro", "Smartwatches", "Track Order", "Support"].map(action => (
                                <button 
                                    key={action}
                                    onClick={() => handleQuickAction(action)}
                                    className="h-10 px-4 glass text-xs font-bold rounded-2xl hover:bg-primary hover:text-white transition-all border border-white/10"
                                >
                                    {action}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-transparent">
                            <form onSubmit={handleSend} className="relative flex items-center gap-3">
                                <div className="relative flex-grow">
                                    <input 
                                        type="text" 
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full pl-5 pr-10 py-3 bg-foreground/5 border border-white/10 rounded-2xl text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                    <Smile className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 cursor-pointer hover:text-primary" />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all shrink-0"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;

