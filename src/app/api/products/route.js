import { NextResponse } from "next/server";
import Connection from "@/lib/connection"
import Products from "@/utils/Models/Product";
import {writeFile} from "fs/promises"
export const GET =async () =>{

    await Connection();

    try {

        const products = await Products.find();

        if(!products){
            return NextResponse.json({message:"Failed to fetch the available products"})
        }
        
        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
    }
    

}


export const POST = async (request) =>{
    
    await Connection();
    try {

        const data = await request.formData();
        const imagedata = await data.get('file');
        const inputData = await data.get('data');
        const body = JSON.parse(inputData);
        const byteData = await imagedata.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const path = `./public/${imagedata.name}`;
       await writeFile(path,buffer)


        // const body = await request.json();
        const newdata = {};
        const {productName,quantity,price,color,company,category} = body;

     if(productName){ newdata.productName = productName }
     if(quantity){ newdata.quantity = quantity }
     if(price){ newdata.price = price }
     if(color){ newdata.color = color }
     if(company){ newdata.company = company }
     if(category){ newdata.category = category }
     if(imagedata){ newdata.productImage = imagedata.name}


        const product = await  Products.create(newdata);

        if(!product){
             return NextResponse.json({message:"Failed to create a product"})
        }
         
        return NextResponse.json({message:"Product created Successfully"});
    } catch (error) {
         console.log(error);
    }
}
