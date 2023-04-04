const express = require('express');
const cartRouter = express.Router();

const 
{
    addCarToCart, getCartItemsByCartId, updateCarQuantity, removeCarFromCart,
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
            const cartItem = await addCarToCart(carId, userCart.cartId, price);
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

cartRouter.get("/", async(req, res, next)=>
{
    const {userId} = req.body;
    try
    {
        const cart = await getCartByUserId(userId);
        if(cart){
            const cartItems = await getCartItemsByCartId(cart.cartId);
            console.log(cartItems)
             res.send(cartItems);
        }
            
    }catch(e)
    {
        throw e;
    }
})

cartRouter.patch("/", async(req, res, next)=>
{
    const {userId, carId, quantity} = req.body;
    try
    {
        const cart = await getCartByUserId(userId);
        if(cart)
        {
            const car = await updateCarQuantity(carId, cart.cartId, quantity);
            res.send(car);
        }
    }
    catch(e)
    {
        throw e;
    }
})

cartRouter.delete("/", async(req, res, next)=>
{
    const{userId, carId} = req.body;
    try
    {
        const cart = await getCartByUserId(userId);
        if(cart)
        {
            const removed = await removeCarFromCart(carId, cart.cartId);
            res.send(removed);
        }
    }
    catch(e)
    {
        throw e;
    }
})





module.exports = cartRouter;