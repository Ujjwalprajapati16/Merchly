"use client";

import { CheckCircle, Clock, Truck, Package, XCircle } from "lucide-react";

export default function OrderTimeline({ status }: { status: string }) {
  const steps = [
    { key: "received", label: "Order Received", icon: Clock },
    { key: "shipped", label: "Shipped", icon: Package },
    { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const isCancelled = status === "cancelled";

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-3">Tracking</h2>

      <div className="space-y-6">
        {isCancelled ? (
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-red-50">
            <XCircle className="text-red-500 w-6 h-6" />
            <p className="text-red-700 font-medium">Order Cancelled</p>
          </div>
        ) : (
          steps.map((step) => {
            const Icon = step.icon;

            const active =
              steps.findIndex((s) => s.key === status) >=
              steps.findIndex((s) => s.key === step.key);

            return (
              <div key={step.key} className="flex items-center gap-4">
                <Icon
                  className={`w-6 h-6 ${
                    active ? "text-green-600" : "text-gray-400"
                  }`}
                />

                <p
                  className={`text-sm ${
                    active ? "font-semibold text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>

                {active && <span className="text-green-600 text-xs">✓</span>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
