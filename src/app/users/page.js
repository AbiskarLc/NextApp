import Link from "next/link";

import style from "../page.module.css";
import Button from "./Button";
const getUserData = async () =>{

    try {
        
        const response = await fetch(`http://localhost:3000/api/user`,{
            headers:{
                "Content-Type":"application/json"
            },
        });

        if(response.ok){
            
            const data = await response.json();

            return data;
        }
    } catch (error) {
        console.log(error);
    }

}


const UserData =async () =>{
    const users = await getUserData();

    return(
        <div className=" flex flex-col gap-5">
            <h1>User Details</h1>

            {
                users.map((user,index)=>{
                    return <div key={index} className=" flex  justify-between user-data">
                        <Link href={`/users/${user.id}`}>{user.name}</Link>
                        <div className=" flex gap-5">
                        <Link className={style.textgreen} href={`/users/${user.id}/update`}>Edit</Link>
                        <Button id={user.id}/>
                        </div>
                        
                        </div>
                })
            }
           
        </div>
    )
}

export default UserData;