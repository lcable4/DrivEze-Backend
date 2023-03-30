const client = require("./index");

async function addTagToCar(tagId, carId)
{
    try
    {
        await client.connect();

        const
        {
            rows:[car_tag]
        }
        = await client.query(`
            INSERT INTO car_tags("carId", "tagId")
            VALUES ($1, $2)
            ON CONFLICT("carId, "tagId") DO NOTHING;
            `,
            [carId, tagId]
        );
        await client.release();
        
        return car_tag;
    }
    catch(e)
    {
        console.error(e);
    }
}

async function removeTagFromCar(tagId, carId)
{
    
}

async function getTagsByCar(carId)
{

}

async function getCarsByTag(tagId)
{

}

module.exports =
{
    addTagToCar,
}
