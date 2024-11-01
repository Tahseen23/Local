import Login from "../Pages/Login";
import ClientSignUp from "../Pages/ClientSignUp";
import WokerSignUp from '../Pages/WokerSignUp'
import Home from "../Pages/Home";
import App from "../App";
import Options from "../Pages/Options";
import {createBrowserRouter} from 'react-router-dom'
import WorkerPage from "../Pages/WorkerPage";
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
        path:'/signup=client',
        element:<ClientSignUp />
      },
      {
        path:'/signup=worker',
        element:<WokerSignUp />
      },
      {
        path:'/login',
        element:<Login />
      },
      {
        path:'/options',
        element:<Options />
      },
      {
        path:'/user/:name',
        element:<WorkerPage/>
      }
    ]
  }
])

export default router