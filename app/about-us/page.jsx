"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-32 py-16 bg-background">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About ByteMart</h1>
          <div className="w-24 h-1.5 bg-primary rounded-full mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Founded with a vision to revolutionize the digital marketplace, ByteMart started as a small dream to connect people with the best technology and gadgets seamlessly. Over the years, our dedication to quality, customer satisfaction, and innovation has transformed us into a leading eCommerce platform.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Our history is built on trust and a relentless pursuit of excellence. We believe that technology should empower everyone, and our mission is to make premium digital products accessible to all our customers globally.
          </p>
        </div>

        <div className="mt-20 w-full max-w-5xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl dark:shadow-gray-900/50 p-8 md:p-14 border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="relative group shrink-0">
            <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-orange-400 to-orange-600 shadow-lg">
              <Image 
                src="https://i.ibb.co.com/sTdW2XJ/Whats-App-Image-2026-04-16-at-12-09-51-PM.jpg" 
                alt="Md. Abdul Halim" 
                fill 
                className="rounded-full object-cover border-4 border-white dark:border-gray-900"
              />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h3 className="text-primary font-medium tracking-widest uppercase text-sm mb-2">Meet Our CEO</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Md. Abdul Halim</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6">
              A visionary leader and technology enthusiast, Md. Abdul Halim founded ByteMart with the core philosophy of bringing cutting-edge technology directly to consumers. With over a decade of experience in the digital and eCommerce sectors, he has steered the company through rapid growth, consistently pushing the boundaries of what an online tech marketplace can offer.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
              Under his guidance, ByteMart has not only expanded its product range but has also prioritized an exceptional user experience, making tech shopping intuitive, secure, and enjoyable.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
