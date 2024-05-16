import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import {store} from '../../store'
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddress } from "../user/userSlice";
import ProtectedRoute from "../../utilities/ProtectedRoute";


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const {username,address,position,error:errorAddress,status:addressStatus}= useSelector(store=>store.user)
  const navigation = useNavigation();
  const isSubmitting = navigation.state==='submitting';
  const [withPriority, setWithPriority] = useState(false);
  const {cart} = useSelector(state=>state.cart);
  const isLoadingAddress= addressStatus=='loading';
  const totalCartPrice= useSelector(getTotalCartPrice)
  const priorityPrice = withPriority? totalCartPrice*0.2:0
  const totalPrice=totalCartPrice+priorityPrice
  const formErrors=useActionData();
const dispatch = useDispatch()
  if(!cart.length) return <ProtectedRoute><EmptyCart></EmptyCart></ProtectedRoute>
  return (
    <ProtectedRoute>

    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>


      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 sm:shrink-0">First Name</label>
          <input className="input" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" placeholder="0118529421" required />
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 border bg-red-100 p-2 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input placeholder="New Cairo" disabled={isLoadingAddress} defaultValue={address} className="input" type="text" name="address" required />
            {addressStatus==='error' && <p className="text-xs mt-2 text-red-700 border bg-red-100 p-2 rounded-md">{errorAddress}</p>}

          </div>
          {!address && <span className="absolute right-[3px] top-[35px] sm:right-[5px] md:top-[5px] z-50">
            <Button disabled={isLoadingAddress} type='small' onClick={(e)=>{e.preventDefault();dispatch(fetchAddress())}}>Get position</Button>
          </span>}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
          className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          type="checkbox"
          name="priority"
          id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input type="hidden" name="lat" value={position.latitude ? position.latitude:''}></input>
          <input type="hidden" name="lng" value={position.longitude ? position.longitude:''}></input>
          <Button type='primary' disabled={isSubmitting}>{isSubmitting?'Placing Order...': `Order Now from ${formatCurrency(totalPrice)}`}</Button>
        </div>
        </Form>
    </div>
</ProtectedRoute>
  );
}

export async function action({request}){
  const formData= await request.formData();
  const data =Object.fromEntries(formData);
  console.log(data)
  const order = {...data,
  cart: JSON.parse(data.cart),
  priority:data.priority==='true',
  customer: `${data.lat}/${data.lng} , ${data.customer}`
}
console.log(order)

const errors={}
if(!isValidPhone(order.phone)) 
errors.phone='Please write correct Phone number.'

if(Object.keys(errors).length>0 ) return errors;

const newOrder=await createOrder(order);
store.dispatch(clearCart())
return redirect(`/order/${newOrder.id}`)

}

export default CreateOrder;
