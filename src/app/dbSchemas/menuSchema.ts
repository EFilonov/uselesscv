import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
{
    firstCategory: Number,
    menu: Array
  }, 
{ 
    strict: false,           // allows any fields, even those not described in the schema
    collection: "menu"       // explicitly specifies the collection
    }
);

export const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);