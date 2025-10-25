import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Variant {
  color: string;
  size: string;
  image?: File | null;
}

interface VariantFieldsProps {
  variants: Variant[];
  setVariants: (v: Variant[]) => void;
}

export function VariantFields({ variants, setVariants }: VariantFieldsProps) {
  const handleChange = (index: number, field: keyof Variant, value: any) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleRemove = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setVariants([...variants, { color: "", size: "", image: null }]);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-sm">Variants</h4>
        <Button onClick={handleAdd} type="button" size="sm" variant="outline">
          Add Variant
        </Button>
      </div>

      {variants.map((variant, index) => (
        <div
          key={index}
          className="grid grid-cols-3 gap-2 items-center border p-2 rounded-lg"
        >
          <Input
            placeholder="Color"
            value={variant.color}
            onChange={(e) => handleChange(index, "color", e.target.value)}
          />
          <Input
            placeholder="Size"
            value={variant.size}
            onChange={(e) => handleChange(index, "size", e.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(index, "image", e.target.files?.[0])}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => handleRemove(index)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
}
