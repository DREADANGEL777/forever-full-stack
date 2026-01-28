import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { backendUrl } from "../App"
import { toast } from "react-toastify"
import { assets } from "../assets/admin_assets/assets"

const Edit = ({ token }) => {
  const { productId } = useParams()

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [oldImages, setOldImages] = useState([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.post(backendUrl + "/api/product/single", {productId})
      const p = res.data.product

      setName(p.name)
      setDescription(p.description)
      setPrice(p.price)
      setCategory(p.category)
      setSubCategory(p.subCategory)
      setBestseller(p.bestseller)
      setSizes(p.sizes)
      setOldImages(p.image)
    }

    fetchProduct()
  }, [productId])

 
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const res = await axios.put(`${backendUrl}/api/product/edit/${productId}`, formData, {
        headers: { token },
      })

      if (res.data.success) toast.success("Product updated")
      else toast.error(res.data.message)
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
      <p className="font-semibold">Edit product</p>

      
      <div className="flex gap-2">
        {[image1, image2, image3, image4].map((img, i) => (
          <label key={i}>
            <img
              className="w-20"
              src={img ? URL.createObjectURL(img) : oldImages[i] || assets.upload_area}
            />
            <input
              type="file"
              hidden
              onChange={(e) => [setImage1, setImage2, setImage3, setImage4][i](e.target.files[0])}
            />
          </label>
        ))}
      </div>

    
      <input value={name} onChange={(e) => setName(e.target.value)} />

     
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

      
      <div className="flex gap-2">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <p
            key={size}
            onClick={() =>
              setSizes((prev) =>
                prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
              )
            }
            className={`px-3 py-1 cursor-pointer ${
              sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
            }`}
          >
            {size}
          </p>
        ))}
      </div>

     
      <label>
        <input type="checkbox" checked={bestseller} onChange={() => setBestseller((p) => !p)} />
        Bestseller
      </label>

      <button className="bg-black text-white py-2 w-32">UPDATE</button>
    </form>
  )
}

export default Edit
