'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

const OrderPlaced = () => {

  const { router } = useAppContext()

  useEffect(() => {
    setTimeout(() => {
      router.push('/my-orders')
    }, 5000)
  }, [])

  return (
    <div className='min-h-screen flex flex-col justify-center items-center px-6 bg-background'>
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative flex flex-col items-center gap-8 z-10"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          className="relative"
        >
          <div className="w-28 h-28 bg-green-500/10 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={2.5} />
            </div>
          </div>
          
          {/* Pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 w-28 h-28 bg-green-500/10 rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-3"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">Order Confirmed!</h1>
          <p className="text-foreground/50 max-w-sm">
            Your order has been placed successfully. You'll receive a confirmation email shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <button 
            onClick={() => router.push('/my-orders')}
            className="group flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            View My Orders
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-foreground/30 animate-pulse">Redirecting in 5 seconds...</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OrderPlaced