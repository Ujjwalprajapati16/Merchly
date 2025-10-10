import { notFound } from "next/navigation";
import products from "../_db/product.json";
import ProductCarousel from "./components/ProductCarousel";
import ProductInfo from "./components/ProductInfo";

export default async function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) return notFound();

    return (
        <div className="container mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
            {/* Left: Carousel */}
            <ProductCarousel images={product.image || []} />

            {/* Right: Product Info */}
            <ProductInfo product={product} />
        </div>
    );
}
