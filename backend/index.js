require('dotenv').config();

const express = require('express'); // Import node packages
const { MongoClient } = require('mongodb');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const cors = require('cors');
const fuse = require('fuse.js');

const app = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI;
const secret = process.env.SECRET;

let db; // global db var for later use

app.use(express.json()); // Use cors and json middleware.
app.use(cors());

async function dbConnect(){ // Function to connect to mongo db server.
    let client = await MongoClient.connect(mongoUri)
        .catch(error => console.error('MongoDB Connection Error:', error));
    db = client.db(process.env.DB_NAME);
    console.log('Connected to MongoDB');
}

async function dbConnected(){ // Function that checks if db is connected
    if(db === undefined)
        return false;

    try{
        await db.command({ping:1});
        return true;
    }catch{
        return false;
    }
}

async function dbInit(){ // Function to confirm DB is connected before querying for data
    if(!(await dbConnected()))
        await dbConnect();
}

function jwtAuth(req, res, next) { // Middleware for JWT token, pulls info from Authorization bearer token.
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });
    try {
        req.user = jwt.verify(token, secret);
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

function jwtOptional(req, res, next) { // Middleware for JWT token, pulls info from Authorization bearer token.
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return next();
    try {
        req.user = jwt.verify(token, secret);
        next();
    } catch (err) {
        req.user = undefined;
        next();
    }
}

app.post('/account/register', async (req, res) => {
    try{
        await dbInit();

        const accounts = await db.collection('accounts'); // Grab accounts collection
        let newAccountData = req.body;

        if(newAccountData === undefined){ // Confirm it has a json body
            res.status(400).json({})
            return;
        }
        if(newAccountData.password === undefined || newAccountData.username === undefined || newAccountData.email === undefined){ // Validate registration data exists
            res.status(400).json({})
            return;
        }
        const usernameRegex = /^[a-zA-Z0-9]+$/; // Validate username
        if(!usernameRegex.test(newAccountData.username)){
            res.status(400).json({error: "Invalid username"})
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validate email
        if(!emailRegex.test(newAccountData.email)){
            res.status(400).json({error: "Invalid email address"})
            return;
        }
        if(await accounts.findOne({email: newAccountData.email})){ // Makes sure email isn't in use already
            res.status(409).json({error: 'An account with that email already exists'});
            return;
        }
        if(await accounts.findOne({username: newAccountData.username})){ // Makes sure username isn't in use already
            res.status(409).json({error: 'An account with that username already exists'});
            return;
        }

        let uuid = crypto.randomUUID(); // Generate a userid for the db. standard UUID
        let token = jwt.sign({_id: uuid, username: newAccountData.username},secret, { expiresIn: "1d" }) // Sign auth details into a jwt for use as the token
        let newAccount = { // Account object that goes into db
            _id: uuid,
            email: newAccountData.email,
            passwordHash: await bcrypt.hash(newAccountData.password, 12),
            username: newAccountData.username,
            createdAt: new Date(),
        }
        await accounts.insertOne(newAccount); // Push account to db
        res.status(200).json({token});
    }catch{
        res.status(500).json({ error: '500 Internal Server Error' });
    }
})

app.post('/account/login', async (req, res) => {
    try{
        await dbInit();
        const accounts = await db.collection('accounts');

        let loginData = req.body;

        if(loginData === undefined){
            res.status(400).json({})
            return;
        }
        if(loginData.password === undefined || loginData.email === undefined){ // Validate login info exists
            res.status(400).json({})
            return;
        }

        let account = await accounts.findOne({email:loginData.email}) // Search for account in DB
        if(!account){
            res.status(400).json({error: "Wrong credentials or account does not exist"})
            return;
        }
        if(await bcrypt.compare(await bcrypt.hash(loginData.password, 12),account.passwordHash)){
            res.status(400).json({error: "Wrong credentials or account does not match"})
            return;
        }

        let token = jwt.sign({_id: account._id, username: account.username},secret, { expiresIn: "1d" }) // Return jwt token with auth details
        res.status(200).json({token});

    }catch{
        res.status(500).json({ error: '500 Internal Server Error' });
    }
})

app.get('/account/info', jwtAuth, async (req, res) => {
    try{
        await dbInit();
        const accounts = await db.collection('accounts');

        let account = await accounts.findOne({$and:[{_id:req.user._id}, {username:req.user.username}]}); // Search for account using data from jwt middleware.
        if(!account){
            res.status(400).json({error: "Account does not exist"})
            return;
        }

        const {passwordHash, ...user} = account; // Pull password info out from response data
        res.status(200).json({user});

    }catch{
        res.status(500).json({ error: '500 Internal Server Error' });
    }
})

app.post('/account/update', jwtAuth, async (req, res) => {
    try{
        await dbInit();
        const accounts = await db.collection('accounts');

        let account = await accounts.findOne({$and:[{_id:req.user._id}, {username:req.user.username}]});
        if(!account){
            res.status(400).json({error: "Account does not exist"})
            return;
        }

        let newData = req.body; // Get new data from json body

        if(newData === undefined){
            res.status(400).json({})
            return;
        }

        let updateFields = {}; // Create an object with changed data.
        if (newData.bio !== undefined) updateFields.bio = newData.bio;
        if (newData.name !== undefined) updateFields.name = newData.name;
        if (newData.image !== undefined) updateFields.image = newData.image;

        await accounts.updateOne({ _id: req.user._id }, { $set: updateFields }); // Update the fields of the account

        res.status(200);

    }catch(error){
        console.log(error);
        res.status(500).json({ error: '500 Internal Server Error' });
    }
})

app.post('/recipe/new', jwtAuth, async (req, res) => {
    try{
        await dbInit();
        const accounts = await db.collection('accounts');
        const recipes = await db.collection('recipes');

        let account = await accounts.findOne({$and:[{_id:req.user._id}, {username:req.user.username}]}); // Find Account
        if(!account){
            res.status(400).json({error: "Account does not exist"})
            return;
        }

        let newData = req.body;

        if(newData === undefined){
            res.status(400).json({})
            return;
        }

        if(newData.name === undefined){
            res.status(400).json({error: "Missing recipe name"})
            return;
        }
        if(newData.description === undefined){
            res.status(400).json({error: "Missing recipe description"})
            return;
        } // Validate data from new recipe exists

        let uuid = crypto.randomUUID();
        let newRecipe = { // Create object for new recipe
            _id: uuid,
            name: newData.name,
            description: newData.description,
            owner: account._id,
            likes: 0,
            "public" : newData.public === true,
            createdAt: new Date(),
        }
        await recipes.insertOne(newRecipe); // Add recipe to db

        res.status(200).json({uuid});

    }catch(error){
        console.log(error);
        res.status(500).json({ error: '500 Internal Server Error' });
    }
})

app.get('/recipe/get/:id', jwtOptional, async (req, res) => {
    try{
        await dbInit();
        const recipes = await db.collection('recipes');
        let id = req.params.id; // Get recipe ID from params.
        if(id === undefined){
            res.status(400).json({})
            return;
        }
        let recipe = await recipes.findOne({_id:id}); // Attempt to find recipe
        if(!recipe){
            res.status(400).json({error: "Recipe does not exist"})
            return
        }
        if(!recipe.public && recipe.owner !== req.user?._id) { // Check if recipe is public or owned by user
            res.status(400).json({error: "Cannot access Recipe"})
            return;
        }

        res.status(200).json({recipe});

    }catch{
        res.status(500).json({ error: '500 Internal Server Error' });
    }
})

app.get('/recipe/getall',jwtAuth, async (req, res) => {
    try{
        await dbInit();
        const recipes = await db.collection('recipes');

        let id = req.user._id; // Get user id from params to search for
        if(id === undefined){
            res.status(400).json({})
            return;
        }
        let recipe = await recipes.find({owner:id}).toArray(); // Find all recipes with user id as owner
        if(!recipe || recipe.length === 0){
            res.status(400).json({error: "No recipes found"})
            return
        }

        res.status(200).json({recipe});

    }catch{
        res.status(500).json({ error: '500 Internal Server Error' });
    }
})

app.get('/recipe/popular', async (req, res) => {
    try {
        await dbInit();
        const recipes = await db.collection('recipes');

        let page = parseInt(req.query.page) || 0;
        if (page < 0) page = 0;

        const pageSize = 10;
        const skipCount = page * pageSize;

        const popularRecipes = await recipes.find({public: true}) // Sort Recipes by like/save count. And keep top 10, from current page count
            .sort({ likes: -1 })
            .skip(skipCount)
            .limit(pageSize)
            .toArray();

        res.status(200).json({ recipes: popularRecipes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '500 Internal Server Error' });
    }
});

app.get('/recipe/search/:name', jwtOptional, async (req, res) => {
    try {
        await dbInit();
        const recipes = await db.collection('recipes');

        const name = req.params.name; // Pull name / search term from params
        if (!name) {
            res.status(400).json({ error: 'Missing search term' });
            return;
        }

        const page = parseInt(req.query.page) || 0;
        const pageSize = 10;

        const allRecipes = await recipes.find({$or: [
                { public: true },
                { owner: req.user?._id }
            ]}).toArray(); // Grab all recipes that are public, or owned by user

        const fuseSearch = new fuse(allRecipes, { // Create a new fuse object for searching
            keys: ['name', 'description'],
            threshold: 0.4
        });

        const fuzzyResults = fuseSearch.search(name); // Perform fuzzy search for term in recipes

        const start = page * pageSize;
        const pagedResults = fuzzyResults.slice(start, start + pageSize).map(result => result.item); // Save top 10 results to array from current page #

        res.status(200).json({ results: pagedResults });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '500 Internal Server Error' });
    }
});

app.listen(port, async () => {
    if(db === undefined){
        await dbConnect();
    }
    console.log(`Server running on port ${port}`);
});
