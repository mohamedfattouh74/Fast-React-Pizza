import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, getQuantityByID, increaseItemQuantity } from "./cartSlice";

export default function UpdateItemQuantity({pizzaId}){
    const dispatch = useDispatch();
    const currentQuantity= useSelector(getQuantityByID(pizzaId));

   return <div className="flex items-center gap-1 md:gap-3">
        <Button type='round' onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        <p className="text-sm font-medium">{currentQuantity}</p>
        <Button type='round' onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>

    </div>
}