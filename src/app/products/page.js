import axios from "axios";
import ProductItem from "./ProductItem";
import Button from "./Button";

const getAllAvailableProducts = async () =>{

    const response = await axios.get(`http://localhost:3000/api/products`,{
        withCredentials:true,
        headers:{
            "Content-Type":"application/json"
        }
    })

    return response.data;
}

const Products =async()=>{


    const products = await getAllAvailableProducts();
    console.log(products);
    return(
        <div className=" flex flex-col p-4">
        <div className="products">
        {
         products &&   products.map((product,index)=>{
            return <ProductItem key={product._id} product={product}/>
         })
        }
        </div>
        

        <div className="p-4">
           <Button/>
        </div>
        </div>
    )
}

export default Products;