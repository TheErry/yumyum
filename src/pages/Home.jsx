import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTenant } from "../store/orderSlice";

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Välj ditt tenant-namn</h1>
      <input
        type="text"
        value={tenant}
        onChange={(e) => setTenantName(e.target.value)}
        placeholder="Ange tenant-namn"
        className="border p-2 rounded"
      />
      <button
        onClick={handleConfirm}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!tenant.trim()}
      >
        Bekräfta
      </button>
    </div>
  );
}

export default Home;
