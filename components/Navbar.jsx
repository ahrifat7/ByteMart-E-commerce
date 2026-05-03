"use client"
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {

  const { isSeller, router, user } = useAppContext();
  const {openSignIn} = useClerk()

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 dark:border-gray-700 bg-background text-foreground transition-colors">
      <div onClick={() => router.push('/')} className="cursor-pointer">
        <Image
          src={assets.logo}
          alt="logo"
          className="w-28 md:w-32 dark:hidden transition-all"
        />
        <Image
          src={assets.logo_dark}
          alt="logo"
          className="w-28 md:w-32 hidden dark:block transition-all"
        />
      </div>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-primary transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-primary transition">
          Shop
        </Link>
        <Link href="/about-us" className="hover:text-primary transition">
          About Us
        </Link>
        <Link href="/contact-us" className="hover:text-primary transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border dark:border-gray-600 px-4 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <ThemeToggle />

        { 
        user 
          ? 
          <>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={() => router.push("/")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={() => router.push("/all-products")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={() => router.push("/cart")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={() => router.push("/my-orders")} />
            </UserButton.MenuItems>
          </UserButton>
          </> 
          : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image className="dark:invert" src={assets.user_icon} alt="user icon" />
          Account
        </button> }
      </ul>

      <div className="flex items-center md:hidden gap-3">
        <ThemeToggle />
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        { 
        user 
          ? 
          <>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={() => router.push("/")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={() => router.push("/all-products")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={() => router.push("/cart")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={() => router.push("/my-orders")} />
            </UserButton.MenuItems>
          </UserButton>
          </> 
          : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image className="dark:invert" src={assets.user_icon} alt="user icon" />
          Account
        </button> }
      </div>
    </nav>
  );
};

export default Navbar;