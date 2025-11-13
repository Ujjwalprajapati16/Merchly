"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useSetPreferredAddress, useDeleteAddress } from "@/hooks/useAddress";
import { useState } from "react";
import EditAddressDialog from "./EditAddressDialog";

export default function AddressCard({ address, isPreferred }: any) {
  const setPreferred = useSetPreferredAddress();
  const deleteAddress = useDeleteAddress();
  const [openEdit, setOpenEdit] = useState(false);

  const handlePreferred = () => {
    if (!isPreferred) setPreferred.mutate(address._id);
  };

  return (
    <>
      <div
        className={`p-4 border rounded-xl cursor-pointer transition flex justify-between items-start gap-4 ${
          isPreferred ? "border-primary bg-primary/5" : "border-muted"
        }`}
        onClick={handlePreferred}
      >
        {/* LEFT SIDE – ADDRESS INFO */}
        <div className="flex-1">
          <p className="font-medium">{address.addressLine1}</p>

          {address.addressLine2 && (
            <p className="text-sm">{address.addressLine2}</p>
          )}

          <p className="text-sm text-muted-foreground">
            {address.city}, {address.state}, {address.country} -{" "}
            {address.pincode}
          </p>

          {isPreferred && (
            <p className="text-xs text-green-600 font-medium mt-2">
              Preferred Address
            </p>
          )}
        </div>

        {/* RIGHT SIDE – ACTION BUTTONS */}
        <div className="flex flex-col items-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setOpenEdit(true);
            }}
            className="flex items-center"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              deleteAddress.mutate(address._id);
            }}
            className="flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditAddressDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        address={address}
      />
    </>
  );
}
