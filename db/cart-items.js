const client = require("./index");

//this function will add a car to the users cart along with its price
async function addCarToCart(carId, cartId, price) {
  try {
    await client.connect();

    const {
      rows: [cartItem],
    } = await client.query(
      `
            INSERT into cart_items ("cartId", "carId", price)
            SELECT $1, $2, $3
            FROM cars
            WHERE id=2
            RETURNING *
            `,
      [cartId, carId, price]
    );
    await client.release();

    return cartItem;
  } catch (error) {
    console.error(error);
  }
}

//removes a single car from the cart based on the carId
async function removeCarFromCart(carId, cartId) {
  try {
    await client.connect();

    const {
      rows: [cartItem],
    } = await client.query(
      `
            DELETE FROM cart_items WHERE "carId"=$1 AND "cartId"=$2
            RETURNING *;
            `,
      [carId, cartId]
    );

    await client.release();
    console.log(cartItem, "DB CART ITEMS");
    return cartItem;
  } catch (error) {
    console.error(error);
    console.log("Error occurred in removeCarFromCart:", error);
  }
}

//updates the quantity of a specific vehicle in the cart
async function updateCarQuantity(carId, cartId, quantity) {
  try {
    await client.connect();

    const {
      rows: [cartItem],
    } = await client.query(
      `
        UPDATE cart_items
        SET quantity=$1
        WHERE "carId"=$2 AND "cartId"=$3
        RETURNING *;
        `,
      [quantity, carId, cartId]
    );

    await client.release();
    return cartItem;
  } catch (error) {
    console.error(error);
    console.log("Error occurred in updateCarFromCart:", error);
  }
}

//This retrieves all items inside any given cart based on its ID
async function getCartItemsByCartId(cartId) {
  try {
    await client.connect();

    const {
      rows: [cartItems],
    } = await client.query(
      `
        SELECT *
        FROM cart_items
        WHERE "cartId" = $1
        `,
      [cartId]
    );

    await client.release();
    return cartItems;
  } catch (error) {
    console.error(error);
    console.log("Error occurred in getCarFromCart:", error);
  }
}

//Removes all items from a cart
async function clearCart(cartId) {
  try {
    await client.connect();

    const {
      rows: [cart],
    } = await client.query(
      `
        DELETE FROM cart_items
        WHERE "cartId"=$1
        RETURNING *
        `,
      [cartId]
    );
    await client.release();
    return cart;
  } catch (error) {
    console.log(error);
    console.log("Error occurred in clearCart:", error);
  }
}

module.exports = {
  addCarToCart,
  removeCarFromCart,
  updateCarQuantity,
  getCartItemsByCartId,
  clearCart,
};
