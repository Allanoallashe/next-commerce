
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { BeatLoader } from 'react-spinners'
import { ReactSortable } from 'react-sortablejs'

  const heading = {
  backgroundImage: 'linear-gradient(to right, #eb09b2, #b76df3, #659bff, #00bcff, #00d3ff, #00def6, #00e7e5, #00efcc, #00f1af, #08f18a, #49ef5c, #72eb09)',
  webkitBackgroundClip: 'text',
  mozBackgroundClip: 'text',
  webkitTextFillColor: 'transparent',
  mozTextFillColor:'transparent',
  backgroundSize: '10%',
  }

  const ProductForm = ({_id,title:initialTitle,description:initialDescription,price:initialPrice,images:existingImages,category:initialCategory,properties:initialProperties}) => {
  const router = useRouter()

  const [categories,setCategories] = useState([])
  useEffect(() => {
    axios.get('/api/categories').then((res) => {
      setCategories(res.data)
    })
  },[])

  const [title, setTitle] = useState(initialTitle || '')
  const [description, setDescription] = useState(initialDescription || '')
  const [category,setCategory] = useState(initialCategory ||'')
  const [price, setPrice] = useState(initialPrice || '')
  const [images,setImages] = useState(existingImages || [])
  const [navProducts, setNavProducts] = useState(false);
  const [isUploading,setIsUploading] = useState()
  const [productProperties,setProductproperties] = useState(initialProperties || {})


  const uploadProduct = async(ev) => {
    ev.preventDefault()
    const data = {title,description,price,images,category,properties:productProperties}
    if (_id) {
      await axios.put('/api/products', { ...data, _id })
    }
    else {
    await axios.post('/api/products', data)
    }
    setNavProducts(true)
  }
  if (navProducts) {
     router.push('/products')
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

     const propertiesToFill = []
     if (categories.length > 0 && category) {
       let catInfo = categories.find(({ _id }) => _id === category)
       propertiesToFill.push(...catInfo.properties)
       
    }
  
    const setProductProp = (propName,value) => {
      setProductproperties(prev => {
        const newProductProp = { ...prev }
        newProductProp[propName] = value
        return newProductProp;
      })
    }


  return (
      <form className={styles.form} onSubmit={uploadProduct}>
        <label >Product name</label>
        <input type='text' placeholder='product name' value={title} onChange={(ev) => { setTitle(ev.target.value) }} />
        
        <label >Category</label>
        <select value={category} onChange={ev=>setCategory(ev.target.value)}>
          <option hidden value={ev=>ev.target.value}>
            Uncategorized
          </option>
          {categories.length > 0 && categories.map(c=>(
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        
      {propertiesToFill.length > 0 && propertiesToFill.map(p=>(
        <div  key={p._id} style={{display:'flex', gap:5}}>
          <div>{p.name}</div>
          <select
            value={productProperties[p.name]}
            onChange={(ev) => setProductProp(p.name, ev.target.value)}>
            {p.values.map(v => (
              <option key={v._id} value={v}>{v}</option>
            ))}
          </select>
        </div>
        ))}
            
        <label >Images</label>
        
        <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
          
          <ReactSortable style={{display:'flex',gap:8,flexWrap:'wrap'}} list={images} setList={sortImages}>
          {!!images?.length && images.map(link => (
            <div key={link._id}>
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
              <p>+Images</p>
            )}
        </div>
      
        <label>Description</label>
        <textarea placeholder='description' value={description} onChange={(ev) => { setDescription(ev.target.value) }} />
      
        <label>Price In KSH</label>
        <input type='number' placeholder='price' value={price} onChange={(ev) => { setPrice(ev.target.value) }} />
        
        <div className={styles.saveBtn}>
          <button type="submit">Save</button>
        </div>
        </form>
  )
}

export default ProductForm