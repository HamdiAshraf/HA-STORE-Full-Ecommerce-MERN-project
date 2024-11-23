import { Link, useParams } from 'react-router-dom';
import RatingStars from '../../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';

const SingleProductPage = () => {
  const { id } = useParams();
  const dispatch=useDispatch()

  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  
  const singleProduct = data?.data || {}; 
  const productReviews = data?.reviews || []; 

  const handleAddToCart=(product)=>{
    dispatch(addToCart(product))
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message || "An error occurred"}</div>;

  
  if (!singleProduct || !singleProduct.name) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">Home</Link>
          </span>
          <i className="ri-arrow-drop-right-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">Shop</Link>
          </span>
          <i className="ri-arrow-drop-right-line"></i>
          <span className="hover:text-primary">{singleProduct.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* product image */}
          <div className="md:w-1/2 w-full">
            <img
              className="rounded-md w-full h-auto"
              src={singleProduct.image}
              alt={singleProduct.name}
            />
          </div>

          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">{singleProduct.name}</h3>
            <p className="text-xl text-primary mb-4">
              ${singleProduct.price} <s>${singleProduct.oldPrice}</s>
            </p>
            <p className="text-gray-400 mb-4">{singleProduct.description}</p>

            <div className="flex flex-col space-y-2">
              {/* additional product info */}
              <p>
                <strong>Category:</strong> {singleProduct.category}
              </p>
              <p>
                <strong>Color:</strong> {singleProduct.color}
              </p>
              <div className="flex items-center gap-1">
                <strong>Rating:</strong>
                <RatingStars rating={singleProduct.rating} />
              </div>
            </div>

            <button 
            onClick={(e)=>{
              e.stopPropagation();
              handleAddToCart(singleProduct)
            }}
            className="bg-primary mt-6 px-6 py-3 text-white rounded">
              Add To Cart
            </button>
          </div>
        </div>
      </section>

      {/* display reviews */}
      <section className="section__container mt-8">
        <h3>Reviews</h3>
        {productReviews.length > 0 ? (
          productReviews.map((review, index) => (
            <div key={index} className="review">
              <p><strong>{review.user}</strong></p>
              <RatingStars rating={review.rating} />
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </section>
    </>
  );
};

export default SingleProductPage;
