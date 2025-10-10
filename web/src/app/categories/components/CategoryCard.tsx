"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { IconType } from "react-icons";

interface CategoryCardProps {
  name: string;
  slug: string;
  count: number;
  Icon: IconType;
}

export default function CategoryCard({ name, slug, count, Icon }: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="group relative overflow-hidden rounded-2xl border border-border/40 p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-muted/20 to-background">
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold tracking-wide group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">{count} products</p>
          </CardContent>

          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 w-0 bg-primary"
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </Card>
      </motion.div>
    </Link>
  );
}
