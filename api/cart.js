const express = require('express');
const cartRouter = express.Router();

const 
{
    addCarToCart, getCartItemsByCartId, updateCarQuantity, removeCarFromCart,
} = require("../db/cart-items");
const 
{
    getCartByUserId, createCart
} = require("../db/cart")
const { requireUser } = require('./utils');

// /api/cart/:userId/:carId
cartRouter.post("/",  async(req, res, next)=>
{

    const {carId, price} = req.body;

    try
    {
        if(req.user)
        {
            const userId = req.user.id;
            let userCart = await getCartByUserId(userId);
            console.log("usercart", userCart)
            if(!userCart && req.user)
            {   
                userCart = await createCart(userId);
                console.log("usercart", userCart)
            }

            if(userCart)
            {
                const cartItem = await addCarToCart(carId, userCart.cartId, price);
                res.send(cartItem);
            }
        }
        else
        {
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
    try
    {
        if(req.user)
        {
            const userId = req.user.id;
            const cart = await getCartByUserId(userId);
            if(cart){
                const cartItems = await getCartItemsByCartId(cart.cartId);
                console.log(cartItems)
                res.send(cartItems);
            }
            else
            {
                const newCart = await createCart(userId);
            }
        }
        else
        {
            res.sendStatus(401);
        }    
    }
    catch(e)
    {
        throw e;
    }
})

cartRouter.patch("/", async(req, res, next)=>
{
    const {carId, quantity} = req.body; 
    try
    {
        if(req.user)
        {
            const userId = req.user.id;
        let cart = await getCartByUserId(userId);
        if(!cart)
        {
            cart = await createCart(userId);
        }
        if(cart)
        {
            const car = await updateCarQuantity(carId, cart.cartId, quantity);
            res.send(car);
        }
        }
        else
        {
            res.sendStatus(401);
        }
    }
    catch(e)
    {
        throw e;
    }
})

cartRouter.delete("/", async(req, res, next)=>
{
    const{carId} = req.body;
    try
    {
        if(req.user)
        {
            const userId = req.user.id;
            const cart = await getCartByUserId(userId);
            if(cart)
            {
                const removed = await removeCarFromCart(carId, cart.cartId);
                res.send(removed);
            }
        }
        else
        {
            res.sendStatus(401)
        }
    }
    catch(e)
    {
        throw e;
    }
})





module.exports = cartRouter;