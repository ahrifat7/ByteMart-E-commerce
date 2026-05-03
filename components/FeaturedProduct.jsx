import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
    productId: "67a1f52e3f34a77b6dde914a",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
    productId: "67a1f4e43f34a77b6dde9144",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
    productId: "67a1f7c93f34a77b6dde915a",
  },
];

const FeaturedProduct = () => {

  const { router } = useAppContext();

  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-semibold text-foreground">Featured Products</p>
        <div className="w-28 h-1 bg-primary mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description, productId }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition-all duration-300 w-full h-auto object-cover rounded-2xl shadow-lg dark:shadow-gray-900/50"
            />
            <div className="group-hover:-translate-y-4 transition-transform duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-semibold text-xl lg:text-2xl drop-shadow-md">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60 drop-shadow-md">
                {description}
              </p>
              <button
                onClick={() => router.push(`/product/${productId}`)}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 transform hover:-translate-y-0.5 transition-all duration-300 border border-orange-400/50"
              >
                Buy now <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
