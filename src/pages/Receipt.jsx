import { useSelector, useDispatch } from "react-redux";
//import { useGetReceiptQuery } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/orderSlice";

const Receipt = () => {
  const orderId = useSelector((state) => state.order.orderId);
  const cart = useSelector((state) => state.order.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*  const queryResult = useGetReceiptQuery(orderId);

  const {
    data: receipt,
    error,
    isLoading,
  } = queryResult; 
  

  if (isLoading) return <p>Laddar kvitto...</p>;
  if (error) return <p>Kunde inte hämta kvitto</p>;

  console.log("Recepit from ", receipt)
  console.log("Result ", queryResult) */
  const totalSum = cart.reduce((total, item) => total + item.price, 0);

  const groupedItems = cart.reduce((group, item) => {
    if (group[item.name]) {
      group[item.name].quantity += 1;
    } else {
      group[item.name] = { ...item, quantity: 1 };
    }
    return group;
  }, {});

  const handleNewOrder = () => {
    dispatch(clearCart());
    navigate("/menu");
  };

  return (
    <div className="receipt-body">
      <div className="receipt-content">
        <div className="receipt-items-content">
          <img src="assets/logo.png" alt="logo" width={42} />
          <h2>KVITTO</h2>
          <p>#{orderId}</p>
          <ul>
            {Object.keys(groupedItems).map((itemName) => (
              <li key={itemName}>
                <div>
                  <h3>{itemName}</h3>
                  <p>{groupedItems[itemName].quantity} stycken </p>
                </div>
                <div className="dots-dark" />
                <h3>{groupedItems[itemName].price} SEK</h3>
              </li>
            ))}
          </ul>
        </div>
        <div className="receipt-total-content">
          <div className="">
            <h3>TOTALT</h3>
            <p>inkl 20% moms</p>
          </div>
          <h2 className="sum">{totalSum} SEK</h2>
        </div>
      </div>
      <button className="order-button" onClick={handleNewOrder}>
        GÖR EN NY BESTÄLLNING
      </button>
    </div>
  );
};

export default Receipt;
