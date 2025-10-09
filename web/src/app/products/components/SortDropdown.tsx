"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortDropdown({
  sortOption,
  setSortOption,
}: {
  sortOption: "newest" | "priceLow" | "priceHigh";
  setSortOption: (value: "newest" | "priceLow" | "priceHigh") => void;
}) {
  return (
    <div className="flex justify-end mb-6">
      <Select
        value={sortOption}
        onValueChange={(value) => setSortOption(value as "newest" | "priceLow" | "priceHigh")}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="priceLow">Price: Low to High</SelectItem>
          <SelectItem value="priceHigh">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
