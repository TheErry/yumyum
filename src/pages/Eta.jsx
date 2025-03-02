import { useSelector, useDispatch } from "react-redux";
import { useGetOrderByIdQuery } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/orderSlice";

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

  return (
    <div>
      <h1>Orderstatus</h1>
      <p>Order-ID: {orderId ?? "Ej tillgängligt"}</p>{" "}
      <p>Uppskattad leveranstid: {eta ?? "Ej tillgängligt"}</p>{" "}
      <button onClick={handleNewOrder}>Gör en ny beställning</button>
      <button onClick={handleReceipt}>Se kvitto</button>
    </div>
  );
}

export default Eta;
