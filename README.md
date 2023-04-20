# DrivEze-Backend Api Docs

/api/users/

    POST /register
    Registers a new user to the database
    Headers:none,
    Body: username, password, email
    Returns: token


    POST /login
    Logins in a previously registered user
    Headers: none
    Body: username, password
    Returns: User auth token


    GET /me
    Gets the user information
    Headers: User auth token
    Body: none
    Returns: user objects without the password


/api/admin/

POST /login
Login in as admin
Headers: none
Body: username, password
Returns: Admin auth token


/api/cars/
   
    GET /
    Gets all the cars
    Headers: none
    Body: none
    Returns: array of cars


    GET /:id
    Gets a car based on the car's id
    Headers: none
    Body: none
    Returns: a single car based on the id


    POST /
    Adds a new car to the car table
    Headers: Admin auth token
    Body: {name, description, daily_rate, hubLocation}
    Returns: the added car


    DELETE /
    Deletes a car and all referances to the car from the car table
    Headers: Admin auth token
    Body: {carId}
    Returns: the deleted car


/api/hubs/

    GET /
    Gets all the hubs
    Headers: none
    Body: none
    Returns: array of hubs


    POST /
    Add a new hub
    Headers: Admin auth token
    Body: {location}
    Returns: created hub object


    PATCH /:hubId
    Update hub based on hubId
    Headers: Admin auth token
    Body: {location}
    Returns: updated hub object


    DELETE /:hubId
    Delete hub based on hubId
    Headers: Admin auth token
    Body: none
    Returns: message saying if delete was succes or not


    /api/inventory/
    GET /:hubId
    Get the inventory for a hub based on hubId
    Headers: none
    Body: none
    Returns: an array of cars in the inventory of the selected hub


    POST /:hubId
    Add a new car to a hub's inventory based on the hubId and carId
    Headers: Admin auth token
    Body: {carId}
    Returns: car object that was added to the inventory


/api/tags/

    GET /
    Get all the tags
    Headers: none
    Body: none
    Returns: an array of tags


    POST /
    Add a new tag to the tags table
    Headers: Admin auth token
    Body: {tagName}
    Returns: created tag object


    PATCH /:id
    Update a tag based on the tagId
    Headers: Admin auth token
    Body: {tagName}
    Returns: update tag object


    PATCH /deactivate/:id
    deactivates the tag based on tagId
    Headers: Admin auth token
    Body: none
    Returns: a message saying if the deactiviation was a success


    DELETE /:id
    Delete a tag based on the tagId
    Headers: Admin auth token
    Body: none
    Returns: a message saying if the delete was a success


/api/car-tags/

    POST /add-tag/:tagId/:carId
    Create a new car-tag
    Headers: Admin auth token
    Body: none
    Returns: the created car-tag object


    DELETE /delete/:tagId/:carId
    Deletes a car-tag from a car
    Headers: Admin auth token
    Body: none
    Returns: the removed car-tag


    GET /tags-by-car/:carId
    Gets the tags for a car based on the carId
    Headers: none
    Body: none
    Returns: an array of tags


    GET /cars-by-tags/:tagId
    Get the cars by tag based on the tagId
    Headers: none
    Body: none
    Returns: an array of cars


/api/cart

    GET /
    Get the users cart
    Headers: User auth token || NEED TO ADD Guest auth token
    Body: none
    Returns: an array of cart-items


    POST /
    Add a cart-item to a user's cart
    Headers: User auth token || NEED TO ADD Guest auth token
    Body: {carId, price}
    Returns: the added cart-item object


    PATCH /
    Update a cart-item in a user's cart
    Headers: User auth token || NEED TO ADD Guest auth token
    Body: {carId, quanitity}
    Returns: the updated car-item object


    DELETE /
    Delete the cart-item from the user's cart
    Headers: User auth token || NEED TO ADD Guest auth token
    Body: {carId}
    Returns: the deleted cart-item object
