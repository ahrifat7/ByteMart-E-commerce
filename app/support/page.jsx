'use client'
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { helpCategories } from '@/lib/help-data';
import { ChevronDown, Search, Mail, Phone, MessageSquare, Package, RefreshCw, CreditCard, Store, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const iconMap = {
  Package: Package,
  RefreshCw: RefreshCw,
  CreditCard: CreditCard,
  Store: Store
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors group"
      >
        <span className="text-lg font-semibold">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-foreground/40'}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-foreground/70 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'My Orders' section. Once your order is shipped, you'll receive a tracking number via email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. The product must be in its original packaging and unused."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, ByteMart currently ships to over 50 countries. Shipping rates and delivery times vary by location."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              How can we <span className="text-primary">help you today?</span>
            </h1>
            <div className="relative max-w-2xl mx-auto group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search for articles, guides..."
                className="w-full h-16 pl-16 pr-6 bg-white dark:bg-gray-900 border border-border rounded-2xl shadow-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </section>

        <main className="max-w-7xl mx-auto px-6 pb-32">
          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {helpCategories.map((category, index) => {
              const Icon = iconMap[category.icon];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-8 rounded-3xl hover:border-primary/30 transition-all group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm text-foreground/60 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-3">
                    {category.articles.slice(0, 2).map(articleSlug => (
                      <li key={articleSlug}>
                        <Link 
                          href={`/support/articles/${articleSlug}`}
                          className="text-sm font-medium text-primary hover:underline flex items-center"
                        >
                          {articleSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
              <div className="glass-card p-8 rounded-3xl">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Email Us</h4>
                      <p className="text-sm text-foreground/60">Response within 24h</p>
                      <a href="mailto:ahrifat141@gmail.com" className="text-primary font-semibold hover:underline mt-1 block">ahrifat141@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Call Us</h4>
                      <p className="text-sm text-foreground/60">Mon-Fri, 9am - 6pm EST</p>
                      <a href="tel:+8801602541452" className="text-primary font-semibold hover:underline mt-1 block">+880 1602 541 452</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Live Chat</h4>
                      <p className="text-sm text-foreground/60">Available 24/7</p>
                      <a 
                        href="https://wa.me/8801602541452" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary font-semibold hover:underline mt-1 block"
                      >
                        Start Chatting Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="glass-card p-8 rounded-3xl">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} {...faq} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SupportPage;
