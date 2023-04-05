const client = require("./index");
//create a guest user
async function createGuest(name)
{
    try
    {
        await client.connect();
        const{
            rows:[guest]
        } = await client.query(`
            INSERT INTO guests (name)
            VALUES($1)
            RETURNING id, name;
        `, [name]);
        await client.release();

        createGuestCart(guest.id);

        return guest;
    }
    catch(e)
    {
        console.error("Error creating a guest");
        throw e;
    }
}

async function createGuestCart(guestId)
{
    try
    {
        await client.connect();
        const
        {
            rows:[guestCart]
        } = await client.query(`
            SELECT guest_cart.id as "cartId"
            FROM guest_cart
            JOIN guests on guest_cart."guestId" = guests.id
            WHERE guests.id = $1;
        `, [guestId]);
        await client.release();
        return guestCart;
    }
    catch(e)
    {
        console.error("Error creating a guest cart");
        throw e;
    }
}

module.exports = {
    createGuest
}