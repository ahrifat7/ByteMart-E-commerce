"use client"
import React, { useEffect, useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { isSeller, router, user, getCartCount } = useAppContext();
  const { openSignIn } = useClerk();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/all-products" },
    { name: "Deals", path: "/deals" },
    { name: "About", path: "/about-us" },
    { name: "Contact", path: "/contact-us" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 transition-all duration-300 ${
          isScrolled ? "glass shadow-lg py-3" : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div onClick={() => router.push('/')} className="cursor-pointer relative group">
          <Image
            src={assets.logo}
            alt="logo"
            className="w-28 md:w-32 dark:hidden transition-transform duration-300 group-hover:scale-105"
          />
          <Image
            src={assets.logo_dark}
            alt="logo"
            className="w-28 md:w-32 hidden dark:block transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Desktop Nav */}
        <div className="flex items-center gap-6 lg:gap-10 max-md:hidden">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.path ? "text-primary" : "text-foreground/80"
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}

          {isSeller && (
            <button 
              onClick={() => router.push('/seller')} 
              className="text-xs font-semibold bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Cart Icon */}
          <button 
            onClick={() => router.push('/cart')}
            className="relative p-2 hover:bg-foreground/5 rounded-xl transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-foreground/70" />
            {getCartCount() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
          
          {/* Desktop User */}
          <div className="hidden md:block">
            {user ? (
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={() => router.push("/")} />
                  <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={() => router.push("/all-products")} />
                  <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={() => router.push("/cart")} />
                  <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={() => router.push("/my-orders")} />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <button 
                onClick={openSignIn} 
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
              >
                <Image className="dark:invert group-hover:scale-110 transition-transform" src={assets.user_icon} alt="user icon" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden p-2 hover:bg-foreground/5 rounded-xl transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-72 bg-background border-l border-border z-[70] md:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-border">
                <span className="font-bold text-lg">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-foreground/5 rounded-xl">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.path}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                        pathname === link.path 
                          ? "bg-primary/10 text-primary" 
                          : "text-foreground/70 hover:bg-foreground/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {isSeller && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button 
                      onClick={() => { router.push('/seller'); setMobileOpen(false); }}
                      className="w-full px-4 py-3 bg-primary text-white rounded-xl font-bold text-sm mt-4"
                    >
                      Seller Dashboard
                    </button>
                  </motion.div>
                )}
              </nav>

              <div className="p-6 border-t border-border">
                {user ? (
                  <div className="flex items-center gap-3">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-sm font-medium text-foreground/70">Account</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => { openSignIn(); setMobileOpen(false); }}
                    className="w-full py-3 bg-foreground text-background rounded-xl font-bold text-sm"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
