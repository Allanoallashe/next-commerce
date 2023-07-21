import Layout from '@/components/Layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'

const Categories = () => {
  const [name, setName] = useState('')
  const [categories,setCategories]= useState('')

  useEffect(() => {
    fetchCategories();
  }, [])
  const fetchCategories = () => {
      axios.get('/api/categories').then((res) => {
      setCategories(res.data)
      fetchCategories();
    })
  }
  
  const saveCategory = async (ev) => {
    ev.preventDefault()
    await axios .post('/api/categories', { name })
    setName('')
  }

  return (
    <Layout>
      <h3>Categories</h3>
      <label>New Category</label>
      <form onSubmit={saveCategory}>
        <div>
        <input type='text' placeholder={'Category name'} value={name} onChange={(ev)=>{setName(ev.target.value)}} />
        <button type='submit'>Save</button>
        </div>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Category name</td>
          </tr>
        </thead>
        <tbody>
          {categories.length>0 && categories.map(category => (
            <tr key={category._id}>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Categories