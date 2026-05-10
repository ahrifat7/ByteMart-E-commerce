'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {

  const { getToken } = useAppContext()

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [brand, setBrand] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('offerPrice', offerPrice);
      formData.append('brand', brand);

      for (let i = 0; i < files.length; i++) {
  formData.append('images', files[i]);
}

try {
  const token = await getToken();

  const { data } = await axios.post('/api/product/add', formData, {headers: {Authorization: `Bearer ${token}`}});

  if(data.success){
    toast.success(data.message);
    setFiles([]);
    setName('');
    setDescription('');
    setCategory('Earphone');
    setPrice('');
    setOfferPrice('');
    setBrand('');
  }else{
    toast.error(data.message);
  }

  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">

            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" id={`image${index}`} hidden />
                {files[index] ? (
                  <Image
                    className="max-w-24 cursor-pointer rounded shadow-sm"
                    src={URL.createObjectURL(files[index])}
                    alt="uploaded"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="w-24 h-24 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-700 flex flex-col items-center justify-center gap-1 hover:border-orange-400 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition-all">
                    <svg className="w-7 h-7 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3M6.75 20.25h10.5a2.25 2.25 0 002.25-2.25V7.5L15 3H6.75A2.25 2.25 0 004.5 5.25v12.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <span className="text-[10px] text-gray-400 dark:text-gray-300 font-medium">Upload</span>
                  </div>
                )}
              </label>
            ))}

          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-colors"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-colors"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-colors"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
              <option value="Console">Console</option>
              <option value="Mouse">Mouse</option>
              <option value="Keyboard">Keyboard</option>
              <option value="Speaker">Speaker</option>
              <option value="Desktop">Desktop</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-colors"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-colors"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="brand">
              Brand
            </label>
            <input
              id="brand"
              type="text"
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-colors"
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              required
            />
          </div>
        </div>
        <button disabled={loading} type="submit" className="px-8 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded transition-all shadow-md hover:shadow-lg disabled:opacity-50">
          {loading ? "Adding..." : "ADD"}
        </button>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProduct;