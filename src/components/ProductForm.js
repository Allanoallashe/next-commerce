
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { BeatLoader } from 'react-spinners'
import { ReactSortable } from 'react-sortablejs'

const ProductForm = ({_id,title:initialTitle,description:initialDescription,price:initialPrice,images:existingImages}) => {
  const router = useRouter()

  const [title, setTitle] = useState(initialTitle || '')
  const [description, setDescription] = useState(initialDescription || '')
  const [price, setPrice] = useState(initialPrice || '')
  const [images,setImages] = useState(existingImages || [])
  const [navProducts, setNavProducts] = useState(false);
  const [isUploading,setIsUploading] = useState()


  const uploadProduct = async(ev) => {
    ev.preventDefault()
    const data = {title,description,price,images}
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

  const uploadImage = async(ev) => {
    const files = ev.target?.files
    if (files?.length > 0) {
      setIsUploading(true)
      const data = new FormData()
      for (const file of files) {
        data.append('file', file)
      }
      const res = await axios.post('/api/upload', data)
      console.log(res.data)
      setImages(oldImages => {
        return[...oldImages, ...res.data.links]
      })
      setIsUploading(false)
    }
  }

  const sortImages = (images) => {
    setImages(images)
  }

  return (
      <form className={styles.form} onSubmit={uploadProduct}>
        <label>Product name</label>
        <input type='text' placeholder='product name' value={title} onChange={(ev) => { setTitle(ev.target.value) }} />
      
        <label style={{marginBottom:'10px'}}>Images</label>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
          <ReactSortable style={{display:'flex',gap:8}} list={images} setList={sortImages}>
          {!!images?.length && images.map(link => (
            <div>
            <div style={{display:'flex',gap:5,background:'#fff', padding:5,marginBottom:'10px', height:150}} key={link}>
              <img style={{height:'100%',}} src={link} alt=''/>
            </div>
            </div>
          ))}
          </ReactSortable>
          {isUploading && (
            <div><BeatLoader color={'#fff'} speedMultiplier={0.8}/></div>
          )}
          <label style={
          { backgroundColor: '#fff', color: 'navy', padding: 6, borderRadius: 10, display: 'flex', flexDirection: 'column',width:72,height:54,alignItems:'center',cursor:'pointer' }
          }>
            <FontAwesomeIcon icon={faCloudArrowUp}/> 
              <p style={{marginTop:'6px'}}>Upload</p>
            <input onChange={uploadImage} type='file' hidden/>
          </label>
          {!images?.length && (
              <p>+Add Product Images</p>
            )}
        </div>
      
        <label>Description</label>
        <textarea placeholder='description' value={description} onChange={(ev) => { setDescription(ev.target.value) }} />
      
        <label>Price In KSH</label>
        <input type='number' placeholder='price' value={price} onChange={(ev) => { setPrice(ev.target.value) }} />
      
        <button type="submit">Save</button>
        </form>
  )
}

export default ProductForm