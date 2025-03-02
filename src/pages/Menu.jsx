import { useGetMenuQuery } from "../store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addItem } from "../store/orderSlice";
import CartModal from "../components/CartModal";

function Menu() {
  const queryResult = useGetMenuQuery();
  const { data: menu, error, isLoading } = queryResult;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

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

  return (
    <>
      <div>
        <h1>Menyn</h1>
        <button onClick={() => setCartOpen(true)}>
          🛒 Varukorg ({cart.length})
        </button>
        {cartOpen && <CartModal closeCart={() => setCartOpen(false)} />}
        <ul>
          {filteredMenu.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.ingredients}</p>
              <p>{item.type}</p>
              <p>Pris: {item.price} kr</p>
              <button onClick={() => handleAddToCart(item)}>+</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Filtrera efter ingredienser:</h3>
        {ingredientsList.map((ingredient) => (
          <button
            key={ingredient}
            onClick={() => setSelectedIngredient(ingredient)}
            style={{
              backgroundColor:
                selectedIngredient === ingredient ? "lightgreen" : "lightgray",
            }}
          >
            {ingredient}
          </button>
        ))}
        <button onClick={() => setSelectedIngredient(null)}>Visa alla</button>{" "}
      </div>
    </>
  );
}

export default Menu;
