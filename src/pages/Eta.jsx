import { useSelector, useDispatch } from "react-redux";
import { useGetOrderByIdQuery } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/orderSlice";
import "./pages.css";

function Eta() {
  const tenant = useSelector((state) => state.order.tenant);
  const orderId = useSelector((state) => state.order.orderId);
  const eta = useSelector((state) => state.order.eta);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, isLoading } = useGetOrderByIdQuery({ tenant, orderId });

  if (!orderId) {
    return <p>Ingen aktiv order hittades. Gå tillbaka till menyn.</p>;
  }

  if (isLoading) return <p>Laddar orderstatus...</p>;
  if (error) return <p>Kunde inte hämta orderstatus 😢</p>;

  const handleNewOrder = () => {
    navigate("/menu");
    dispatch(clearCart());
  };

  const handleReceipt = () => {
    navigate("/receipt");
  };

  const etaMinutes = new Date(eta);
  let minutes = etaMinutes.getMinutes();

  return (
    <div className="eta-body">
      <div className="eta-content">
        <img src="assets/box.png" className="wonton-img" />
        <h1>DINA WONTONS TILLAGAS!</h1>
        <p className="eta">ETA {minutes} MIN</p> <p>#{orderId}</p>{" "}
        <button className="order-button" onClick={handleNewOrder}>
          GÖR EN NY BESTÄLLNING
        </button>
        <button className="receipt-button" onClick={handleReceipt}>
          SE KVITTO
        </button>
      </div>
    </div>
  );
}

export default Eta;
