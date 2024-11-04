import { useDispatch } from "react-redux";
import OrderSummary from "./productDetails/OrderSummary";
import PropTypes from 'prop-types';
import { updateQuantity } from "../../redux/features/cart/cartSlice";


const CartModal = ({ products, isCartOpen, onClose }) => {
  const dispatch =useDispatch();
  const handleQuantity=(type,id)=>{
    const payload={type,id}
    dispatch(updateQuantity(payload))
  }
    return (
      <div
        className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ transition: "opacity 300ms" }}
      >
        <div
          className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
          style={{ transition: "transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)" }}
        >
          <div className="p-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold">Your Cart</h4>
              <button onClick={() => onClose()} className="text-gray-600 hover:text-gray-900">
                <i className="ri-close-line bg-black p-1 text-white"></i>
              </button>
            </div>
            <div className="cart-items">
              {products.length === 0 ? (
                <div>Your Cart Is Empty</div>
              ) : (
                products.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="flex items-center">
                        <span className="mr-4 px-1 bg-primary text-white rounded-full">0{index + 1}</span>
                        <img src={item.image} alt="" className="size-12 object-cover mr-4" />
                        <div>
                          <h5 className="text-lg font-medium">{item.name}</h5>
                          <p className="text-gray-600 text-sm">{Number(item.price).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center ml-8">
                          <button className="size-6 flex items-center justify-center px-1.5 rounded-s-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                          onClick={()=>handleQuantity("decrement",item._id)}>-</button>
                          <span className="px-2 text-center">{item.quantity}</span>
                          <button className="size-6 flex items-center justify-center px-1.5 rounded-s-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                          onClick={()=>handleQuantity("increment",item._id)}>+</button>
                        </div>
                        <div className="ml-5">
                          <button className="text-red-500 hover:text-red-800 mr-4">Remove</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* calculation */}
            {
                products.length > 0 &&(
                    <OrderSummary />
                )
            }
          </div>
        </div>
      </div>
    );
  };
  // PropTypes validation
CartModal.propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
    isCartOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  export default CartModal;
  