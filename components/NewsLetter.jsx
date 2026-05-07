"use client"
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

const NewsLetter = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyo3EoYaFP6b0gJtXZu1sIRbD8ca13OHp8QzToEz60WAvk2tE6OFFQF2GoSNG-tt1Ii/exec';
    const form = e.target;

    try {
      const response = await fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form) 
      });

      if (response.ok) {
        toast.success("Subscribed successfully!");
        form.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error('Error!', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-background via-background/80 to-background border border-border/50 shadow-2xl p-8 md:p-14 mb-10"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-1 shadow-inner border border-primary/20"
        >
          <Mail className="w-7 h-7 text-primary" />
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">20% Off</span> Your First Order
        </h2>
        <p className="text-foreground/60 max-w-md text-sm md:text-base leading-relaxed">
          Join our newsletter for exclusive deals, product launches, and the latest tech trends — straight to your inbox.
        </p>

        <form 
          onSubmit={onSubmit}
          className="flex items-center w-full max-w-md mt-6 bg-background/60 backdrop-blur-xl border border-border/60 rounded-full overflow-hidden shadow-lg shadow-black/5 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/50 transition-all duration-300 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <input
            name="Email"
            className="bg-transparent outline-none flex-1 px-6 py-3.5 text-foreground placeholder-foreground/40 text-sm font-medium z-10 w-full"
            type="email"
            required
            placeholder="Enter your email address"
          />
          <button 
            type="submit"
            disabled={loading}
            className={`px-6 py-3.5 m-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-full flex items-center gap-2 transition-all shadow-md z-10 ${loading ? 'opacity-70 scale-95' : 'hover:scale-[1.02] active:scale-95'}`}
          >
            {loading ? (
              <span className="text-xs">Joining...</span>
            ) : (
              <>
                <span className="hidden md:inline">Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-foreground/40 font-medium">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </motion.section>
  );
};

export default NewsLetter;

