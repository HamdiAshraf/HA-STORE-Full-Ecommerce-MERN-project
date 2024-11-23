/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi.js";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProduct] = useState(8);
  const [category, setCategory] = useState('');
  const [color, setColor] = useState(''); 
  const [minPrice, setMinPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(0);
  const { data, error, isLoading } = useFetchAllProductsQuery({
    category,
    color,
    minPrice,
    maxPrice,
    page: 1, 
    limit: visibleProducts,
  });

  const loadMoreProducts = () => {
    setVisibleProduct((prevCount) => prevCount + 4);
  };

  useEffect(() => {
    if (error) {
      console.error("Error loading products:", error);
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover the Hottest Picks: Elevate Your Style with Our Curated
        Collection of Trending Womens Fashion Products.
      </p>

      {/* Products Card */}
      <div className="mt-12">
        {data ? (
          <ProductCards products={data.data.slice(0, visibleProducts)} />
        ) : (
          <div>No products available</div>
        )}
      </div>

      {/* Load More Products Button */}
      <div className="product__btn mt-12">
        {visibleProducts < data?.data?.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
