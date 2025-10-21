export type Product = {
  _id: string;
  name: string;
  description: string;
  slug: string;
  category: string;
  price: number;
  status: string;
  variants: Variant[];
}

export type Variant = {
  color: string;
  size: string;
  image: string;
}
