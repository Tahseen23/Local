import { useEffect, useState } from "react"
import IfLoggedIn from "../Components/IfLoggedIn"
import IfNotLoggedIn from "../Components/IfNotLoggedIn"

const Home=()=>{
  const token=localStorage.getItem('token')
  const [logged,setLogged]=useState(false)

  useEffect(()=>{
    if (token){
      setLogged(true)
    }else{
      setLogged(false)
    }

  })

 
  return (
    <div>
      {logged?
      <IfLoggedIn/>:
      <IfNotLoggedIn/>}
    </div>
  )
}

export default Home