import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';
import ProtectedRoute from '../../utilities/ProtectedRoute';

function Cart() {
  const {username}= useSelector(store=>store.user)
  const {cart}= useSelector(store=>store.cart)
  const dispatch = useDispatch();

  function handleClearCart(){
    dispatch(clearCart());
  }

  if(cart.length==0) return <ProtectedRoute><EmptyCart></EmptyCart></ProtectedRoute>
  return (

    <ProtectedRoute>
      <div className='px-4 py-3'>
        <LinkButton to={"/menu"}>Back to menu</LinkButton>

        <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>
        <ul className='divide-y divide-stone-200 border-b mt-3'>
          {cart.map((cartItem)=>{
            return <CartItem item={cartItem} key={cartItem.pizzaId}></CartItem>
          })}
        </ul>
        <div className='mt-8 space-x-2'>
          <Button type='primary' to="/order/new">Order pizzas</Button>
          <Button onClick={handleClearCart} type='secondary'>Clear cart</Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Cart;
