import React from 'react';
import { ProductGrid } from "./ProductGrid";
import { FeaturedProductBanner } from "./FeaturedProductBanner";

export const ProductsDisplay = () => {
  return (
    <div id="products-container">
      <h3>Products</h3>
      <FeaturedProductBanner />
      <ProductGrid />
    </div>
  );
};
