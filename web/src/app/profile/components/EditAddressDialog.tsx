"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUpdateAddress } from "@/hooks/useAddress";

export default function EditAddressDialog({ open, onOpenChange, address }: any) {
  const update = useUpdateAddress();

  const [form, setForm] = useState({
    addressLine1: address.addressLine1 || "",
    addressLine2: address.addressLine2 || "",
    city: address.city || "",
    state: address.state || "",
    country: address.country || "",
    pincode: address.pincode || "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    update.mutate(
      { id: address._id, payload: form },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-3">

          <div className="space-y-1">
            <label className="text-sm font-medium">Address Line 1</label>
            <Input
              value={form.addressLine1}
              onChange={(e) => handleChange("addressLine1", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Address Line 2</label>
            <Input
              value={form.addressLine2}
              onChange={(e) => handleChange("addressLine2", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">City</label>
            <Input
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">State</label>
            <Input
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Country</label>
            <Input
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Pincode</label>
            <Input
              value={form.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
            />
          </div>

          <Button className="w-full mt-2" onClick={handleSubmit}>
            Update Address
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
