import { useParams } from "react-router-dom"

const WorkerPage=()=>{
  const email=useParams()

  const getData=async()=>{
    const url=`http://localhost:8080/auth/user/${email.name}`
    const response=await fetch(url,{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    })

    const result=await response.json()
    console.log(result)
  }
  getData()

  console.log(email.name)

  return (
    <div>Hello jdgsgu</div>

  )

  



}

export default WorkerPage