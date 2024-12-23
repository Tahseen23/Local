import { useParams } from "react-router-dom"
import { useEffect } from "react"

const DetailsPage = () => {
  const username = useParams()

  const getData = async () => {
    const url = `http://localhost:8080/auth/user/${username.name}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await response.json()
    console.log(result)
  }

  useEffect(() => {
    getData()
  }, [username])

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 px-8">
        <div className="bg-cyan-400 h-96 ">01</div>
        <div className="bg-gray-50 h-80">02</div>
        <div className="bg-zinc-500">03</div>
        <div className="bg-red-400">04</div>
      </div>
    </div>

  )





}

export default DetailsPage