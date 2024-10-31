import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const WokerSignUp = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const eyeToggle = () => {
    setShowPass(!showPass)
  }

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <img src={logo} width={100} alt="" className="p-1 cursor-pointer" onClick={() => navigate('/')} />
        <Link to={'/signup=client'} className='m-5'>Join as Client</Link>
      </div>
      <div className="flex flex-col justify-center items-center mt-28 gap-10 mb-5">
        <h1 className="text-5xl">Join as Worker</h1>
        <div>
          <form >

            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="name" name="name" placeholder="Enter your name..." />
            <br />

            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" placeholder="Enter your email..." />
            <br />

            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <div className="flex">

              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type={showPass ? "text" : "password"} name="password" placeholder="Enter your password" />

              <div className="-ml-6 mt-3 cursor-pointer" onClick={eyeToggle}>
                {showPass ?
                  <FaEye></FaEye> :
                  <FaEyeSlash />
                }
              </div>
            </div>
            <br />

            <label htmlFor="occupation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">occupation</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="occupation" name="occupation" placeholder="Enter your occupation..." />
            <br />

            <label htmlFor="AddBio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Bio</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="AddBio" name="AddBio" placeholder="Write About yourself" />
            <br />

            <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" type="file" name="image" placeholder="Enter your email..."   />

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

export default WokerSignUp