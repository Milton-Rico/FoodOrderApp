import CartContextProvider from './store/foodApp-context.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Shop />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
