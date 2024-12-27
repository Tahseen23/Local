import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import logo from "../logo/logo.bmp"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setHistory } from "../app/store/slice"

const DetailsPage = () => {
  const username = useParams()
  const dispatch=useDispatch()
  const client = useSelector(state => state.sliceData.isClient)
  const userClient=useSelector(state=>state.sliceData.username)
  const navigate = useNavigate()
  const history=useSelector(state=>state.sliceData.history)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (! token) {
      navigate('/login');
    }
  }, [navigate]);
  console.log(history)


  const isPresent = history.some(worker => worker.username === username.name);
  console.log(isPresent)

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


  const handleAdd=async()=>{
    console.log(result)
    const newWorker={profile:result.user.image,role:result.user.occupation,name:result.user.name,username:result.user.username,client:userClient}
    console.log( newWorker)
    const token=localStorage.getItem('token');
    const url='http://localhost:8080/auth/role/addWorker'
    const response=await fetch(url,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
          'authorization': `Bearer ${token}`
      },
      body:JSON.stringify(newWorker)
    })
    const res=await response.json()
    dispatch(setHistory(res.mark))
    
  }


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
              <h1 className="text-5xl pb-2">{result.user.name} <span className="text-lg">{result.user.occupation}</span></h1>
              {client && (
                <div>
                  {isPresent ? (
                    <button  className="bg-gray-400 w-24 h-8 rounded-md cursor-not-allowed">
                       Booked
                    </button>
                  ) : (
                    <button onClick={handleAdd} className="bg-red-600 w-24 h-8 rounded-md">Book</button>
                  )}
                </div>
              )}

             

            </div>
            <h1>{result.user.bio}</h1>
            <br />
            <h1>Price: {result.user.price} per visit</h1>
            <h1>Email: {result.user.email}</h1>
            <h1>Address: {result.user.address}</h1>

          </div>
          <div className="flex flex-col pt-10">
            <h1 className="text-5xl">Comments</h1>
          </div>
        </div>
      </div> :
        <h1>Loding</h1>}
    </div>


  )





}

export default DetailsPage