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