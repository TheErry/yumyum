import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTenant } from "../store/orderSlice";
import "./pages.css";

function Home() {
  const [tenant, setTenantName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (tenant.trim()) {
      dispatch(setTenant(tenant));
      navigate("/menu");
    }
  };

  return (
    <div className="home-page-body">
      <div className="home-page-content">
        <h1 className="">VÄLKOMMEN TILL YUM YUM GIMME SUM!</h1>
        <img src="assets/logo.png" width={168} height={202} />
        <div className="text-input-div">
          <p className="margin-bottom">VEM ÄR DET SOM BESTÄLLER?</p>
          <input
            type="text"
            value={tenant}
            onChange={(e) => setTenantName(e.target.value)}
            placeholder="Ange ditt namn"
            className="name-input"
          />
          <button
            onClick={handleConfirm}
            className="name-button"
            disabled={!tenant.trim()}
          >
            Bekräfta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
