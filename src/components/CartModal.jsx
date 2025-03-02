import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../store/orderSlice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function CartModal({ closeCart }) {
  const cart = useSelector((state) => state.order.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Varukorg</h2>
        {cart.length === 0 ? (
          <p>Varukorgen är tom</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} kr
                <button onClick={() => handleRemove(item.id)}>❌</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => navigate("/order")}>Beställ</button>
        <button onClick={closeCart}>Stäng</button>
      </div>
    </div>
  );
}
CartModal.propTypes = {
  closeCart: PropTypes.func.isRequired,
};

export default CartModal;
