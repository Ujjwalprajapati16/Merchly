"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddresses, useSetPreferredAddress } from "@/hooks/useAddress";
import { toast } from "sonner";

interface AddressSectionProps {
  address: any;
}

export default function AddressSection({ address }: AddressSectionProps) {
  const [open, setOpen] = useState(false);
  const { data: addresses, isLoading } = useAddresses();
  const setPreferredMutation = useSetPreferredAddress();

  const handleSetPreferred = (id: string) => {
    setPreferredMutation.mutate(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <div className="p-4 border rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

      {address ? (
        <div>
          <p>{address.addressLine1}</p>
          <p>
            {address.city}, {address.state}, {address.country} - {address.pincode}
          </p>

          {/* Dialog Trigger */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="mt-2">
                Change Address
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Select a Delivery Address</DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto">
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">Loading addresses...</p>
                ) : addresses?.length > 0 ? (
                  addresses.map((addr: any) => (
                    <div
                      key={addr._id}
                      className={`p-3 border rounded-xl cursor-pointer transition hover:border-primary ${
                        addr._id === address._id
                          ? "border-primary bg-primary/5"
                          : "border-muted"
                      }`}
                      onClick={() => handleSetPreferred(addr._id)}
                    >
                      <p className="font-medium">{addr.addressLine1}</p>
                      {addr.addressLine2 && (
                        <p className="text-sm text-muted-foreground">{addr.addressLine2}</p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {addr.city}, {addr.state}, {addr.country} - {addr.pincode}
                      </p>

                      {addr._id === address._id && (
                        <p className="text-xs text-green-600 font-medium mt-1">
                          Preferred
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No addresses found. Please add one.
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <p className="text-muted-foreground">No preferred address found.</p>
      )}
    </div>
  );
}
