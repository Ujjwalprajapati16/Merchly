import FeaturedProducts from "./components/FeaturedProducts";
import HeroSection from "./components/HeroSection";
import ProductCategories from "./components/ProductCategories";
import WhyChooseUs from "./components/WhyChooseUs";
import TrustSection from "./components/TrustSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <TrustSection />
    </>
  );
}
