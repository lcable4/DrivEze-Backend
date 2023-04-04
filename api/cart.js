const express = require('express');
const cartRouter = express.Router();

const 
{
    addCarToCart,
} = require("../db/cart-items");
const 
{
    getCartByUserId
} = require("../db/cart")
const { requireUser } = require('./utils');

// /api/cart/:userId/:carId
cartRouter.post("/",  async(req, res, next)=>
{
    const {userId, carId, price} = req.body;

    try
    {
        const userCart = await getCartByUserId(userId);
        console.log("usercart", userCart)
        if(userCart)
        {
            const cartItem = await addCarToCart(carId, userCart.cartid, price);
            res.send(cartItem);
        }
        else{
            res.sendStatus(401)
        }
    }
    catch(e)
    {
        next(e);
    }

})

module.exports = cartRouter;