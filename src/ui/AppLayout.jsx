import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import {Outlet} from 'react-router-dom'
import { useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout(){
    const navigation=useNavigation();
    const isLoading = navigation.state==='loading';
    console.log(navigation.state)
    return (<div className="grid h-screen grid-cols-1 grid-rows-[auto_1fr_auto] gap-2">
            <Header/>
            <div className="overflow-y-auto">
                <main className=" max-w-3xl mx-auto">
                    {isLoading?<Loader/>:<Outlet/>}
                </main>
            </div>

            <CartOverview/>
    </div>
    )
}