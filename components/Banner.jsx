import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const Banner = () => {

  const { router } = useAppContext();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-gradient-to-br from-[#E6E9F2] to-gray-200 dark:from-gray-800 dark:to-gray-900 my-16 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
      <Image
        className="max-w-56"
        src={assets.jbl_soundbox_image}
        alt="jbl_soundbox_image"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold max-w-[290px] text-gray-900 dark:text-white">
          Level Up Your Gaming Experience
        </h2>
        <p className="max-w-[343px] font-medium text-gray-600 dark:text-gray-400">
          From immersive sound to precise controls—everything you need to win
        </p>
        <button
          onClick={() => router.push('/product/67a1f5ef3f34a77b6dde9150')}
          className="group flex items-center justify-center gap-2 px-12 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 transform hover:-translate-y-0.5 transition-all duration-300 border border-orange-400/50 mt-4 tracking-wide"
        >
          Buy now
          <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </button>
      </div>
      <Image
        className="hidden md:block max-w-80"
        src={assets.md_controller_image}
        alt="md_controller_image"
      />
      <Image
        className="md:hidden"
        src={assets.sm_controller_image}
        alt="sm_controller_image"
      />
    </div>
  );
};

export default Banner;