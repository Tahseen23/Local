import Login from "../Pages/Login";
import ClientSignUp from "../Pages/ClientSignUp";
import WokerSignUp from '../Pages/WokerSignUp'
import Home from "../Pages/Home";
import App from "../App";
import Options from "../Pages/Options";
import {createBrowserRouter} from 'react-router-dom'
import DetailsPage from "../Pages/WorkerPage";
import SearchPage from "../Pages/SearchPage";
import Intermediate from "../Components/Intermediate";
import GetJobs from "../Pages/GetJobs";
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
        element:<Intermediate/>
      },
      {
          path:'/user/jobs/:name',
          element:<GetJobs/>
        
      },{
        path:'/search/:job',
        element:<SearchPage/>
      }
    ]
  }
])

export default router