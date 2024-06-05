import { users } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = () => {
  
  const data = users;

  return NextResponse.json(data, { status: 200 });
};

export const POST = async (request) => {
    
    try {
        let body = await request.json();

        const { name, email } = body;
      
        if (!name || !email) {
          return NextResponse.json(
            { message: "All fields are required" },
            { status: 404 }
          );
        }
        if (!name.match(/[a-zA-Z0-9]{4,}/)) {
          return NextResponse.json({ message: "Name should be at least 4 digits" });
        }
      
        if (
          !email.match(
            /^[a-zA-Z]+[a-zA-Z0-9]*(?:\W[a-zA-Z0-9])*[\w\W]*\@[a-zA-Z]{2,}\.[a-zA-Z]{2,3}$/
          )
        ) {
          return NextResponse.json({ message: "Not a valid Email" });
        }
      
        return NextResponse.json(body);
        
    } catch (error) {
        return NextResponse.json({message:error.message},{status:500});
    }
 
};

