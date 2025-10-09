"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FaTshirt, FaShippingFast, FaAward, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaTshirt className="w-6 h-6 text-primary" />,
    title: "Premium Quality",
    description: "Our apparel is made with top-quality materials for maximum comfort.",
  },
  {
    icon: <FaShippingFast className="w-6 h-6 text-primary" />,
    title: "Fast Shipping",
    description: "Get your favorite merchandise delivered quickly to your doorstep.",
  },
  {
    icon: <FaAward className="w-6 h-6 text-primary" />,
    title: "100% Authentic",
    description: "All products are original and handpicked for guaranteed satisfaction.",
  },
  {
    icon: <FaHeadset className="w-6 h-6 text-primary" />,
    title: "Customer Support",
    description: "Our team is ready to assist you 24/7 with any queries or issues.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold mb-3">Why Choose Us</h2>
        <p className="text-muted-foreground">
          Discover what makes our merchandise stand out from the rest.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="group hover:shadow-lg hover:shadow-primary/10 rounded-2xl border border-border/40">
              <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
