import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const IfLoggedIn=()=>{

  const navigate=useNavigate()
  const isClient=useSelector(state=>state.sliceData.isClient)
  const username=useSelector(state=>state.sliceData.username)
  useEffect(()=>{
    if (!isClient){
      navigate(`/user/${username}`)
    }
  })
}

export default IfLoggedIn