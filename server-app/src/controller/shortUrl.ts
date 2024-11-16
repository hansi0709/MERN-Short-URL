import express from "express";
import { urlModel } from "../model/shortUrl";

//Express-based controller

//doesn’t return a value directly, but sends responses to the client via res
//req obj=> express.Request variable
export const createUrl = async (req:express.Request, res: express.Response) => {
    try{
        console.log("The fullUrl is ", req.body.fullUrl);

        const {fullUrl} = req.body; //fullUrl => String (inferred by TypeScript)
        //You cannot change fullUrl to point to a different value after it's declared (reassign it), 
        //but the content of req.body itself is still mutable (you can modify properties of req.body).
        // objects or arrays => constant is the reference to the object.

        const urlFound = await urlModel.find({fullUrl}); //find - Mongoose method 
        if(urlFound.length > 0) //then no need to create short url again
        {
            res.status(409);
            res.send(urlFound);
        }
        else{
            const shortUrl = await urlModel.create({fullUrl}); //create - Mongoose method 
            res.status(201).send(shortUrl); //Express.js methods
        }
    }
    catch(error)
    {
        res.status(500).send({message: "Something went wrong!"});
    }
};

export const getAllUrl = async (req:express.Request, res: express.Response) => {
    try{
        const shortUrls = await urlModel.find().sort({createdAt: -1}); // -1 = desending order
        if(shortUrls.length < 0)
        {
            res.status(404).send({message: "Short urls not found!"});
        }
        else
        {
            res.status(200).send({shortUrls});
        }
    }
    catch(error)
    {
        res.status(500).send({message: "Something went wrong!"})
    }
};

export const getUrl = async (req:express.Request, res: express.Response) => { //only change click count
    try{
        const shortUrl = await urlModel.findOne({shortUrl: req.params.id}); //not _id bcz get what want to be updated
        //where the shortUrl field matches req.params.id  //searching for a document by its short URL.
        //  /short-url/abc123       //  req.params.id = /short-url/:id      //id = abc123
        //  "shortUrl": "abc123"
        if(!shortUrl)
        {
            res.status(404).send({message: "Short urls not found!"});
        }
        else
        {
            //res.status(404).send({message: "test2 !"});//crashed 

            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`); //redirect to the fullUrl
        }
    }
    catch(error)
    {
        res.status(500).send({message: "Something went wrong!"})
    }
};

export const deleteUrl = async (req:express.Request, res: express.Response) => {
    try{
        const shortUrl = await urlModel.findByIdAndDelete({_id: req.params.id}); //target a specific document uniquely identified by its _id.
        if(shortUrl)
        {
            res.status(200).send({message: "Requested url successfully deleted!"}); //204 doesnt work bcz 204 = no content
        }
    }
    catch(error)
    {
        res.status(500).send({message: "Something went wrong!"})
    }
};
