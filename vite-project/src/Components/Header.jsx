import Divider from "./Divider"
import { useNavigate } from "react-router-dom"
import logo from '../assets/logo.png'
import { useSelector } from "react-redux"
const Header = () => {
  const navigate = useNavigate()
  const client = useSelector(state => state.sliceData.isClient)
  return (
    <div>
      <div>
        <div className="flex flex-row justify-between p-1 ">
          <img src={logo} alt="" width={100} className="cursor-pointer" onClick={() => {
            if (client) {
              navigate('/');
            }
          }} />
          <div className="flex flex-row gap-5 mr-5">
            <button className="border border-white  rounded px-4 py-1 h-10 mt-8" onClick={() => navigate('/login')}>Login</button>
            <button className="bg-white text-black  rounded px-4 py-1 h-10 mt-8" onClick={() => navigate('/options')}>SignUp</button>
          </div>
        </div>
      </div>
      <Divider></Divider>
    </div>
  )
}

export default Header