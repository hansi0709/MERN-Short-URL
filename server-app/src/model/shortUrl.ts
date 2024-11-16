import exp from "constants";
import mongoose from "mongoose";
import { nanoid } from "nanoid"; //Id that will create short url

//Mongoose schema
const shortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true, 
    },
    shortUrl: {
        type: String,
        required: true,
        default: () => nanoid().substring(0,10),
        //a function (from nanoid package)=> generates a unique, random string limited to 0-10
    },
    clicks: {
        type: Number,
        default: 0
    }
},
{
    //configuration object 
    timestamps: true, //auto adds 2 fields to each document: createdAt, updatedAt
}
);

export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);
//mongoose.model - creates a model for a MongoDB collection
//                  A model is a class that lets you create and retrieve documents from that collection.
//                  ShortUrl - name of the model.name of the collection in the MongoDB database
//shortUrlSchema - schema definition that outlines the structure of documents in the shorturls collection