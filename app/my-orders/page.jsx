'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import { Package, MapPin, CreditCard, Calendar } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
  try {
    const token = await getToken()

    const {data} = await axios.get('/api/order/list', {headers:{Authorization:`Bearer ${token}`}})

    if (data.success) {
      setOrders(data.orders.reverse())
      setLoading(false)
    }else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

    useEffect(() => {
        if (user) {
            fetchOrders();
        } else if (user === null) {
            toast.error("Please login to view your orders");
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col justify-between px-6 md:px-16 lg:px-32 pt-28 pb-10 min-h-screen"
            >
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-foreground">My Orders</h1>
                        <p className="text-foreground/50 mt-1">Track and manage your recent purchases</p>
                    </div>

                    {loading ? <Loading /> : (
                        <div className="space-y-4">
                            {orders.map((order, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex flex-col md:flex-row gap-6 justify-between p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all"
                                >
                                    <div className="flex-1 flex gap-4 items-start">
                                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                            <Package className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-foreground text-sm leading-relaxed">
                                                {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                            </p>
                                            <p className="text-xs text-foreground/40 mt-1">{order.items.length} item(s)</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-x-8 gap-y-4 items-center text-sm">
                                        <div className="flex items-center gap-2 text-foreground/60">
                                            <MapPin className="w-4 h-4 text-foreground/30" />
                                            <span>{order.address.city}, {order.address.state}</span>
                                        </div>
                                        
                                        <p className="text-lg font-extrabold text-primary">{currency}{order.amount}</p>

                                        <div className="flex items-center gap-2 text-foreground/60">
                                            <Calendar className="w-4 h-4 text-foreground/30" />
                                            <span>{new Date(order.date).toLocaleDateString()}</span>
                                        </div>

                                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-600">
                                            Pending
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
            <Footer />
        </>
    );
};

export default MyOrders;
