import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfile: false,
  isProfileLink: null,
  username: '',
  bio: '',
  occupation: '',
  ratings: '',
  price: '',
  email: '',
  name: '',
  address:'',
  comments: [],
  history: [],
  isClient: true,
  isUserNamePresent:false,
  location:[]
};

export const slice=createSlice({
  name:'sliceData',
  initialState,
  reducers:{
    setEmail:(state,action)=>{
      state.email=action.payload
    },
    setusername:(state,action)=>{
      state.username=action.payload
    },
    setname:(state,action)=>{
      state.name=action.payload
    },
    setisProfile:(state,action)=>{
      state.isProfile=action.payload
    },
    setisProfileLink:(state,action)=>{
      state.isProfileLink=action.payload
    },
    setbio:(state,action)=>{
      state.bio=action.payload
    },
    setoccupation:(state,action)=>{
      state.occupation=action.payload
    },
    setratings:(state,action)=>{
      state.ratings=action.payload
    },
    setprice:(state,action)=>{
      state.price=action.payload
    },
    setComments:(state,action)=>{
      state.comments=action.payload
    },
    setHistory:(state,action)=>{
      state.history=action.payload
    },
    setisClient:(state,action)=>{
      state.isClient=action.payload
    },
    setisUserNamePresent:(state,action)=>{
      state.isUserNamePresent=action.payload
    },
    setaddress:(state,action)=>{
      state.address=action.payload
    },
    setLocation:(state,action)=>{
      state.location=action.payload
    }
  }

})

export const {setEmail,setprice,setratings,setoccupation,setbio,setisProfileLink,setisProfile,setusername,setname,setHistory,setComments,setisClient,setisUserNamePresent,setaddress,setLocation}=slice.actions

export default slice.reducer