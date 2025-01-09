import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Card from "./Card"

const IfLoggedIn=()=>{

  const navigate=useNavigate()
  const isClient=useSelector(state=>state.sliceData.isClient)
  const username=useSelector(state=>state.sliceData.username)
  const data=useSelector(state=>state.sliceData.nearWorker)
  // console.log(data)


  useEffect(()=>{
    if (!isClient){
      navigate(`/user/${username}`)
    }
  })

  return (
    <div>
      <div className="text-2xl p-2">Workers Near You</div>
      
      {
        data && (
            data.map((value,index)=>{
              return (
                <Card data={value}/>
              )
              
            })
          
        )
      }
    </div>

  )
}

export default IfLoggedIn