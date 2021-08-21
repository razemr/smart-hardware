import { Product } from "./Product";
import { GlobalContext } from "../../context/GlobalState";
import { useContext, useEffect, useState } from "react";
import { PRODUCT_QUERY_LIMIT, TOTAL_PRODUCTS } from "../../utils/app-const";
import { Paginator } from "../shared/Paginator";

export const ProductList = () => {
  const { products, getProducts } = useContext(GlobalContext);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

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
        <Paginator onChange={setPage} page={page} limit={PRODUCT_QUERY_LIMIT} total={TOTAL_PRODUCTS}/>
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
