"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Control, useFieldArray, Controller } from "react-hook-form";
import { ProductFormData } from "./AddProductForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VariantFieldsProps {
  control: Control<ProductFormData>;
  name: "variants";
}

export function VariantFields({ control, name }: VariantFieldsProps) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-sm">Variants</h4>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => append({ color: "", size: "", image: null })}
        >
          Add Variant
        </Button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center gap-4 border p-3 rounded-lg"
        >
          {/* Color */}
          <div className="flex-1 min-w-[120px]">
            <Controller
              control={control}
              name={`${name}.${index}.color`}
              render={({ field }) => (
                <Input placeholder="Color" {...field} />
              )}
            />
          </div>

          {/* Size */}
          <div className="flex-1 min-w-[120px]">
            <Controller
              control={control}
              name={`${name}.${index}.size`}
              render={({ field }) => <Input placeholder="Size" {...field} />}
            />
          </div>

          {/* Image Preview */}
          <div className="relative w-24 h-24 flex-shrink-0 border rounded overflow-hidden">
            <Controller
              control={control}
              name={`${name}.${index}.image`}
              render={({ field }) => (
                <>
                  {field.value &&
                    typeof field.value === "string" && (
                      <Image
                        src={field.value}
                        alt={`Variant ${index}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  {field.value instanceof File && (
                    <Image
                      src={URL.createObjectURL(field.value)}
                      alt={`Variant ${index}`}
                      fill
                      className="object-cover"
                    />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute bottom-1 left-1 w-[calc(100%-0.5rem)] opacity-80"
                    onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                  />
                </>
              )}
            />
          </div>

          {/* Remove button */}
          <div className="flex-shrink-0">
            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={() => remove(index)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
