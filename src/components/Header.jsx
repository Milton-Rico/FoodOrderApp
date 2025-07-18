import { CartContext } from '../store/foodApp-context.jsx';
import { use } from 'react';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
  const { cartItems } = use(CartContext);
  const userProgressCtx = use(UserProgressContext);

  const totalCartItems = cartItems.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <>
      <header id='main-header'>
        <div id='title'>
          <img src='logo.jpg' alt='Food with a city on background' />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button className='text-button' onClick={handleShowCart}>
            Cart ({totalCartItems})
          </button>
        </p>
      </header>
    </>
  );
}
