import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-300 dark:border-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
        <div className="w-4/5">
          <Image className="w-28 md:w-32 dark:hidden transition-all" src={assets.logo} alt="logo" />
          <Image className="w-28 md:w-32 hidden dark:block transition-all" src={assets.logo_dark} alt="logo" />
          <p className="mt-6 text-sm">
            Our story is all about trust and a strong drive to do our best.
            We truly believe that technology should be something everyone can use and enjoy.
            That’s why we are committed to making high-quality digital products available to people all around the world.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-foreground mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="hover:text-primary transition" href="/">Home</Link>
              </li>
              <li>
                <Link className="hover:text-primary transition" href="/about-us">About us</Link>
              </li>
              <li>
                <Link className="hover:text-primary transition" href="/contact-us">Contact us</Link>
              </li>
              <li>
                <Link className="hover:text-primary transition" href="/privacy-policy">Privacy policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-foreground mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+880 1602 541 452</p>
              <p>ahrifat141@gmail.com</p>
            </div>
            <div className="flex gap-3 mt-3">
              <a href="https://www.facebook.com/rifatnotfound7" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-lg">
                <FaFacebook />
              </a>
              <a href="https://github.com/ahrifat7" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-lg">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/abdul-halim-bd/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-lg">
                <FaLinkedin />
              </a>
              <a href="https://www.instagram.com/md.abdul.halim7/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-lg">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
        Copyright 2026 © <a href="https://abdul-halim-rifat.vercel.app/">Abdul Halim</a> All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;