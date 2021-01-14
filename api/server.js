// Using the express server
const express = require('express')
// import express user-model with express & initthe express app
const User = require('./user-model');
const server = express();

// Start the app and configure it with the express json to read body req 1 day
server.use(express.json());


/*
Endpoint Specifications
When the client makes a POST request to /api/users:

If the request body is missing the name or bio property:

respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
If the information about the user is valid:

save the new user the the database.
respond with HTTP status code 201 (Created).
return the newly created user document.
If there's an error while saving the user:

respond with HTTP status code 500 (Server Error).
return the following JSON object: { errorMessage: "There was an error while saving the user to the database" }.
When the client makes a GET request to /api/users:

If there's an error in retrieving the users from the database:
respond with HTTP status code 500.
return the following JSON object: { errorMessage: "The users information could not be retrieved." }.
When the client makes a GET request to /api/users/:id:

If the user with the specified id is not found:

respond with HTTP status code 404 (Not Found).
return the following JSON object: { message: "The user with the specified ID does not exist." }.
If there's an error in retrieving the user from the database:

respond with HTTP status code 500.
return the following JSON object: { errorMessage: "The user information could not be retrieved." }.
When the client makes a DELETE request to /api/users/:id:

If the user with the specified id is not found:

respond with HTTP status code 404 (Not Found).
return the following JSON object: { message: "The user with the specified ID does not exist." }.
If there's an error in removing the user from the database:

respond with HTTP status code 500.
return the following JSON object: { errorMessage: "The user could not be removed" }.
When the client makes a PUT request to /api/users/:id:

If the user with the specified id is not found:

respond with HTTP status code 404 (Not Found).
return the following JSON object: { message: "The user with the specified ID does not exist." }.
If the request body is missing the name or bio property:

respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
If there's an error when updating the user:

respond with HTTP status code 500.
return the following JSON object: { errorMessage: "The user information could not be modified." }.
If the user is found and the new information is valid:

update the user document in the database using the new information sent in the request body.
respond with HTTP status code 200 (OK).
return the newly updated user document.
*/
// Endpoints
// [GET] /

/*
Method	URL	Description
POST	/api/users	Creates a user using the information 
sent inside the request body.
*/
server.post('/api/users', async(req,res) =>{
    const user = req.body;
    if(!user.name){
        res.status(400).json({message:'your name is required'})
    } else{
            // Database Reactions
        try{
            res.json({message:'name is'})
            const theUser = await User.create(user);
            res.status(201).json(theUser);
        } catch (error){
            // Error control
            res.status(500).json({message:error.message})
        } 
    } 

});

/*
GET	/api/users	Returns an array users.
*/
server.get('/api/users', (req,res) =>{
    User.findAll()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(error =>{
        res.status(500).json({message:error.message})
    })
})


/*
GET	/api/users/:id	Returns the user object with the
specified id.
*/
server.get('/api/users/:id', (req,res)=>{
    const {id} = req.params;
    User.findById(id)
        .then(user =>{
            if(!user){
                res.status(404).json({message: `user with id ${id} not found`})
            }else {
                res.status(200).json(user)
            }
        })
        .catch(error =>{
            res.status(500).json({message: error.message})
        })
})
// DELETE	/api/users/:id	Removes the user with the specified 
    // id and returns the deleted user.
server.delete('/api/users/:id', (req,res) =>{
    const { id} = req.params;
    User.delete(id)
        .then(deleted => {
            if (!deleted){
                res.status(404).json({message: `user with id ${id} not found`})
            }else {
                res.status(200).json(deleted)
            }
        })
        .catch( error =>{
            res.status(500).json({ message: error.message})
        }) 
})



/* 
PUT	/api/users/:id	Updates the user with the specified id 
using data from the request body. Returns the modified user
*/
server.put('/api/users/:id', async (req,res) =>{
    const id = req.params.id;
    const changes = req.body;
    if (!changes.name || !changes.bio || changes.id === undefined)
    {
        res.status(400).json({ message: 'all fields are requred'})
    } else {
        try{
            const updated = await User.update(id, changes)
            if(!updated) {
                res.status(404).json({message: `User with id ${id} not ever found in the records`})
            } else {
                res.status(200).json(updated)
            }
        } catch (error) {
            res.status(500).json( {message: error.message})
        }
    }
})


/* Get home*/
server.get('/', (req,res) => {
    res.json({message:'hello this is said to work'})
})





module.exports = server