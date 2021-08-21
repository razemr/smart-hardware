import { ProductList } from "./ProductList";
import { FeaturedProductBanner } from "./FeaturedProductBanner";

export const ProductsDisplay = () => {
  return (
    <div id="products-container">
      <h3>Products</h3>
      <FeaturedProductBanner />
      <ProductList />
    </div>
  );
};
