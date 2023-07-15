
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '@/styles/Home.module.css'

const ProductForm = ({_id,title:initialTitle,description:initialDescription,price:initialPrice}) => {
  const router = useRouter()

  const [title, setTitle] = useState(initialTitle || '')
  const [description, setDescription] = useState(initialDescription || '')
  const [price, setPrice] = useState(initialPrice || '')
  const [navProducts,setNavProducts] = useState(false);


  const uploadProduct = async(ev) => {
    ev.preventDefault()
    const data = {title,description,price}
    if (_id) {
      await axios.put('/api/products', { ...data, _id })
    }
    else {
    await axios.post('/api/products', data)
    }
    setNavProducts(true)
  }
  if (navProducts) {
     router.push('/Products')
  }

  return (
      <form className={styles.form} onSubmit={uploadProduct}>
        <label>Product name</label>
        <input type='text' placeholder='product name' value={title} onChange={(ev)=>{setTitle(ev.target.value)}} />
        <label>Description</label>
        <textarea placeholder='description' value={description} onChange={(ev)=>{setDescription(ev.target.value)}} />
        <label>Price In KSH</label>
        <input type='number' placeholder='price' value={price} onChange={(ev)=>{setPrice(ev.target.value)}} />
        <button type="submit">Save</button>
        </form>
  )
}

export default ProductForm