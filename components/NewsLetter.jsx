import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyo3EoYaFP6b0gJtXZu1sIRbD8ca13OHp8QzToEz60WAvk2tE6OFFQF2GoSNG-tt1Ii/exec';
    const form = e.target;

    try {
      const response = await fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form) 
      });

      if (response.ok) {
        toast.success("Subscribed successfully!");
        form.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error('Error!', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
      <h1 className="md:text-4xl text-2xl font-semibold text-foreground">
        Subscribe now & get 20% off
      </h1>
      <p className="md:text-base text-gray-600 dark:text-gray-400 pb-8">
        Subscribe to our newsletter and stay updated with the latest trends and offers.
      </p>
      <form 
        onSubmit={onSubmit}
        className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 shadow-md dark:shadow-gray-900/50 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
      >
        <input
          name="Email"
          className="bg-transparent outline-none w-full px-6 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600"
          type="email"
          required
          placeholder="Enter your email id"
        />
        <button 
          type="submit"
          disabled={loading}
          className={`md:px-12 px-8 h-full text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all font-semibold shadow-md shadow-orange-500/30 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
