import { v2 as cloundinary } from "cloudinary"
import productModel from "../models/productModels.js"

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloundinary.uploader.upload(item.path, { resource_type: "image" })
        return result.secure_url
      }),
    )
    console.log("777", imagesUrl)

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? "true" : "false",
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    }

    console.log(productData)

    const product = new productModel(productData)
    await product.save()

    res.json({ success: true, messsage: "Product Added" })
  } catch (error) {
    console.log(error)
    res.json({ success: true, message: error.message })
  }
}

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.json({ success: true, products })
  } catch (error) {
    console.log(error)
    res.json({ success: true, message: error.message })
  }
}

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product Removed" })
  } catch (error) {
    console.log(error)
    res.json({ success: true, message: error.message })
  }
}

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body

    // шукаємо продукт
    const product = await productModel.findById(productId)
    if (!product) {
      return res.json({ success: false, message: "Product not found" })
    }

    // нові картинки (якщо є)
    const image1 = req.files?.image1?.[0]
    const image2 = req.files?.image2?.[0]
    const image3 = req.files?.image3?.[0]
    const image4 = req.files?.image4?.[0]

    const newImages = [image1, image2, image3, image4].filter(Boolean)

    let imagesUrl = product.image // за замовчуванням старі картинки

    if (newImages.length > 0) {
      imagesUrl = await Promise.all(
        newImages.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          })
          return result.secure_url
        }),
      )
    }

   
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        category,
        subCategory,
        price: Number(price),
        bestseller: bestseller === "true",
        sizes: sizes ? JSON.parse(sizes) : product.sizes,
        image: imagesUrl,
      },
      { new: true },
    )

    res.json({ success: true, message: "Product updated", product: updatedProduct })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.json({ success: true, product })
  } catch (error) {
    console.log(error)
    res.json({ success: true, message: error.message })
  }
}

export { addProduct, listProducts, removeProduct, editProduct, singleProduct }
