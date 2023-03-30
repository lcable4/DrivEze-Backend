const client = require("./index");


async function createCar({ name, description, daily_rate, hubLocation })
{
    try{
        await client.connect();

        const
        {
            rows:[car]
        }
        = await client.query(`
        INSERT INTO cars(name, description, daily_rate, "hubLocation")
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
        [name, description, daily_rate, hubLocation]
        );
        await client.release();
        return car;
    }
    catch(e)
    {
        console.error(e);
    }
}

async function updateCar({carId, ...fields})
{
    try
    {
        const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index +1}`)
        .join(", ");

        await client.connect();

        const 
        {
            rows:[car]
        }
        = await client.query(`
            UPDATE cars
            SET ${setString}
            WHERE id=${carId}
            RETURNING *;
        `,
        [...fields]
        );

        await client.release();

        return car;
    }
    catch(e)
    {
        console.error(e);
    }
}

async function getAllCars()
{
    try
    {
        await client.connect();
        const
        {
            rows:[cars]
        }
        = await client.query(`
        SELECT *
        FROM cars;
      `)

        await client.release();

        return cars;
    }
    catch(e)
    {
        console.error(e);
    }
}

async function getCarById(carId)
{
    try
    {
        await client.connect();
        const
        {
            rows:[car]
        }
        = await client.query(`
        SELECT *
        FROM cars
        WHERE id=$1;
        `,
        [carId]
        );

        await client.release();

        return car;
    }
    catch(e)
    {
        console.error(e);
    }
}

async function getCarsByHubLocation(hubId)
{
    try
    {

    }
    catch(e)
    {
        console.error(e);
    }
}

async function getCarsByTag(tagId)
{
    try
    {

    }
    catch(e)
    {
        console.error(e);
    }
}

async function deleteCar(carId)
{
    try
    {
        await client.connect();

        const 
        {
            rows:[car]
        }
        = await client.query(`
         DELETE FROM cars
         WHERE id=$1
         RETURNING *;
        `,
         [carId]
        );

        await client.release();

        return car;
    }
    catch(e)
    {
        console.error(e);
    }
}

async function deactivateCar(carId)
{
    try
    {

    }
    catch(e)
    {
        console.error(e);
    }
}

module.exports = 
{
    createCar,
    updateCar,
    getAllCars,
    getCarById,
    getCarsByHubLocation,
    deleteCar, 
}