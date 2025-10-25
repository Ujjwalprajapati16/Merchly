"use client";

import { useState } from "react";
import { Product } from "@/types/productTypes";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteProduct } from "@/hooks/useAdminActions";
import EditProductDialog from "./EditProductDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

export default function ProductRow({ product }: { product: Product }) {
  const mainImage = product.variants[0]?.image || "/placeholder.png";

  const deleteMutation = useDeleteProduct();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteMutation.mutateAsync(product._id);
      setIsLoading(false);
      setIsDeleteOpen(false);
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Image
            src={mainImage}
            alt={product.name}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
        </TableCell>
        <TableCell className="font-medium">{product.name}</TableCell>
        <TableCell>{product.category}</TableCell>
        <TableCell>₹{product.price}</TableCell>
        <TableCell>
          <span
            className={`px-2 py-1 rounded-full text-xs ${product.status === "available"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
              }`}
          >
            {product.status}
          </span>
        </TableCell>
        <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
        <TableCell className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsEditOpen(true)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>

      {/* Edit Product Dialog */}
      {isEditOpen && (
        <EditProductDialog
          product={product}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {isLoading ? <><Spinner /> Deleting</> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
