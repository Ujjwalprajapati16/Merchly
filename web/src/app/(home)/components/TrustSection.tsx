"use client";

import { RiShieldCheckLine, RiTruckLine, RiMoneyDollarCircleLine, RiHeadphoneLine } from "react-icons/ri";
import { motion } from "framer-motion";

const trustHighlights = [
  {
    icon: <RiShieldCheckLine className="w-6 h-6 text-white" />,
    title: "100% Genuine",
    color: "bg-primary",
  },
  {
    icon: <RiTruckLine className="w-6 h-6 text-white" />,
    title: "Fast Shipping",
    color: "bg-secondary",
  },
  {
    icon: <RiMoneyDollarCircleLine className="w-6 h-6 text-white" />,
    title: "Easy Returns",
    color: "bg-green-500",
  },
  {
    icon: <RiHeadphoneLine className="w-6 h-6 text-white" />,
    title: "24/7 Support",
    color: "bg-yellow-500",
  },
];

const TrustHighlights = () => {
  return (
    <section className="w-full py-12 px-6 bg-background">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-2xl font-semibold">Quick Highlights</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {trustHighlights.map((highlight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 ${highlight.color}`}>
              {highlight.icon}
            </div>
            <p className="text-sm font-medium">{highlight.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustHighlights;
