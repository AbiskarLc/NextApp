
import ShowData from "../ShowData";

const getUserData = async (id) =>{

    try {
        
        const response = await fetch(`http://localhost:3000/api/user/${id}`,{
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

const UserData = async ({params}) =>{
    const data = await getUserData(params.userId)
    return(
        <>
        <ShowData user={data}/>
        
        </>
      
    )
}

export default UserData;