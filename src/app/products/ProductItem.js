"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";


const ProductItem = ({ product }) => {
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/products/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { productName, quantity, price, company, category,productImage } = product;
  return (
    <div className="product-Item">
      <h1>{productName}</h1>
      <Image src={`/${productImage}`} priority className="image" width={200} height={200} alt={`image of ${productImage}`}/>
      <p>Quantity: {quantity}</p>
      <p>Price: {price}</p>
      <p>Company: {company}</p>
      <p>Category: {category}</p>
      <div className=" flex gap-5">
        <Link href={`/products/${product._id}/update`}>Edit</Link>
        <p
          onClick={() => {
            handleDelete(product._id);
          }}
          className=" text-red underline"
        >
          Delete
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
