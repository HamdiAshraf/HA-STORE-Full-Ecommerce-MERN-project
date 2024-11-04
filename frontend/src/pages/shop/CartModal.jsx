import { useDispatch } from "react-redux";
import OrderSummary from "./productDetails/OrderSummary";
import PropTypes from 'prop-types';
import { removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";

const CartModal = ({ products, isCartOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (type, id) => {
    const payload = { type, id };
    dispatch(updateQuantity(payload));
  };

  const handleRemoveFromCart = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ id }));
  };

  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ transition: "transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)" }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-2xl font-semibold text-gray-800">Your Cart</h4>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              <i className="ri-close-line bg-black p-1 rounded-full text-white"></i>
            </button>
          </div>
          <div className="cart-items space-y-4">
            {products.length === 0 ? (
              <div className="text-center text-gray-500">Your Cart Is Empty</div>
            ) : (
              products.map((item, index) => (
                <div key={index} className="flex items-center p-4 border-b border-gray-200">
                  <span className="mr-4 px-2 py-1 bg-primary text-white rounded-full">{index + 1}</span>
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-md mr-4" />
                  <div className="flex-1">
                    <h5 className="text-lg font-medium">{item.name}</h5>
                    <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center ml-4">
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                      onClick={() => handleUpdateQuantity("decrement", item.id)}>-</button>
                    <span className="px-2 text-center">{item.quantity}</span>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                      onClick={() => handleUpdateQuantity("increment", item.id)}>+</button>
                  </div>
                  <button onClick={(e) => handleRemoveFromCart(e, item.id)} className="ml-4 text-red-500 hover:text-red-800">
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Calculation Section */}
          {products.length > 0 && <OrderSummary />}
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
