import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
{
    alias: String,
    page: Object
}, 
{ 
    strict: false,           // allows any fields, even those not described in the schema
    collection: "page"       // explicitly specifies the collection
    }
);

export const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);