import { useNavigate } from "react-router-dom"
const Card = (value) => {
  const navigate=useNavigate()

  console.log(value)

  const handleClick = (username) => {
    navigate(`/user/${username}`)
  }
  return (
    <div onClick={()=>handleClick(value.data.username)} className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105  transition-all cursor-pointer px-2">
      <img src={value.data.image} />

      <div className="">
        {
          <div>
            <div className="absolute top-0 px-2 bg-black rounded-full">{value.data.ratings}</div>
            <div className=" py-1 px-4 flex flex-row  backdrop-blur-3xl  bg-black/60 gap-10"  >
            <div>{value.data.name}</div>
            <div>{value.data.occupation}</div>
          </div>
          </div>
          
        }
      </div>

    </div>
  )

}
export default Card