"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { QuantityControl } from "./QuantityControl";

export function CartItem({ item, onRemove, onSave, onIncrease, onDecrease }: any) {
  return (
    <Card className="p-4 rounded-2xl shadow-sm flex flex-col gap-4">
      
      {/* Product Image */}
      <Image
        src={item.variant.image}
        alt={item.product.name}
        width={300}
        height={300}
        className="rounded-xl w-full h-auto object-cover"
      />

      {/* Product Info */}
      <div className="flex flex-col flex-1 gap-1">
        <h2 className="text-lg font-semibold">{item.product.name}</h2>
        <p className="text-sm text-gray-500">
          Color: {item.variant.color} | Size: {item.variant.size}
        </p>
        <p className="font-medium text-base mt-1">₹{item.product.price}</p>
      </div>

      {/* Quantity Control */}
      <QuantityControl
        qty={item.quantity}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onSave}>
          Save for later
        </Button>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
    </Card>
  );
}
