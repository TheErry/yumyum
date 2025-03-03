import { useGetMenuQuery } from "../store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addItem } from "../store/orderSlice";
import { useNavigate } from "react-router-dom";
import "./pages.css";

function Menu() {
  const queryResult = useGetMenuQuery();
  const { data: menu, error, isLoading } = queryResult;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const navigate = useNavigate();

  if (isLoading) return <p>Laddar menyn...</p>;
  if (error) return <p>Kunde inte hämta menyn </p>;

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  if (!menu || !Array.isArray(menu.items)) {
    return <p>Ingen data tillgänglig eller fel i menyn.</p>;
  }

  const ingredientsList = [
    "kål",
    "morot",
    "salladslök",
    "chili",
    "tofu",
    "kantarell",
  ];

  const filteredMenu = selectedIngredient
    ? menu.items.filter((item) =>
        item.ingredients?.includes(selectedIngredient)
      )
    : menu.items;

  const handleIngredientClick = (ingredient) => {
    if (ingredient === selectedIngredient) {
      setSelectedIngredient(null);
    } else {
      setSelectedIngredient(ingredient);
    }
  };

  return (
    <>
      <div className="home-page-body">
        <div className="menu-content">
          <h1>MENY</h1>
          <div className="menu-list">
            <div className="amount-background">
              <p className="cart-amount">{cart.length}</p>
            </div>
            <div className="cart-container">
              <button
                className="cart-button"
                onClick={() => navigate("/order")}
              >
                <img src="assets/cart.png" />
              </button>
            </div>
            <ul>
              {filteredMenu.map((item) => (
                <li key={item.id}>
                  <div className="list-item">
                    <div className="list-top">
                      <h3>{item.name}</h3>
                      <div className="dots" />
                      <h3>{item.price} kr</h3>
                    </div>
                    <p>
                      {Array.isArray(item.ingredients)
                        ? item.ingredients.join(", ")
                        : ""}
                    </p>
                  </div>
                  <button
                    className="add-button"
                    onClick={() => handleAddToCart(item)}
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter-buttons">
            {ingredientsList.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => handleIngredientClick(ingredient)}
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
