const express = require("express");
const cartRouter = express.Router();

const {
  addCarToCart,
  getCartItemsByCartId,
  updateCarQuantity,
  removeCarFromCart,
  clearCart,
} = require("../db/cart-items");
const { getCartByUserId, createCart } = require("../db/cart");
const { requireUser } = require("./utils");
const {
  getCartByGuestId,
  addCarToGuestCart,
  getCartItemsByGuestCartId,
  updateGuestCarQuantity,
  removeCarFromGuestCart,
} = require("../db/guests");

// /api/cart/:userId/:carId
cartRouter.post("/", async (req, res, next) => {
  const { carId, price } = req.body;

  try {
    console.log(req.user.guest);
    if (req.user && !req.user.guest) {
      const userId = req.user.id;
      let userCart = await getCartByUserId(userId);
      console.log("usercart", userCart);
      if (!userCart && req.user) {
        userCart = await createCart(userId);
        console.log("usercart", userCart);
      }

      if (userCart) {
        const cartItem = await addCarToCart(carId, userCart.cartId, price);
        res.send(cartItem);
      }
    } else if (req.user.guest) {
      const guestId = req.user.guest.id;
      let cart = await getCartByGuestId(guestId);
      console.log(cart);
      const cartItem = await addCarToGuestCart(carId, cart.cartId, price);
      console.log(cartItem);
      res.send(cartItem);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
});

cartRouter.get("/", async (req, res, next) => {
  try {
    if (req.user && !req.user.guest) {
      const userId = req.user.id;
      const cart = await getCartByUserId(userId);
      if (cart) {
        const cartItems = await getCartItemsByCartId(cart.cartId);
        console.log(cartItems);
        res.send(cartItems);
      } else {
        const newCart = await createCart(userId);
      }
    } else if (req.user.guest) {
      const userId = req.user.guest.id;
      const cart = await getCartByGuestId(userId);
      if (cart) {
        console.log("here");
        const cartItems = await getCartItemsByGuestCartId(cart.cartId);
        console.log(cartItems);
        res.send(cartItems);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    throw e;
  }
});

cartRouter.patch("/", async (req, res, next) => {
  const { carId, quantity } = req.body;
  try {
    if (req.user && !req.user.guest) {
      const userId = req.user.id;
      let cart = await getCartByUserId(userId);
      if (!cart) {
        cart = await createCart(userId);
      }
      if (cart) {
        const car = await updateCarQuantity(carId, cart.cartId, quantity);
        res.send(car);
      }
    } else if (req.user.guest) {
      const userId = req.user.guest.id;
      let cart = await getCartByGuestId(userId);
      if (cart) {
        const car = await updateGuestCarQuantity(carId, cart.cartId, quantity);
        res.send(car);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    throw e;
  }
});

cartRouter.delete("/", async (req, res, next) => {
  const { carId } = req.body;
  try {
    if (req.user && !req.user.guest) {
      const userId = req.user.id;
      const cart = await getCartByUserId(userId);
      if (cart) {
        const removed = await removeCarFromCart(carId, cart.cartId);
        res.send(removed);
      }
    } else if (req.user.guest) {
      const userId = req.user.guest.id;
      const cart = await getCartByGuestId(userId);
      if (cart) {
        const removed = await removeCarFromGuestCart(carId, cart.cartId);
        res.send(removed);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    throw e;
  }
});

cartRouter.delete("/clear-cart/:cartId", async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const clearedCart = await clearCart(cartId);
    if (clearedCart) {
      res.send(clearedCart);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = cartRouter;
