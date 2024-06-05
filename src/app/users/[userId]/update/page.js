"use client"
import axios from "axios";
import { useState,useEffect } from "react";


 const UpdateUser = ({params}) =>{
const [error,setError] = useState(null);
const [user,setUser] = useState({
    name:"",
    email:"",
    age: ""
})

useEffect(()=>{
getUserData();
},[])



const getUserData = async () =>{

    try {
        
        const response = await axios.get(`http://localhost:3000/api/user/${params.userId}`,{

            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });

        if(response.data){

            if(response.data.message){
                setError(response.data.message);
            }else{

                setUser(response.data);
            }
           
        }
    } catch (error) {
       console.log(error)
    }
}




const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };


if(error){
    setTimeout(()=>{
        setError(null);
    },3000)
}

console.log(user)
    return(
        <div className="create-user">
      <div>
        <h1>Update User</h1>
        <form className="form-data" >
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              value={user.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="text"
              name="age"
              placeholder="Enter your name"
              onChange={handleChange}
              value={user.age}
            />
          </div>
          <button type="submit" className="button">
            Update User
          </button>
          {
            error?
            <div className="alert">
                {error}
            </div>:<></>
          }
        </form>
      </div>
    </div>
    )
}

export default UpdateUser;