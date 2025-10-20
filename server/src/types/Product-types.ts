export type Product = {
    id: number;
    name: string;
    price: number;
    slug: string;
    description: string;
    status: string;
    variants: {
        color: string;
        size: string;
        image: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export type ProductToAdd = {
    name: string;
    price: number;
    slug: string;
    description: string;
    variants: Variant[];
}

export type Variant = {
    color: string;
    size: string;
    image: string;
}