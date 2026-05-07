"use client"
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { Shield, Truck, RotateCcw, Headphones, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const trustBadges = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over $100", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  { icon: Shield, label: "Secure Payment", desc: "100% protected", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/20" },
  { icon: RotateCcw, label: "Easy Returns", desc: "30-day guarantee", color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/20" },
  { icon: Headphones, label: "24/7 Support", desc: "Always available", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">

      {/* ── SECTION 1: Trust Badges — light warm gradient ── */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-800 border-y border-orange-100 dark:border-white/5">
        <div className="px-6 md:px-16 lg:px-32 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-3 p-3 rounded-2xl ${badge.bg} border ${badge.border} hover:scale-[1.03] transition-transform duration-300`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                  <badge.icon className={`w-5 h-5 md:w-6 md:h-6 ${badge.color}`} />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-white tracking-tight">{badge.label}</p>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Main Footer Body — deep dark blue ── */}
      <div className="bg-[#0a0f1e] text-slate-400 relative z-0">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="px-6 md:px-16 lg:px-32 py-8 md:py-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Image className="w-24 md:w-28 brightness-0 invert mb-3 opacity-90" src={assets.logo} alt="logo" />
              <p className="text-xs leading-relaxed mb-4 max-w-xs text-slate-400">
                ByteMart is your ultimate destination for premium electronics. Delivering quality and exceptional service worldwide.
              </p>
              <div className="flex gap-2.5">
                {[
                  { icon: FaFacebook, href: "https://www.facebook.com/rifatnotfound7", hoverBg: "hover:bg-blue-600" },
                  { icon: FaGithub, href: "https://github.com/ahrifat7", hoverBg: "hover:bg-slate-600" },
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/abdul-halim-bd/", hoverBg: "hover:bg-sky-700" },
                  { icon: FaInstagram, href: "https://www.instagram.com/md.abdul.halim7/", hoverBg: "hover:bg-pink-600" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 ${social.hoverBg} hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 text-slate-400`}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-3.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                Explore
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  { name: "Home", path: "/" },
                  { name: "All Products", path: "/all-products" },
                  { name: "Deals & Offers", path: "/deals" },
                  { name: "About Us", path: "/about-us" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="hover:text-emerald-400 hover:translate-x-1.5 inline-block transition-all duration-300 text-slate-400">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-3.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-violet-400 rounded-full" />
                Customer Care
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  { name: "Help & Support", path: "/support" },
                  { name: "Contact Us", path: "/contact-us" },
                  { name: "Privacy Policy", path: "/privacy-policy" },
                  { name: "My Orders", path: "/my-orders" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="hover:text-violet-400 hover:translate-x-1.5 inline-block transition-all duration-300 text-slate-400">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="hidden lg:flex flex-col col-span-2 lg:col-span-1">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-3.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-sky-400 rounded-full" />
                Get in Touch
              </h3>
              <div className="space-y-3">
                <a href="mailto:ahrifat141@gmail.com" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-sky-400/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-sky-400/20 transition-colors">
                    <Mail className="w-4 h-4 text-sky-400" />
                  </div>
                  <span className="text-sm group-hover:text-sky-400 transition-colors">ahrifat141@gmail.com</span>
                </a>
                <a href="tel:+8801602541452" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-emerald-400/20 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm group-hover:text-emerald-400 transition-colors">+880 1602 541 452</span>
                </a>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-amber-400/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-sm">Jamuna Future Park, Dhaka</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Bottom Bar — distinct rich gradient ── */}
      <div className="bg-gradient-to-r from-[#0c0118] via-[#0d0a1f] to-[#0c0118] border-t border-violet-500/10 px-6 md:px-16 lg:px-32 py-3.5 relative">
        {/* subtle shine line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] md:text-xs text-slate-500 text-center md:text-left">
            © 2026 <span className="text-slate-300 font-semibold">ByteMart</span>. All Rights Reserved.
          </p>
          <p className="text-[11px] md:text-xs text-slate-500 flex items-center gap-1">
            Designed by{" "}
            <a href="https://abdul-halim-rifat.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 font-semibold inline-flex items-center gap-0.5 transition-colors">
              Abdul Halim
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
