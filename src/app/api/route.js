import { NextResponse } from "next/server";
import Connection from "../../lib/connection"

export const GET = () =>{

    const connection = Connection();
    
   if(connection){
    return NextResponse.json({message:"Successful"});
   }
}