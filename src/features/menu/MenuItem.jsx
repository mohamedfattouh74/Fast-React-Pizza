import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addItem ,getQuantityByID} from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch()
  
  const currentQuantity= useSelector(getQuantityByID(id));
  
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));

  }

  return (
    <li className="flex gap-4 py-2 ">
      <img className={`h-24 ${ soldOut?'grayscale opacity-70':''}`} src={imageUrl} alt={name} />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm font-italic capitalize text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto text-sm flex items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          <div className="space-x-2">
          {currentQuantity>0 && <div className="flex items-center gap-3 sm:gap-8">
            <UpdateItemQuantity pizzaId={id}></UpdateItemQuantity>
            <DeleteItem pizzaId={id}></DeleteItem>
            </div>}
          {!soldOut && !currentQuantity>0 &&<Button onClick={handleAddToCart} type='small'>Add to cart</Button>}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
