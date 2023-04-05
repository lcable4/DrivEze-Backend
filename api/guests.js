const express = require("express");
const guestRoute = express.Router();

const jwt = require("jsonwebtoken");
const { createGuest } = require("../db/guests");
const {JWT_SECRET} = process.env;


guestRoute.post("/", async(req, res, next)=>
{
    const {name} = req.body;

    try
    {
        const guest = await createGuest(name);
        if(guest)
        {
        const token = jwt.sign(
            {
                id: guest.id,
                name,
                guest:true
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1w",
            }
        );
        res.send({message:"Guest Created", token,})
        }
        else
        {
            res.send("Error creating guest")
        }
    }
    catch(e)
    {
        throw e;
    }
});

module.exports = guestRoute;