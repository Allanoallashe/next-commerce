import Layout from '@/components/Layout'
import React, { useState } from 'react'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

const NewProducts = () => {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [navProducts,setNavProducts] = useState(false);


  const createProduct = async(ev) => {
    ev.preventDefault()
    const data = {title,description,price}
    await axios.post('/api/products', data)
    setNavProducts(true)
  }
  if (navProducts) {
     router.push('/Products')
  }

  return (
    <Layout>
      <form className={styles.form} onSubmit={createProduct}>
        <h2>New Product</h2>
        <label>Product name</label>
        <input type='text' placeholder='product name' value={title} onChange={(ev)=>{setTitle(ev.target.value)}} />
        <label>Description</label>
        <textarea placeholder='description' value={description} onChange={(ev)=>{setDescription(ev.target.value)}} />
        <label>Price In KSH</label>
        <input type='number' placeholder='price' value={price} onChange={(ev)=>{setPrice(ev.target.value)}} />
        <button type="submit">Save</button>
        </form>
    </Layout>
  )
}

export default NewProducts