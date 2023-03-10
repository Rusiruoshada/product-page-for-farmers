const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const url =
  "mongodb+srv://sample1:sample123@cluster0.5er8j14.mongodb.net/?retryWrites=true&w=majority";

function connectDB() {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongodb connected");
    }) 
    .catch((error) => {
      console.log(error);
      console.log("oops error");
    });
  return connectDB;
}

connectDB();


const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override')
const Product = require('./models/product');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const categories = ['fruit','vegetable', 'dairy'];

app.get("/products", async (req, res) => {
  const {category} = req.query;
  if(category) {
    const products =await Product.find({category})
    res.render('products/index', {products,category})
  }else {
    const products = await Product.find({})
    res.render('products/index',{ products,category: 'All' })
  }
});

app.get('/products/new',(req,res) => {
  res.render('products/new',{categories})
})

app.post('/products',async (req,res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id/edit' , async(req,res) => {
  const {id} = req.params;
  const product = await Product.findById(id)
  res.render('products/edit',{product, categories})
})

app.get('/products/:id', async (req,res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render('products/show', {product})
})


app.put('/products/:id', async(req,res) => {
  const {id} = req.params
  const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true}, {new:true})
  res.redirect(`/products/${product._id}`)

})

app.delete('/products/:id' , async (req,res) =>{
  const {id} = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id)
  res.redirect('/products');
})


app.listen(3000, () => {
  console.log("App is Listening on port 3000");
});
