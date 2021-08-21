import { ProductList } from "./ProductList";
import { FeaturedProductBanner } from "./FeaturedProductBanner";

export const ProductsDisplay = () => {
  return (
    <div className="products-display">
      <h3>Products</h3>
      <FeaturedProductBanner />
      <ProductList />
    </div>
  );
};
