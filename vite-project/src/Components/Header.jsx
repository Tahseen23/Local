import Divider from "./Divider"
import { useNavigate } from "react-router-dom"
import logo from '../assets/logo.png'
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Example from "./DropDown"
import { FaSearchDollar } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate()
  const client = useSelector(state => state.sliceData.isClient)
  const username = useSelector(state => state.sliceData.username)
  const [search,setSearch]=useState('')
  const [show, setShow] = useState(false)
  const token = localStorage.getItem('token')
  const [user, setUser] = useState(false)
  
  const onChange=(e)=>{
    setSearch(e.target.value)
  }
  useEffect(() => {
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
    if (token && client) {
      setShow(true)
    }
  }, [token, client]);

  const handleSearch=()=>{
    navigate(`/search/${search}`)

  }

  return (
    <div>
      <div>
        <div className="flex flex-row justify-between p-1 ">
          <img src={logo} alt="" width={100} className="cursor-pointer" onClick={() => {
            if (client) {
              navigate('/');
            }
          }} />

          {show && (
            <div className="pt-8  flex flex-row gap-2">
              <input type="text" className="w-15 h-8 p-2 rounded-sm" value={search} onChange={onChange}/>
              <FaSearchDollar onClick={handleSearch} className="cursor-pointer w-6   h-10" />
            </div>
          )}


          {user ?
            <div className="flex flex-row gap-2 ">
              {
                !client &&
                <div className="pt-4">
                  <button className=" border border-white  rounded h-9 hover:text-fuchsia-700  w-20 " onClick={() => navigate(`/user/jobs/${username}`)} >Jobs</button>
                </div>

              }

              <div className="p-4">
                <Example />
              </div>
            </div>

            : <div className="flex flex-row gap-5 mr-5">
              <button className="border border-white  rounded px-4 py-1 h-10 mt-8" onClick={() => navigate('/login')}>Login</button>
              <button className="bg-white text-black  rounded px-4 py-1 h-10 mt-8" onClick={() => navigate('/options')}>SignUp</button>
            </div>}

        </div>
      </div>
      <Divider></Divider>
    </div>
  )
}

export default Header