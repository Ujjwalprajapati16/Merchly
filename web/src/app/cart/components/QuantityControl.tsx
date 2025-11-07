"use client";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";


export function QuantityControl({ qty, onIncrease, onDecrease }: { qty: number; onIncrease: () => void; onDecrease: () => void }) {
    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onDecrease}>
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center">{qty}</span>
            <Button variant="outline" size="sm" onClick={onIncrease}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}