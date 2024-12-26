import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import logo from "../logo/logo.bmp"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const ClientPage=()=>{

  const username = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (! token) {
      navigate('/login');
    }
  }, [navigate]);

  const [result, setResult] = useState(null);

  const getData = async () => {
    const token = localStorage.getItem('token');
    const url = `http://localhost:8080/auth/user/${username.name}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
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

  // console.log(result)




  return (
    <div>

      {result ? <div>
        <div className="grid grid-cols-2 gap-2 px-8 pt-10">
          <div className=" w-60 h-88 border  flex items-center justify-center ">
            {result && result.user.image ? (
              <img className="" src={result.user.image} alt="Fetched content" />
            ) : (
              <img src={logo} alt="Fetched content" />
            )}
          </div>
          <div className="h-80">
            <div className="flex flex-row gap-40 align-middle">
              <h1 className="text-5xl pb-2">{result.user.name} </h1>
            </div>
            <br />
            <h1>Email: {result.user.email}</h1>
            <br />
            <h1>Address: {result.user.address}</h1>

          </div>
          <div className="flex flex-col pt-10">
            <h1 className="text-5xl">Past Workers</h1>
          </div>
        </div>
      </div> :
        <h1>Loding</h1>}
    </div>


  )


}

export default ClientPage