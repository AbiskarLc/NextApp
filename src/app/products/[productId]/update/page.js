"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateProduct = ({ params }) => {
  const router = useRouter();

  
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [image,setImage] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: 1,
    price: 0,
    color: "#ff5611",
    company: "",
    category: "",
  });
  const data = new FormData();
  data.set('data',JSON.stringify(formData))
  data.set('file',image)
  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/${params.productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        setFormData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/products/${params.productId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if(response.data){
        setMessage(response.data.message)
        // router.push("/products")
      }
    } catch (error) {
        console.log(error)
        setError(error.message)
    }
  };

  if (error || message) {
    setTimeout(() => {
      error ? setError(null) : setMessage(null);
    }, 3000);
  }

  console.log(data);
  return (
    <div className="product">
      <h1>Update Product</h1>
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
        <input type="file" name="file" onChange={(e)=> setImage(e.target.files[0])} />
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
        <button className="button">Update product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
