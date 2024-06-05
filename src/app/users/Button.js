"use client"

import axios from "axios"



const Button = ({id}) =>{

    const handleClick = async (id) =>{

        try {
      
            const response = await axios.delete(`http://localhost:3000/api/user/${id}`,{
                withCredentials:true
            });

            if(response.data){
                console.log(response.data);
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <button className="button" onClick={()=>handleClick(id)}>Delete</button>
    )
}

export default Button;