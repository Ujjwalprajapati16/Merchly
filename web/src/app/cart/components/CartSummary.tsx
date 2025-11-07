"use client";
import { Button } from "@/components/ui/button";


export function CartSummary({ total }: { total: number }) {
    return (
        <div className="flex justify-between items-center mt-4 p-4 border rounded-2xl">
            <p className="text-lg font-semibold">Total: ₹{total}</p>
            <Button size="lg" className="rounded-2xl px-8">Checkout</Button>
        </div>
    );
}