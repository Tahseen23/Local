import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import logo from "../logo/logo.bmp"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setHistory } from "../app/store/slice"


const DetailsPage = () => {
  const username = useParams()
  const [comm, setComm] = useState(null)
  const [text, setText] = useState('')
  const [jobs, setJobs] = useState('')
  const dispatch = useDispatch()
  const profileLink = useSelector(state => state.sliceData.isProfileLink)
  const client = useSelector(state => state.sliceData.isClient)
  const userClient = useSelector(state => state.sliceData.username)
  const name = useSelector(state => state.sliceData.name)
  const address = useSelector(state => state.sliceData.address)
  const navigate = useNavigate()
  const history = useSelector(state => state.sliceData.history)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  // console.log(history)


  const isPresent = history.some(worker => worker.username === username.name);
  // console.log(isPresent)

  const handleChange = (e) => {
    const text = e.target.value;
    setText(text)
  }

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


  const getComments = async () => {
    const token = localStorage.getItem('token');
    const url = `http://localhost:8080/auth/role/comments/${username.name}`;
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
        const comments = data.comments
        comments.sort((a, b) => new Date(b.date) - new Date(a.date))
        setComm(comments);
      } else {
        console.error("Fetch error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleAdd = async () => {
    const newWorker = { profile: result.user.image, role: result.user.occupation, name: result.user.name, username: result.user.username, client: userClient }
    console.log(newWorker)
    const token = localStorage.getItem('token');
    const url = 'http://localhost:8080/auth/role/addWorker'
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newWorker)
    })
    const res = await response.json()
    dispatch(setHistory(res.mark))
    addJob()
  }


  const addJob = async () => {
    const newJob = { address: address, name: name, client: result.user.username, username: userClient, profileLink: profileLink }
    console.log(newJob)
    const token = localStorage.getItem('token');
    const url = 'http://localhost:8080/auth/role/addjobs'
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newJob)
    })
    const res = await response.json()
  }

  const handleAddComments = async () => {
    const newComment = { text: text, username: userClient, worker: username.name }
    const token = localStorage.getItem('token');
    const url = 'http://localhost:8080/auth/role/addComments'
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newComment)
    })
    const res = await response.json()
    const comments = res.mark
    comments.sort((a, b) => new Date(b.date) - new Date(a.date))
    setComm(comments);
    setText('')

  }

  const getJobs = async () => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:8080/auth/role/jobs/${username.name}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      const data = await response.json()
      const j = data.jobs.filter(job => job.completed);
      j.sort((a, b) => new Date(b.date) - new Date(a.date))
      console.log(j)
      setJobs(j)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    if (username?.name) {
      getData();
      getComments()
      getJobs()
    }
  }, [username]);

  // console.log(comm)




  return (
    <div>

      {result ? <div>
        <div className="grid grid-cols-2 gap-5  px-8  pt-10">
          <div className=" w-60 h-88 border  flex items-center justify-center  ">
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
                    <button className="bg-gray-400 w-24 h-8 rounded-md cursor-not-allowed">
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
          <div className="border pt-10">
            <div className="flex flex-col justify-center ">
              <h1 className="text-5xl text-center pb-5">Comments</h1>
              <hr />
              <div className="flex flex-col gap-2 p-5">
                {client &&

                  <div className="flex flex-row gap-1 rounded-md ">
                    <input type="text" className="w-full h-10 p-2" value={text} onChange={handleChange} />
                    <button className="bg-red-600 w-10 rounded-sm " onClick={handleAddComments}>Post</button>
                  </div>}

                <div>
                  {comm && comm.map((item, index) => (
                    <div className="flex flex-col p-3 ">
                      <div className="p-2 bg-slate-600 rounded flex flex-row gap-2 ">
                        <p key={index + Math.random()}>{item.username} :</p>
                        <h1 key={index + Math.random()}> {item.text}
                        </h1>
                      </div>

                    </div>

                  ))}


                </div>



              </div>

            </div>
          </div>

          <div>
            {!client &&
            <div className="border pt-10">
            <div className="flex flex-col justify-center ">
              <h1 className="text-5xl text-center pb-5">Past Work</h1>
              <hr />
              <div className="flex flex-col gap-2 p-5">


                <div>
                  { jobs && jobs.map((item, index) => (
                    <div className="flex flex-col p-3 bg-slate-600 rounded ">
                      <div className="flex flex-row gap-5  ">
                        {item.profileLink.length != 0 ? (
                          <img src={item.profileLink} alt="" className="w-10 h-15" />
                        ) : (
                          <img src={logo} alt="" className="w-20 h-25" />
                        )}

                        <div className="flex flex-col gap-4">
                          <div key={index + Math.random()} className="text-2xl">{item.name}</div>
                        </div>
                      </div>

                    </div>

                  ))}


                </div>



              </div>

            </div>
          </div>}
            

          </div>

        </div>
      </div> :
        <h1>Loding</h1>}
    </div>


  )





}

export default DetailsPage