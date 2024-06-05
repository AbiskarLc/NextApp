import { users } from "@/utils/db";

const { NextResponse } = require("next/server");

export const GET = (request,content) =>{

    try {
        const data = users;
        const {userId} = content.params;
     
     
        const userData = data.find((user)=>{
     
               return user.id === Number(userId);
        })
        
        if(!userData){
     
            return NextResponse.json({message:"User with this id not found"});
        }
        
     return NextResponse.json(userData);
    } catch (error) {
        console.log(error);
    }
 
}



export const PUT = async (request,content) =>{
    try {
    const data = users;
    const {userId} = content.params;

    let body = await request.json();

    const {name,age,email} = body;
    if(!name || !age || !email){
        return NextResponse.json({message:"All fields are required"},{status:400})
    }
    const findUser = data.find((user,index)=>{
        return user.id === Number(userId);
    })

    if(!findUser){
        return NextResponse.json({message:"failed to get user"},{status:404})
    }
        
        
        return NextResponse.json({user:body,success:true});
    } catch (error) {
        return NextResponse.json({message:error.message});
    }


}


export const DELETE = (request,content) =>{

    try {
        
        const data = users;
        const {userId} = content.params;

        const userdata = data.find((user,index)=>{
                  return user.id === Number(userId)
        });


        if(!userdata){
            return NextResponse.json({message:"User not found"},{status:404})
        }

        return NextResponse.json({message:"User Deleted Successfully",userdata},{status:200})

    } catch (error) {
        return NextResponse.json({message: error.message},{status:500});
    }

} 