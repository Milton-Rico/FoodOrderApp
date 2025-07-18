import { use } from 'react';
import Modal from './Modal.jsx';
import Input from './Input.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { currencyFormatting } from '../util/formatting.js';
import { CartContext } from '../store/foodApp-context.jsx';
import useHttp from '../http.js';
import { submitOrder } from '../http.js';
import Error from './Error.jsx';

export default function Checkout() {
  const userProgressCtx = use(UserProgressContext);
  const { cartItems } = use(CartContext);

  const { isLoading, error, sendRequest } = useHttp(submitOrder);

  const totalPrice = cartItems.reduce(
    (accumulator, curretValue) =>
      accumulator + Number(curretValue.price) * curretValue.quantity,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    try {
      await sendRequest({
        order: { items: cartItems, customer: customerData },
      });
    } catch (err) {
      // sada
    }
  }

  let actions = (
    <>
      <button
        type='button'
        className='text-button'
        onClick={handleCloseCheckout}
      >
        Close
      </button>
      <button className='button'>Submit Order</button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }
  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={
        userProgressCtx.progress === 'checkout' ? handleCloseCheckout : null
      }
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatting.format(totalPrice)}</p>
        <Input label='Full name' id='name' type='text' />
        <Input label='E-mail Address' id='email' type='email' />
        <Input label='Street' id='street' type='text' />
        <div className='control-row'>
          <Input label='Postal Code' id='postal-code' type='text' />
          <Input label='City' id='city' type='text' />
        </div>

        {error && <Error title='Failed to submit order' message={error} />}
        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}
