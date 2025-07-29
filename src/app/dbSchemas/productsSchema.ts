import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
{
    category: String,
    products: Array
}, 
{ 
    strict: false,           // allows any fields, even those not described in the schema
    collection: "products"   // explicitly specifies the collection
    }
);

export const Products = mongoose.models.Products || mongoose.model("Products", productsSchema);