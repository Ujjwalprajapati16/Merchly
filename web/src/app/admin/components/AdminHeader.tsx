"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function AdminHeader() {
  // Static numbers (can be replaced with API later)
  const stats = {
    orders: 120,
    products: 56,
    users: 18,
  };

  const [count, setCount] = useState({ orders: 0, products: 0, users: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => ({
        orders: Math.min(prev.orders + 3, stats.orders),
        products: Math.min(prev.products + 2, stats.products),
        users: Math.min(prev.users + 1, stats.users),
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard label="Total Orders" value={count.orders} />
      <StatCard label="Total Products" value={count.products} />
      <StatCard label="Total Users" value={count.users} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
