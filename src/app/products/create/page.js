"use client";

import axios from "axios";
import { useState } from "react";

const Product = () => {
  
  
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [file,setFile] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: 1,
    price: 0,
    color: "#ff5611",
    company:"",
    category:""
  });

  const data = new FormData();
  data.set('data',JSON.stringify(formData));
  data.set('file',file);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/products`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        setMessage(response.data.message);
        setFormData({
            productName: "",
            quantity: 1,
            price: 0,
            color: "#ff5611",
            company:"",
            category:""
          })
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message)
    }
  };

  if(error || message){
        
    setTimeout(()=>{
        error?setError(null):setMessage(null);
    },3000)
    
  }

  return (
    <div className="product">
      <h1>Create a Product</h1>
      <form
        action=""
        className="flex flex-col form gap-5"
        onSubmit={handleSubmit}
        
      >
        <div className=" flex flex-col gap-5 ">
          <label htmlFor="productname">Product Name</label>
          <input
            type="text"
            name="productName"
            onChange={handleChange}
            value={formData.productName}
            placeholder="Enter your product Name"
          />
        </div>
        <div className=" flex flex-col gap-5 ">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            onChange={handleChange}
            value={formData.quantity}
            min={1}
            placeholder="Enter quantity"
          />
        </div>
        <div className=" flex flex-col gap-5">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            value={formData.price}
            min={0}
            placeholder="Enter price of product"
          />
        </div>
        <div className=" flex flex-col gap-5 ">
          <label htmlFor="color">Product Color</label>
          <input
            type="color"
            name="color"
            onChange={handleChange}
            value={formData.color}
            placeholder="Enter the color of product"
          />
        </div>
        <input type="file" name="image" onChange={(e)=> setFile(e.target.files[0])} />
        <div className=" flex flex-col gap-5 ">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            onChange={handleChange}
            value={formData.company}
            placeholder="Enter the company of product"
          />
        </div>
        <div className=" flex flex-col gap-5 ">
          <label htmlFor="color">Category</label>
          <input
            type="text"
            name="category"
            onChange={handleChange}
            value={formData.category}
            placeholder="Enter the category of product"
          />
        </div>
        {message && <div className="alert success">{message}</div>}
        {error && <div className="alert failure">{error}</div>}
        <button className="button">Create product</button>
       
      </form>
    </div>
  );
};

export default Product;
