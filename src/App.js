import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { calculateTotals ,getCartItem } from "./featurs/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";

function App() {
  const dispatch = useDispatch();
  const { cartItems ,isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItem("gettig the cart item"))
  }, [])

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }
  
  return (
    <main>
      <Navbar />
      {isOpen && <Modal />}
      <CartContainer />
    </main>
  );
}
export default App;
