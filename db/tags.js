const client = require('./index');

async function createTag(name)
{
    try
    {
        await client.connect();

        const
         {
            rows
        }
        = await client.query(`
        SELECT * FROM tags
        WHERE name = ($1);
        `,
        [name]
        );
        if(rows.length > 0)
        {
            console.log(`Tag with name "${name}" already exists`);
            return;
        } 
        const
        {
            rows:tag
        }
        = await client.query(`
            INSERT INTO tags(name)
            VALUES ($1)
            RETURNING id, name
            `,
            [name]
        );
        await client.release();
        return tag;
    }
    catch(e)
    {
        console.error(e);
    }
}

async function getAllTags()
{
    try
    {
        client.connect();

        const 
        {
            rows:tags
        }
        = await client.query(`
            SELECT * FROM tags
        `);
        
        await client.release();
        return tags;
    }
    catch(e)
    {
        console.error(e);
    }
}

async function getTagById(tagId)
{
    try
    {
        client.connect();

        const 
        {
          rows:[tags],
        }
        // selects all information from tags where the id is equal to $1
        = await client.query(` 
          SELECT *
          FROM tags
          WHERE "tagId" = $1;
        `,
        [tagId]
        );

        await client.release();
        // returns all the tag info from a specific tag based on the id its given
        return tags;  
    }
    catch(e)
    {
        console.error(e);
    }
}

async function updateTag({tagId, ...fields})
{
  try
  {
      const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index +1}`)
      .join(", ");

      await client.connect();

      const 
      {
          rows:[tags],
      }
      = await client.query(`
          UPDATE tags
          SET ${setString}
          WHERE id=${tagId}
          RETURNING *;
      `,
      [...fields]
      );

      await client.release();

      return tags;
  }
  catch(e)
  {
      console.error(e);
  }
}

async function deactivteTag(tagId)
{
    try
    {
        
    }
    catch(e)
    {
        console.error(e);
    }
}

module.exports = {
    createTag,
    getAllTags,
    getTagById,
    
}