export type Product = {
  _id: string;
  name: string;
  description: string;
  slug: string;
  category: string;
  price: number;
  status: string;
  variants: Variant[];
  createdAt: string;
  updatedAt: string;
}

export type Variant = {
  color: string;
  size: string;
  image: File | string | null;
}


export type categories = {
  count: number;
  category: string;
}

export type HomePageProduct = {
  _id: string;
  name: string;
  price: number;
  slug: string;
  image: string | null;
  variant: Variant | null;
  status: string;
  createdAt: string;
};

export type HomePageProductsResponse = {
  message: string;
  page: number;
  limit: number;
  products: {
    products: HomePageProduct[];
    totalProducts: number;
    totalPages: number;
  };
};
