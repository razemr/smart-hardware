import { Product } from "./Product";
import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect, useState } from "react";
import { PRODUCT_QUERY_LIMIT, TOTAL_PRODUCTS } from "../utils/app-const";

export const ProductList = () => {
  const { products, getProducts } = useContext(GlobalContext);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState((value) => {
    if (typeof value != "number" || parseInt(value) != value) return 1;
    return value;
  });

  let maxPage = Math.ceil(TOTAL_PRODUCTS / PRODUCT_QUERY_LIMIT);

  useEffect(() => {
    getProducts({
      q: searchText ? searchText : "",
      _page: page,
      _limit: PRODUCT_QUERY_LIMIT,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, page]);

  return (
    <div className="product-list">
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => setSearchText(event.target.value)}
        ></input>
        <div>
          <input
            type="number"
            onChange={(event) => setPage(event.target.value)}
            value={page}
            min="1"
            max={maxPage}
          ></input>{" "}
          / {maxPage}
        </div>
      </div>
      <div className="main">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      <div className="pagination"></div>
    </div>
  );
};
