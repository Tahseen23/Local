import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Home from "../Pages/Home";
import App from "../App";
import Options from "../Pages/Options";
import {createBrowserRouter} from 'react-router-dom'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'',
        element:<Home />
      },
      {
        path:'/signup',
        element:<Signup />
      },
      {
        path:'/login',
        element:<Login />
      },
      {
        path:'/options',
        element:<Options />
      }
    ]
  }
])

export default router