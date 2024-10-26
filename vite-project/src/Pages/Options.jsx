import { useState } from "react"
import { Link } from "react-router-dom"
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom"
const Options = () => {
  const navigate=useNavigate()
  const [option, setOption] = useState('')
  const [selectedOption, setSelectedOption] = useState('');

  const onClickWorker=()=>{
    setSelectedOption('worker')
    setOption('Apply as Worker')
  }

  const onClickClient=()=>{
    setSelectedOption('client')
    setOption('Join as Client')
  }

  return (
    <div>
      <img src={logo}  width={100} alt="" className="p-1 cursor-pointer" onClick={()=>navigate('/')} />
    <div className="flex flex-col justify-center items-center mt-28">
      <h1 className="mb-10 text-2xl">Join as Clinet or Worker</h1>
      <div className="flex flex-row justify-center items-center gap-10">
        <div
          className={`${selectedOption === 'worker' ? 'bg-blue-500 text-white' : 'bg-white text-black'
            } rounded px-4 py-2 h-10 hover:scale-105 cursor-pointer`}
          onClick={onClickWorker}
        >
          I want to join for Work
        </div>
        <div
          className={`${selectedOption === 'client' ? 'bg-blue-500 text-white' : 'bg-white text-black'
            } rounded px-4 py-2 h-10 hover:scale-105 cursor-pointer`}
          onClick={onClickClient}
        >
          I am client, hiring for work
        </div>
      </div>
      <button
        className={
          option
            ? "mt-8 bg-white text-black px-4 py-2 rounded"
            : "bg-gray-500 mt-8 px-4 py-2 rounded cursor-not-allowed"}
        disabled={!option}>
        {option ? option : 'Create Account'}
      </button>
      <div className="mt-8">Already have Account <span><Link to={'/login'} className="text-blue-700">Login</Link></span></div>
    </div>
    </div>
  )
}

export default Options