const client = require("./index");

//this function will add a car to the users cart along with its price
async function addCarToCart(carId, cartId) {
  try {
    await client.connect();

    const {
      rows: [cartItem],
    } = await client.query(
      `
            INSERT into cart_items (cartId, carId, price)
            SELECT $1, $2, price
            FROM cars
            WHERE id=2
            RETURNING *
            `,
      [cartId, carId]
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
            DELETE FROM cart_items WHERE carId=$1 AND cartId=$2
            `,
      [carId, cartId]
    );

    await client.release();

    return cartItem;
  } catch (error) {
    console.error(error);
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
        WHERE carId=$2 AND cartId=$3
        RETURNING *;
        `,
      [quantity, carId, cartId]
    );

    await client.release();
    return cartItem;
  } catch (error) {
    console.error(error);
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
        WHERE cartId = $1
        `,
      [cartId]
    );

    await client.release();
    return cartItems;
  } catch (error) {
    console.error(error);
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
        WHERE cartId=$1
        RETURNING *
        `,
      [cartId]
    );
    await client.release();
    return cart;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  addCarToCart,
  removeCarFromCart,
  updateCarQuantity,
  getCartItemsByCartId,
  clearCart,
};
