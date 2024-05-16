import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./ui/Home"
import AppLayout from "./ui/AppLayout"
import Error from './ui/Error'

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    errorElement:<Error/>,
    children: [{
      path:'/',
      element:<Home/>
    },
    {
      path:'/menu',
      async loader() {
        let { loader } = await import("./features/menu/Menu");
        return loader();
      },
      errorElement:<Error/>,
      async lazy() {
        let Menu = await import("./features/menu/Menu");
        return { Component: Menu.default };
      },
    },
    {
      path:'/cart',
      async lazy(){
        let Cart = await import('./features/cart/Cart')
        return {Component:Cart.default}
      }
    },
    {
      path :'/order/new',
      async action({ request }) {
        let { action } = await import("./features/order/CreateOrder");
        return action({ request });
      },
      async lazy() {
        let CreateOrder = await import("./features/order/CreateOrder");
        return { Component: CreateOrder.default };
      },

    },
    {
      path: '/order/:orderId',
      async loader({ request, params }) {
        let { loader } = await import("./features/order/Order");
        return loader({ request, params });
      },
      async lazy() {
        let Order = await import("./features/order/Order");
        return { Component: Order.default };
      },
      errorElement:<Error/>,
    }]
  },
 
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
