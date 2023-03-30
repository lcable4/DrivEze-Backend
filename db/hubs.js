const client = require("./index");

async function createHub({ location }) {
    try {
        await client.connect();

        const
            {
                rows: [hub]
            }
                = await client.query(`
            INSERT INTO hubs(location)
            VALUES ($1)
            RETURNING *;
            `,
                    [location]
                );
        await client.release();

        return hub;
    }
    catch (e) {
        console.error(e);
    }
}

async function getAllHubs() {
    try {
        await client.connect();

        const
            {
                rows: hubs
            }
                = await client.query(`
            SELECT * FROM hubs;
        `);

        await client.release();

        return hubs;
    }
    catch (e) {
        console.error(e);
    }
}

async function getHubById(hubId) {
    try {
        await client.connect();

        const
            {
                rows: [hub]
            }
                = await client.query(`
            SELECT *
            FROM hubs
            WHERE id=$1;
            `,
                    [hubId]
                );
        await client.release();

        return hub;
    }
    catch (e) {
        console.error(e);
    }
}

async function getHubByLocation(location) {
    try {
        await client.connect();

        const
            {
                rows: [hub]
            }
            = await client.query(`
            SELECT *
            FROM hubs
            WHERE location=$1;
            `,
                    [location]
                );
        await client.release();

        return hub;
    }
    catch (e) {
        console.error(e);
    }
}

async function updateHub(hubId) {
    try {

    }
    catch (e) {
        console.error(e);
    }
}

async function deleteHub(hubId) {
    try {

    }
    catch (e) {
        console.error(e);
    }
}

async function deactivateHub(hubId) {
    try {

    }
    catch (e) {
        console.error(e);
    }
}

module.exports =
{
    createHub,
    getAllHubs,
    getHubById,
    getHubByLocation
}