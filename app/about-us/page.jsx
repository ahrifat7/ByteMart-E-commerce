"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Truck, HeadphonesIcon, Award } from "lucide-react";

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Premium Products" },
  { value: "50+", label: "Countries Served" },
  { value: "24/7", label: "Customer Support" },
];

const features = [
  { icon: Shield, title: "Secure Shopping", desc: "End-to-end encrypted transactions for your peace of mind." },
  { icon: Truck, title: "Fast Delivery", desc: "Free worldwide shipping on orders over $100." },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Our team is always here to assist you." },
  { icon: Award, title: "100% Authentic", desc: "Every product is verified and genuine." },
];

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-28 pb-20"
      >
        {/* Hero Section */}
        <div className="px-6 md:px-16 lg:px-32 text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              We Make Tech <span className="text-primary">Accessible</span> to Everyone
            </h1>
            <p className="text-lg text-foreground/50 max-w-2xl mx-auto leading-relaxed">
              Founded with a vision to revolutionize the digital marketplace, ByteMart connects people with the best technology and gadgets seamlessly. Our dedication to quality, customer satisfaction, and innovation drives everything we do.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="px-6 md:px-16 lg:px-32 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card text-center p-8 rounded-3xl"
              >
                <p className="text-4xl md:text-5xl font-extrabold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-foreground/50 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="px-6 md:px-16 lg:px-32 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Why Choose <span className="text-primary">ByteMart?</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl border border-border hover:border-primary/30 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <feat.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feat.title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CEO Section */}
        <div className="px-6 md:px-16 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 md:p-16"
          >
            {/* Background glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="relative shrink-0">
                {/* Decorative Frame Elements */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 bg-gradient-to-tr from-primary/40 via-blue-500/20 to-primary/40 rounded-[2.5rem] blur-xl opacity-50"
                />
                
                <div className="relative w-48 h-48 md:w-64 md:h-64 p-2 rounded-[2.5rem] bg-gradient-to-tr from-primary via-blue-500 to-primary shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-slate-900 rounded-[2.2rem] m-1 overflow-hidden">
                    <Image 
                      src="https://i.ibb.co.com/sTdW2XJ/Whats-App-Image-2026-04-16-at-12-09-51-PM.jpg" 
                      alt="Md. Abdul Halim" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Floating corner accents */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-lg rotate-12 flex items-center justify-center shadow-lg"
                >
                  <Award className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              
              <div className="text-center md:text-left flex-1">
                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Meet Our Founder</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Md. Abdul Halim</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  A visionary leader and technology enthusiast who founded ByteMart with the core philosophy of bringing cutting-edge technology directly to consumers. With expertise in the digital and eCommerce sectors, he has steered the company through rapid growth.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Under his guidance, ByteMart has expanded its product range while prioritizing an exceptional user experience — making tech shopping intuitive, secure, and enjoyable.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
};

export default AboutUs;

