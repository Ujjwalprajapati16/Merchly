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
import { useAddAddress } from "@/hooks/useAddress";

export default function AddAddressDialog({ open, onOpenChange }: any) {
  const add = useAddAddress();

  const [form, setForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    add.mutate(form, {
      onSuccess: () => {
        onOpenChange(false);
        setForm({
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {Object.keys(form).map((key: string) => (
            <div key={key} className="space-y-1">
              <label className="text-sm font-medium capitalize">{key}</label>
              <Input
                value={(form as any)[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </div>
          ))}

          <Button className="w-full" onClick={handleSubmit}>
            Save Address
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
