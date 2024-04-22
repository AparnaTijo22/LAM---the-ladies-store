const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const path = require("path");
const cors = require('cors');

app.use(express.json());
app.use(cors()); // reactjs will connect to express server on port 4000


// Database connection with mongodb
mongoose.connect("mongodb+srv://aparnatijo22:OvRaRKIIIqTDtlHV@cluster0.ngu3gce.mongodb.net/lam");

// API Creation
app.get("/", (req,res) => {
    res.send("Server running successfully"); 
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating upload end point for uploading images


app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`,
    })
})

// Schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    new_price: {
        type: Number,
        require: true,
    },
    old_price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        default: "Hey this is the desc"
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },    
})

app.post('/addproduct', async (req,res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        description: req.body.description,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for removing product

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed Successfully");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema creation for user model

const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

// Creating Endpoint for registring the user

app.post('/signup', async (req, res) => {

    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success: false, errors: "Email already exists"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;        
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({success:true, token})

})

// Creating end point for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false,errors:"Incorrect Password"});
        }
    }
    else{
        res.json({success:false, errors:"Email does not exist"})
    }
})

// Creating end point for new collection data
app.get('/newcollection', async(req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collections fetched");
    res.send(newcollection)
})

// Creating endpoint for popular in skincare category
app.get('/popularinskincare', async(req, res)=>{
    let products = await Product.find({category:"skincare"});
    let popular_in_skincare = products.slice(0, 4);
    console.log("Popular in skincare fetched");
    res.send(popular_in_skincare);
})

// Creating endpoint for related products in skincare category
// app.get('/relatedproducts', async(req, res)=>{
//     let products = await Product.find({category:"skincare"});
//     let related_products = products.slice(0, 4);
//     console.log("Popular in skincare fetched");
//     res.send(related_products);
// })

app.get('/relatedproducts/:category', async(req, res)=>{
    const { category } = req.params;
    let products = await Product.find({ category });
    let related_products = products.slice(0, 4);
    res.send(related_products);
})


// Creating middleware for fetching the user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: "Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch(error){
            res.status(401).send({errors: "Please authenticate using a valid token"})
        }
    }
}

// Creating end points for adding data in cart data
app.post('/addtocart', fetchUser, async (req,res) => {
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Product Added");
})

// Creating end points to remove product from cart data
app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Product Removed");
})

// Creating end point to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))