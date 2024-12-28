import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
const GetJobs=()=>{
  const username=useParams()
  const [jobs,setJobs]=useState(null)

  const getJobs=async()=>{
    const token=localStorage.getItem('token')
    const url=`http://localhost:8080/auth/role/jobs/${username.name}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      const data=await response.json()
      setJobs(data.jobs)
  }catch(err){
    console.log(err)
  }

  useEffect(()=>{
    getJobs()
  },[username])
}

return (
  <div></div>
)
}

export default GetJobs