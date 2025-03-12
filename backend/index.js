require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI;
const secret = process.env.SECRET;

let db;

app.use(express.json());

async function dbConnect(){
    let client = await MongoClient.connect(mongoUri)
        .catch(error => console.error('MongoDB Connection Error:', error));
    db = client.db(process.env.DB_NAME);
    console.log('Connected to MongoDB');
}

async function dbConnected(){
    if(db === undefined)
        return false;

    try{
        await db.command({ping:1});
        return true;
    }catch{
        return false;
    }
}

async function dbInit(){
    if(!(await dbConnected()))
        await dbConnect();
}

app.post('/account/register', async (req, res) => {
    try{
        await dbInit();

        const accounts = await db.collection('accounts');
        let newAccountData = req.body;

        if(newAccountData === undefined){
            res.status(400).json({})
            return;
        }
        if(newAccountData.password === undefined || newAccountData.username === undefined || newAccountData.email === undefined){
            res.status(400).json({})
            return;
        }
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if(!usernameRegex.test(newAccountData.username)){
            res.status(400).json({error: "Invalid username"})
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(newAccountData.email)){
            res.status(400).json({error: "Invalid email address"})
            return;
        }
        if(await accounts.findOne({email: newAccountData.email})){
            res.status(409).json({error: 'An account with that email already exists'});
            return;
        }
        if(await accounts.findOne({username: newAccountData.username})){
            res.status(409).json({error: 'An account with that username already exists'});
            return;
        }

        let uuid = crypto.randomUUID();
        let token = jwt.sign({_id: uuid, username: newAccountData.username},secret, { expiresIn: "1d" })
        let newAccount = {
            _id: uuid,
            email: newAccountData.email,
            passwordHash: await bcrypt.hash(newAccountData.password, 12),
            username: newAccountData.username,
            createdAt: new Date(),
        }
        await accounts.insertOne(newAccount);
        res.status(200).json({token});
    }catch{
        res.status(500).json({ error: '500 Internal Server Error' });
    }
})

app.get('/account/login', async (req, res) => {
    try{
        await dbInit();
        const accounts = await db.collection('accounts');

        let loginData = req.body;

        if(loginData === undefined){
            res.status(400).json({})
            return;
        }
        if(loginData.password === undefined || loginData.email === undefined){
            res.status(400).json({})
            return;
        }

        let account = await accounts.findOne({email:loginData.email})
        if(!account){
            res.status(400).json({error: "Wrong credentials or account does not exist"})
            return;
        }
        if(await bcrypt.compare(await bcrypt.hash(loginData.password, 12),account.passwordHash)){
            res.status(400).json({error: "Wrong credentials or account does not match"})
            return;
        }

        let token = jwt.sign({_id: account._id, username: account.username},secret, { expiresIn: "1d" })
        res.status(200).json({token});

    }catch{
        res.status(500).json({ error: '500 Internal Server Error' });
    }
})

function jwtAuth(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });
    try {
        req.user = jwt.verify(token, secret);
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

app.get('/account/info', jwtAuth, async (req, res) => {
    try{
        await dbInit();
        const accounts = await db.collection('accounts');

        let account = await accounts.findOne({$and:[{_id:req.user._id}, {username:req.user.username}]});
        if(!account){
            res.status(400).json({error: "Account does not exist"})
        }

        const {passwordHash, ...user} = account;
        res.status(200).json({user});

    }catch{
        res.status(500).json({ error: '500 Internal Server Error' });
    }
})

app.listen(port, async () => {
    if(db === undefined){
        await dbConnect();
    }
    console.log(`Server running on port ${port}`);
});
