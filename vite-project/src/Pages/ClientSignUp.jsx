import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { clientSignUp } from '../../../Server/Controllers/AuthControllers';


const ClientSignUp=()=>{
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const eyeToggle = () => {
    setShowPass(!showPass)
  }

  const [clientSign,setclientSign]=useState({
    name:'',
    username:'',
    email:'',
    password:'',
    address:'',
    image:null


  })

  const handleChange=(e)=>{
    const {name,value,files}=e.target
    if (name==='image'){
      setclientSign({...clientSign,[name]:files[0]})
    }else{
      setclientSign({...clientSign,[name]:value})
    }
  }

  const handleClientSignUp=async(e)=>{
    e.preventDefault()

    const {name,username,email,password,address,image}=clientSign
    console.log(name,username,email,password,image)
    try{
      const url='http://localhost:8080/auth/signup=clinet'
      const  formData=new FormData()
      formData.append('name',name)
      formData.append('email',email)
      formData.append('username',username)
      formData.append('password',password)
      formData.append('address',address)
      if (clientSign.image){
        formData.append('image',clientSign.image)
      }
      const response=await fetch(url,{
        method:'POST',
        body:formData
      })

      const result=await response.json()

      const {success,message}=result
      if (success){
        navigate('/login')
      }else{
        console.log(message)
      }

    }catch(err){
      console.log(err)

    }

  }


  return (
    <div>
      <div className='flex flex-row justify-between'>
        <img src={logo} width={100} alt="" className="p-1 cursor-pointer" onClick={() => navigate('/')} />
        <Link to={'/signup=worker'} className='m-5'>Join as Worker</Link>
      </div>
      <div className="flex flex-col justify-center items-center mt-28 gap-10 mb-5">
        <h1 className="text-5xl">Join as Client</h1>
        <div>
          <form onSubmit={handleClientSignUp}  >

            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="name" name="name" placeholder="Enter your name..." onChange={handleChange} value={clientSign.name} />
            <br />

            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="name" name="username" placeholder="Enter your unique username..." onChange={handleChange} value={clientSign.username} />
            <br />

            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" placeholder="Enter your email..." onChange={handleChange} value={clientSign.email} />
            <br />

            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <div className="flex">

              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type={showPass ? "text" : "password"} name="password" placeholder="Enter your password" onChange={handleChange} value={clientSign.password} />

              <div className="-ml-6 mt-3 cursor-pointer" onClick={eyeToggle}>
                {showPass ?
                  <FaEye></FaEye> :
                  <FaEyeSlash />
                }
              </div>
            </div>
            <br />

            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="address" name="address" placeholder="Enter your name..." onChange={handleChange} value={clientSign.address} />
            <br />

            <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" type="file" name="image" placeholder="Enter your email..." onChange={handleChange}  />

            <br />

            <div className="flex flex-col items-center">
              <button className="bg-blue-700 rounded p-2 hover:text-neutral-950" type="submit">Create my Account</button>
              <p className="mt-2">Already have an account ?
                <Link to="/login" className="text-blue-700"> Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ClientSignUp