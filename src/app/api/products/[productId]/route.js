import Products from "@/utils/Models/Product";
import { NextResponse } from "next/server";
import {writeFile} from "fs/promises"

export const GET = async (request, content) => {
  const { productId } = content.params;

  try {
    const product = await Products.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const PUT = async (request, content) => {
  try {
    const { productId } = content.params;
    const data = await request.formData();
    const inputData = await data.get('data');
    const file = await data.get('file');
    const dataToBeUpdated = JSON.parse(inputData);
    const byteData = await file.arrayBuffer();
    const path = `./public/${file.name}`;
    const buffer = Buffer.from(byteData);
    await writeFile(path,buffer);
    dataToBeUpdated.productImage = file.name;

   
    const productToBeUpdated = await Products.findById(productId);

    if (!productToBeUpdated) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const updatedProduct = await Products.findByIdAndUpdate(productId, dataToBeUpdated, {
      new: true,
    });

    return NextResponse.json(
      { message: "Updated Successfully", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (request, content) => {
  try {
    const { productId } = content.params;

    const productToBeDeleted = await Products.findByIdAndDelete(productId);

    if (!productToBeDeleted) {
      return NextResponse.json(
        { message: "Failed to remove! Item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Product deleted successfully", product:productToBeDeleted });
  } catch (error) {
    console.log(error);
  }
};
