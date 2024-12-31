import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setaddress, setHistory, setisClient, setisProfile, setisProfileLink, setname, setusername } from '../app/store/slice.js';


const Login = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const eyeToggle = () => {
    setShowPass(!showPass)
  }
  const dispatch=useDispatch()

  const [loginInfo,setLogInInfo]=useState({
    email:'',
    password:''
  })

  const handleChange=(e)=>{
    const {name,value}=e.target
    const copyInfo={...loginInfo}
    copyInfo[name]=value
    setLogInInfo(copyInfo)
  }

  async function getHistory(username){
    try{
      const token=localStorage.getItem('token')
      const url=`http://localhost:8080/auth/role/history/${username}`
      const response=await fetch(url,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'authorization': `Bearer ${token}`
        }
      })
      const data=await response.json()
      console.log(data)
      dispatch(setHistory(data.history))
    }catch{
      console.log('Some Error Occured')
    }
  }

  const handleLogIn=async(e)=>{
    e.preventDefault()
    const url='http://localhost:8080/auth/login'
    const response=await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(loginInfo)
    })

    const result=await response.json()
    const { sucess, message, jwtToken, profile, email,role ,username,address,name} = result


    if (sucess){
      localStorage.setItem('token',jwtToken)
      localStorage.setItem('loggedInUser',username)
      dispatch(setusername(username))
      dispatch(setname(name))
      dispatch(setaddress(address))

      if (profile.length!=0){
        dispatch(setisProfile(true))
        dispatch(setisProfileLink(profile))
      }else{
        dispatch(setisProfile(false))
      }


      if (role==='worker'){
        dispatch(setisClient(false))
        navigate('/user/'+username)
      }
      else{
        dispatch(setisClient(true))
        getHistory(username)
        navigate('/')

      }
      
    }

  }




  return (
    <div>
      <img src={logo} width={100} alt="" className="p-1 cursor-pointer" onClick={() => navigate('/')} />
      <div className="flex flex-col justify-center items-center mt-28 gap-10">
        <h1 className="text-5xl">LogIn</h1>
        <div>
          <form onSubmit={handleLogIn}>

            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" placeholder="Enter your email..." value={loginInfo.email} onChange={handleChange} />
            <br />

            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <div className="flex">

              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type={showPass ? "text" : "password"} name="password" placeholder="Enter your password" value={loginInfo.password} onChange={handleChange} />

              <div className="-ml-6 mt-3 cursor-pointer" onClick={eyeToggle}>
                {showPass ?
                  <FaEye></FaEye> :
                  <FaEyeSlash />
                }
              </div>

            </div>
            <br />
            <div className="flex flex-col items-center">
              <button className="bg-blue-700 rounded p-2 hover:text-neutral-500" type="submit">Login</button>
              <p className="mt-2">Don't have an account ?
                <Link to="/options" className="text-blue-700"> signUp</Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login