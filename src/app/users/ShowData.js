"use client"
import Link from "next/link"


const ShowData = ({user}) => {
  return (
    <div >
    <p>Name:{user.name}</p>
    <p>Email:{user.email}</p>
    <p>Age:{user.age}</p>
   
</div>
  )
}

export default ShowData