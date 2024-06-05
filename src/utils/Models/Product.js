const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    company:{
      type:String,
      required: true
    },
    category:{
      type:String,
      required:true
    },
    productImage:{
      type:String,
    }
  },
  { timestamps: true }
);

const Products = mongoose.models.product || mongoose.model("product",productSchema);

export default Products;