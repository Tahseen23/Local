import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams,Link } from "react-router-dom"
import logo from "../logo/logo.bmp"

const SearchPage = () => {
  const job = useParams()
  const location = useSelector(state => state.sliceData.location)
  const [data, setData] = useState()


  // console.log(url)


  const getJob = async () => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:8080/auth/role/jobs/${job.job}/${location[0].toString() + ',' + location[1].toString()}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    setData(data.sortedWorker)
    // console.log(data.sortedWorker)    
  }
  console.log(data)

  useEffect(() => {
    getJob()
  }, [job])


  return (
    <div>
      <div className="flex flex-col gap-4">
        {data && data.map((item, index) => (
          <div className="bg-slate-800 p-10" key={index}>
            <div className="flex flex-row gap-10">
              {item._doc.image.length !== 0 ? (
                <img src={item._doc.image} alt="" className="w-20 h-25" />
              ) : (
                <img src={logo} alt="" className="w-20 h-25" />
              )}
              <div className="flex flex-row justify-between flex-grow items-center">
                <div className="flex flex-col gap-3">
                  <Link to={`/user/${item._doc.username}`} className="text-2xl">{item._doc.name}</Link>
                  <div className="text-xl">{item._doc.address}</div>
                </div>
                <div className="text-xl text-right">Ratings: {item._doc.ratings}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default SearchPage