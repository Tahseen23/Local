import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import logo from "../logo/logo.bmp"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
const ClientPage = () => {

  const username = useParams()
  const [ratings,setRating]=useState(0)
  const name=useSelector(state => state.sliceData.username)
  // console.log(name)
  const navigate = useNavigate()
  const [history, setHistory] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
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

  const handleChange = (e) => {
    setRating(e.target.value); // Update state with input value
  };


  async function getHistory(username) {
    try {
      const token = localStorage.getItem('token')
      const url = `http://localhost:8080/auth/role/history/${username}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      // console.log(data)
      const his=data.history
      his.sort((a, b) => new Date(b.date) - new Date(a.date))
      setHistory(his)
    } catch {
      console.log('Some Error Occured')
    }
  }

  useEffect(() => {
    if (username?.name) {


      getData();
      getHistory(username.name)
    }
  }, [username]);

   console.log(history)

  async function addRatings(worker,date) {
    const data={client:name,worker:name,date:date,ratings:ratings}
    const token = localStorage.getItem('token');
    const url = 'http://localhost:8080/auth/role/addRatings'
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newJob)
    })
    const res = await response.json()
    location.reload()
    
  }




  return (
    <div>

      {result ? <div >
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
            <h1 className="text-5xl p-2">Past Workers</h1>

            
          </div>
        </div>
        <div className=" p-10">
              {history && history.map((item, index) => (
                <div  className="flex flex-col p-5    bg-slate-600 rounded ">
                  <div  className="flex flex-row gap-5  ">
                    {item.profile.length != 0 ? (
                      <img src={item.profile} alt="" className="w-10 h-15" />
                    ) : (
                      <img src={logo} alt="" className="w-20 h-25" />
                    )}

                    <div className="flex flex-row gap-40">
                      <div key={index + Math.random()} className="text-2xl">{item.name}</div>
                      <div key={index + Math.random()} className="text-xl">{item.date.slice(0,10)}</div>
                      {!item.rated ? (
                        <div className="flex flex-row gap-2">
                          <input type="Number"  className="w-20 h-10 p-2" onChange={handleChange} value={ratings}/>
                          <button className="bg-red-400 w-10 h-10 rounded">Rate</button>
                        </div>
                        
                      ):(
                        <div>{item.ratings}</div>

                      )}
                    </div>
                  </div>

                </div>

              ))}


            </div>

      </div> :
        <h1>Loding</h1>}
    </div>


  )


}

export default ClientPage