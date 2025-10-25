"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/productTypes";
import { AddEditProductForm } from "./AddProductForm";

interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProductDialog({ product, open, onOpenChange }: EditProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <AddEditProductForm
          product={product} 
          onClose={() => onOpenChange(false)}
          isEdit
        />
      </DialogContent>
    </Dialog>
  );
}
