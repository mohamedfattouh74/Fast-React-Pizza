import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from 'react-router-dom'
import MenuItem from "./MenuItem";
import ProtectedRoute from "../../utilities/ProtectedRoute"
function Menu() {
  const menu =useLoaderData();
  
  return <ProtectedRoute>
    <ul className="divide-y divide-stone-200 px-2">{menu.map(pizza=>{
      return <MenuItem key={pizza.id} pizza={pizza} />
    })}</ul>;
    </ProtectedRoute>
}


export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
