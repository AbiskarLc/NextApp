"use client"

import { useRouter } from "next/navigation";


const Button = () => {

    const router = useRouter();
  return (
    <button className="button" onClick={()=> router.push("/products/create")}>Create a product</button> 
  )
}

export default Button