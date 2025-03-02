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
    <div>
      <h2>KVITTO</h2>
      <p>Order-ID: {orderId}</p>
      {cart.length === 0 ? (
        <p>Varukorgen är tom</p>
      ) : (
        <ul>
          {Object.keys(groupedItems).map((itemName) => (
            <li key={itemName}>
              {itemName} - {groupedItems[itemName].quantity} st -{" "}
              {groupedItems[itemName].price} kr
            </li>
          ))}
        </ul>
      )}
      <p>Summa: {totalSum} kr</p>
      <button onClick={handleNewOrder}>Gör en ny beställning</button>
    </div>
  );
};

export default Receipt;
