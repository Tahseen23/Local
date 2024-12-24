import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import logo from "../logo/logo.bmp"
import { useSelector } from "react-redux"

const DetailsPage = () => {
  const username = useParams()
  const isClient=useSelector(state=>state.sliceData.isClient)


  const [result, setResult] = useState(null);

  const getData = async () => {
    const url = `http://localhost:8080/auth/user/${username.name}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        console.error("Fetch error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (username?.name) {
      getData();
    }
  }, [username]);

  console.log(result)




  return (
    <div>

    {result?<div>
      <div className="grid grid-cols-2 gap-2 px-8 pt-10">
        <div className=" w-60 h-88 border  flex items-center justify-center ">
          {result && result.user.image ? (
            <img className="" src={result.user.image} alt="Fetched content" />
          ) : (
            <img src={logo} alt="Fetched content" />
          )}
        </div>
        <div className="  h-80">
          <h1 className="text-5xl pb-2">{result.user.name} <span className="text-lg">{result.user.occupation}</span></h1>
          <h1>{result.user.bio}</h1>
          <h1>Price: {result.user.price} per visit</h1>
          <h1>Email: {result.user.email}</h1>
          <h1>Address: {result.user.address}</h1>

        </div>
        <div className="bg-zinc-500">03</div>
        <div className="bg-red-400">04</div>
      </div>
    </div>:
  <h1>Loding</h1>}
  </div>


  )





}

export default DetailsPage