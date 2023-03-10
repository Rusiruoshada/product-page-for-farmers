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

// -----------------------------------------------

// const movieSchema = new mongoose.Schema({
//   title: String,
//   year: Number,
//   score: Number,
//   rating: String,
// });

// const Movie = mongoose.model("Movie", movieSchema);
// const amadeus = new Movie({title:'heelo',year:1223,score:9.2,rating:9});

// Movie.insertMany([
//   { title: "heelo1", year: 1223, score: 9.2, rating: 9 },
//   { title: "heelo2", year: 1823, score: 8.2, rating: 7 },
//   { title: "heelo3", year: 1723, score: 7.2, rating: 6 },
//   { title: "heelo4", year: 1623, score: 6.2, rating: 5 },
//   { title: "heelo5", year: 1523, score: 5.2, rating: 4 },
//   { title: "heelo6", year: 1423, score: 4.2, rating: 3 },
// ])
//   .then((data) => {
//     console.log("It worked");
//     // console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     require: true,
//     maxLength: 20,
//   },
//   price: {
//     type: Number,
//     require: true,
//     min: [0, "hello this is less than min"]
//   },
//   onSale: {
//     type: Boolean,
//     default: false
//   },
//   categories: [String],
//   qty: {
//     online: {
//       type: Number,
//       default: 0
//     },
//     offline: {
//       type: Number,
//       default: 0
//     },
//   },
//   size: {
//     type: String,
//     enum: ["S", "M", "L"]
//   },
// });

// productSchema.methods.greet = function () {
//   console.log("hello hiii howdy");
//   console.log(`-from ${this.name}`);
// };

// productSchema.statics.fireSale = function() {
//   return this.updateMany({},{onSale:true, price:0});
// }

// productSchema.methods.toggleOnsale = function () {
//   this.onSale = !this.onSale;
//   return this.save();
// }

// const Product = mongoose.model("Product", productSchema);

// const findProduct = async () => {
//   const foundProduct = await Product.findOne({ name: "Tire Pump" });
//   console.log(foundProduct)
//   await foundProduct.toggleOnsale();
//   console.log(foundProduct);
//   foundProduct.greet();
// };

// findProduct();

// Product.fireSale().then(res => console.log(res));

// const bike = new Product({
//   name: "Tire Pump",
//   price: 99,
//   color: "green",
//   categories: ["cycling", "reading", "runing", 123],
//   size: "S",
// });

// bike
//   .save()
//   .then((data) => {
//     console.log("It worked");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH JESS");
//     console.log(err);
//   });

// Product.findOneAndUpdate({name: 'Tire Pump'} , {price:102} , {new:true, runValidators: true})
//   .then((data) => {
//     console.log("It worked");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH JUESS");
//     console.log(err);
//   });

// const personSchema = new mongoose.Schema({
//   first: String,
//   last: String
// })

// personSchema.virtual('fullName').get(function () {
//   return `${this.first} ${this.last} `
// })

// personSchema.pre('save',async function() {
//   console.log('abot to save')
// })
// personSchema.post('save',async function() {
//   console.log('just saved')
// })

// const Person = mongoose.model('Person' , personSchema);

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
  const products = await Product.find({})
  res.render('products/index',{ products })
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































































































