import React, { useContext, useEffect, useState } from "react";
import { Product } from "./Product";
import { GlobalContext } from "../../context/GlobalState";
import { PRODUCT_QUERY_LIMIT} from "../../utils/app-const";
import { Filter } from "../shared/Filter";
// import { Paginator } from "../shared/Paginator";

export const ProductGrid = () => {
  const { products, getProducts } = useContext(GlobalContext);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts({
      q: searchText ? searchText : "",
      _page: searchText ? 1: page,
      _limit: PRODUCT_QUERY_LIMIT,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, page]);

  return (
    <div className="product-list">
      <div className="action-bar">
        <Filter onPageChange={setPage} onSearchChange={setSearchText} page={page} limit={PRODUCT_QUERY_LIMIT}/>
      </div>
      <div id="product-grid">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
