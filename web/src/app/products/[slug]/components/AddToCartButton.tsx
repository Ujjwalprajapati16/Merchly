"use client";

import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";

const addToCart = () => {
    toast.success("Added to cart");
 };

const AddToCartButton = () => {
    return (
        <Button
            onClick={addToCart}
            className="flex items-center gap-2 text-sm">
            <FaShoppingCart className="w-4 h-4" /> Add to Cart
        </Button>
    );
};

export default AddToCartButton;
