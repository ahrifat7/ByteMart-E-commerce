"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaGlobe, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { name: "Facebook", icon: FaFacebook, url: "https://www.facebook.com/rifatnotfound7", color: "hover:bg-blue-600" },
    { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/abdul-halim-bd/", color: "hover:bg-blue-500" },
    { name: "GitHub", icon: FaGithub, url: "https://github.com/ahrifat7", color: "hover:bg-gray-800" },
    { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/md.abdul.halim7/", color: "hover:bg-pink-600" },
    { name: "Portfolio", icon: FaGlobe, url: "https://abdul-halim-rifat.vercel.app/", color: "hover:bg-teal-500" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "55eb283d-d1da-4598-bee9-7ea765379a45");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        e.target.reset();
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-background min-h-screen text-foreground">
        {/* Header Section */}
        <div className="relative py-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Let's Start a Conversation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Got a question, a project in mind, or just want to say hello? Our team is here to help you grow your business.
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* Contact Form - 3 Columns */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Subject</label>
                  <input 
                    type="text" 
                    name="subject" 
                    required 
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Your Message</label>
                  <textarea 
                    name="message" 
                    required 
                    rows="5"
                    placeholder="Tell us more about your needs..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Info - 2 Columns */}
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    Prefer to reach out directly? Here's how you can find us. We're always open to discussing new projects and creative ideas.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                      <FaEnvelope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email Us</h4>
                      <p className="text-gray-600 dark:text-gray-400">ahrifat141@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 shrink-0">
                      <FaPhoneAlt className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Call Us</h4>
                      <p className="text-gray-600 dark:text-gray-400">+880 1602 541 452</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-teal-500/10 text-teal-500 shrink-0">
                      <FaMapMarkerAlt className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Our Location</h4>
                      <p className="text-gray-600 dark:text-gray-400">Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Icons Redesign */}
              <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-white ${link.color} hover:scale-110 hover:-translate-y-1`}
                      title={link.name}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

