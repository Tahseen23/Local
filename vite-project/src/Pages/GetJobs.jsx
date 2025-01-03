import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import logo from "../logo/logo.bmp"
const GetJobs = () => {
  const user = useParams()
  const [jobs, setJobs] = useState(null)
  const username=useSelector(state=>state.sliceData.username)

  const getJobs = async () => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:8080/auth/role/jobs/${user.name}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      const data = await response.json()
      const j=data.jobs.filter(job => !job.completed);
      j.sort((a,b)=>new Date(a.date)-new Date(b.date))
      setJobs(j)
    } catch (err) {
      console.log(err)
    }
  }

  const completeClick=async (name)=>{
    const newJob={username:username,client:name}
    const token = localStorage.getItem('token');
    const url = 'http://localhost:8080/auth/role/addComplete'
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newJob)
    })
    const res = await response.json()
    getJobs()
  }

  

  useEffect(() => {
    getJobs()
  }, [user])

  console.log(jobs)

  return (
<div className="flex flex-col gap-4">
  {jobs && jobs.map((item, index) => (
    <div className="bg-slate-800 p-10">
      <div className="flex flex-row justify-between items-center gap-10">
        <div className="flex flex-row gap-10">
          {item.profileLink.length!=0?(
            <img src={item.profileLink} alt="" className="w-20 h-25" />
          ):(
            <img src={logo} alt="" className="w-20 h-25" />
          )}
          
          <div className="flex flex-col gap-4">
            <div key={index+Math.random()} className="text-3xl">{item.name}</div>
            <div  key={index+Math.random()} className="text-1xl">{item.address}</div>
            <div  key={index+Math.random()} className="text-1xl">{item.date.slice(0,10)}</div>
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>completeClick(item.username)}>Completed</button>
      </div>
    </div>
  ))}
</div>

  )
}

export default GetJobs