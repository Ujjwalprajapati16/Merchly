"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAddresses, usePreferredAddress } from "@/hooks/useAddress";
import { useState } from "react";
import AddressCard from "./AddressCard";
import AddAddressDialog from "./AddAddressDialog";

export default function AddressSection() {
  const { data: addresses } = useAddresses();
  const { data: preferred } = usePreferredAddress();
  const [openAdd, setOpenAdd] = useState(false);

  const sortedAddresses = addresses
    ? [...addresses].sort((a, b) => {
        if (a._id === preferred?._id) return -1;
        if (b._id === preferred?._id) return 1;
        return 0;
      })
    : [];

  return (
    <div className="p-4 border rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Addresses</h2>

        <Button onClick={() => setOpenAdd(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </div>

      <div className="grid gap-4">
        {sortedAddresses.map((addr: any) => (
          <AddressCard
            key={addr._id}
            address={addr}
            isPreferred={preferred?._id === addr._id}
          />
        ))}
      </div>

      <AddAddressDialog open={openAdd} onOpenChange={setOpenAdd} />
    </div>
  );
}
