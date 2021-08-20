import { Product } from './Product'
import { GlobalContext } from '../context/GlobalState';
import {useContext, useEffect, useState} from 'react';

export const ProductList = () => {
    const { products, getProducts, updateCart } = useContext(GlobalContext);
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getProducts({
            q: searchText ? searchText : '',
            _page: 1,
            _limit: 12
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    return (
        <div className="product-list">
            <div className="search">
                <input type="text" placeholder="Search" onChange={event => setSearchText(event.target.value)}></input>
            </div>
            <div className="main">
                {products.map((product) => <Product key={product.id} {...product} onClick={updateCart}/>)}
            </div>
            <div className="pagination">

            </div>
        </div>
    );
}