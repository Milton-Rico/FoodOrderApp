import { use } from 'react';
import { CartContext } from '../store/foodApp-context.jsx';
import { currencyFormatting } from '../util/formatting.js';
import Modal from './Modal.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Cart() {
  const userProgressCtx = use(UserProgressContext);
  const { cartItems, updateItemQuantity } = use(CartContext);
  const totalPrice = cartItems.reduce(
    (accumulator, curretValue) =>
      accumulator + Number(curretValue.price) * curretValue.quantity,
    0
  );

  const cartQuantity = cartItems.length;

  let modalActions = (
    <button className='text-button' onClick={handleCloseCart}>
      Close
    </button>
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleShowCheckout() {
    userProgressCtx.showCheckout();
  }

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button className='text-button' onClick={handleCloseCart}>
          Close
        </button>
        <button className='button' onClick={handleShowCheckout}>
          Go to Checkout
        </button>
      </>
    );
  }

  return (
    <Modal
      className='cart'
      open={userProgressCtx.progress === 'cart'}
      onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      {cartItems.length === 0 && <p>No items in cart</p>}
      {cartItems.length > 0 && (
        <>
          <h2>Your Cart</h2>
          <ul>
            {cartItems?.map((item) => (
              <li key={item.id} className='cart-item'>
                <div>
                  <span>{`${item.name} - ${item.quantity} x ${item.price}`}</span>
                </div>
                <div className='cart-item-actions'>
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className='cart-total'>
        {currencyFormatting.format(totalPrice.toFixed(2))}
      </p>
      <p className='modal-actions'>{modalActions}</p>
    </Modal>
  );
}
