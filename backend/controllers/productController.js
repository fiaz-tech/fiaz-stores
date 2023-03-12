import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import ImageUpload from '../models/imageUpload.js'
//import { cloudinary } from '../cloudinary/index.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products);
})


// @desc    Fetch single product
// @route   GET /api/product
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product);
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}) 

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {

  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/imgs/lipstick.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'This is just a Sample description, to test hoe creating products work here',
    
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body
 

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const uploadImage = asyncHandler( async (req, res) => {
  const imageUploaded = new ImageUpload({
    name: "Image re ree",
    image: req.file.path
  });
  try{
    const createdimage = await imageUploaded.save();
    res.json(createdimage)
  }catch(error){
    return res.status(400).json({
      message: "image Upload failed",
      status: "error",
    })
  }
  
})


export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  uploadImage,
}