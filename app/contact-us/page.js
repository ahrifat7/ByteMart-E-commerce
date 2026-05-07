"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ContactUs = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Call Us",
      details: "+880 1602 541 452",
      description: "Mon-Fri from 9am to 6pm.",
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email Us",
      details: "ahrifat141@gmail.com",
      description: "We'll respond within 24 hours.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Visit Us",
      details: "Jamuna Future Park, Dhaka",
      description: "Available for in-person meetings.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24">
        <main className="container mx-auto px-6 md:px-16 lg:px-32 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Get in <span className="text-gradient">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-foreground/60 max-w-2xl mx-auto text-lg"
            >
              Have a question or feedback? We'd love to hear from you. Reach out to our team
              and we'll get back to you as soon as possible.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="glass-card p-8 rounded-3xl">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <MessageSquare className="text-primary" />
                  Contact Information
                </h2>
                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-foreground/80 font-medium">{item.details}</p>
                        <p className="text-foreground/50 text-sm mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-foreground/60">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Response time: ~2h</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/60">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">Global Support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="relative h-64 rounded-3xl overflow-hidden border border-border shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1422238863292!2d90.4242393!3d23.813541099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c62fb95f16c1%3A0xb333248370356dee!2z4Kav4Kau4KeB4Kao4Ka-IOCmq-Cmv-CmieCmmuCmvuCmsCDgpqrgpr7gprDgp43gppU!5e0!3m2!1sbn!2sbd!4v1778123630729!5m2!1sbn!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Message</label>
                  <textarea
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full px-5 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
