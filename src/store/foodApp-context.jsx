import { createContext, useEffect, useState, useMemo } from 'react';
import {
  updateItemsInCart,
  fetchAvailableMeals,
  fetchAvailableOrder,
} from '../http.js';

export const CartContext = createContext({
  items: [],
  cartItems: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

export default function CartContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [meals, orders] = await Promise.all([
          fetchAvailableMeals(),
          fetchAvailableOrder(),
        ]);
        setAvailableMeals(meals);
        setItemsInCart(orders);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  async function handleAddItemToCart(id) {
    const newCartList = [...itemsInCart];
    const mealIndexInCart = newCartList.findIndex((item) => item.id === id);

    if (mealIndexInCart >= 0) {
      const existingMeal = newCartList[mealIndexInCart];

      const updatedMeal = {
        ...existingMeal,
        quantity: existingMeal.quantity + 1,
      };
      newCartList[mealIndexInCart] = updatedMeal;
    } else {
      const addNewItem = availableMeals.find((item) => id === item.id);
      if (!addNewItem) return; // Prevents errors if item not found

      newCartList.push({
        id: addNewItem.id,
        name: addNewItem.name,
        price: addNewItem.price,
        quantity: 1,
      });
    }
    const orders = await updateItemsInCart(newCartList);
    setItemsInCart(orders);
  }

  async function handleUpdateItemQuantity(productId, amount) {
    const newCartList = [...itemsInCart];
    const mealIndexInCart = newCartList.findIndex(
      (item) => item.id === productId
    );
    if (mealIndexInCart === -1) return;
    const existingMeal = newCartList[mealIndexInCart];

    const updatedMeal = {
      ...existingMeal,
      quantity: existingMeal.quantity + amount,
    };

    if (updatedMeal.quantity <= 0) {
      newCartList.splice(mealIndexInCart, 1);
    } else {
      newCartList[mealIndexInCart] = updatedMeal;
    }
    const orders = await updateItemsInCart(newCartList);
    setItemsInCart(orders);
  }

  const ctxValue = useMemo(
    () => ({
      items: availableMeals,
      cartItems: itemsInCart,
      addItemToCart: handleAddItemToCart,
      updateItemQuantity: handleUpdateItemQuantity,
    }),
    [availableMeals, itemsInCart]
  );

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
