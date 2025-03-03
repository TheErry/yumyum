import { useSelector, useDispatch } from "react-redux";
import { setOrderId, setEta } from "../store/orderSlice";
import { useNavigate } from "react-router-dom";
import "./pages.css";

function Order() {
  const cart = useSelector((state) => state.order.cart);
  const tenant = useSelector((state) => state.order.tenant);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      alert("Din order är tom!");
      return;
    }

    const orderData = {
      items: cart.map((item) => item.id),
    };

    // createOrder does not work and I couldn't figure out why
    try {
      const rawResponse = await fetch(
        `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenant}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-zocom": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify(orderData),
        }
      );

      const response = await rawResponse.json();
      const orderId = response.order.id;
      const eta = response.order.eta;

      if (!orderId) {
        console.error("Order-ID saknas i API-svaret!");
        return;
      }

      dispatch(setOrderId(orderId));
      dispatch(setEta(eta));
      navigate("/eta");
    } catch (error) {
      console.error("Något gick fel vid beställning:", error);
    }
  };

  const handleCloseCart = () => {
    navigate("/menu");
  };

  const totalSum = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="order-page-body">
      <div className="cart-container">
        <button className="cart-button" onClick={handleCloseCart}>
          <img src="assets/cart.png" />
        </button>
      </div>
      <div className="order-content">
        {cart.length === 0 ? (
          <p>Din varukorg är tom.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div className="list-top">
                  <h3>{item.name}</h3>
                  <div className="dots-dark" />
                  <h3>{item.price} sek</h3>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="order-bottom-content">
          <div className="total-content">
            <h3>TOTALT</h3>
            <h3 className="sum">{totalSum} SEK</h3>
          </div>
          <button className="order-button" onClick={handleSubmitOrder}>
            TAKE MY MONEY!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
