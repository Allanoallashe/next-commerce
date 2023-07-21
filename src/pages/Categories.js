import Layout from '@/components/Layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { withSwal } from 'react-sweetalert2';

const Category = ({swal}) => {
   const [name, setName] = useState('')
  const [categories, setCategories] = useState('')
  const [mainCategory, setMainCategory] = useState('')
  const [editedCategory, setEditedCategory] = useState(null)

  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchCategories = () => {
      axios.get('/api/categories').then((res) => {
      setCategories(res.data)
    })
  }
  
  const saveCategory = async (ev) => {
    ev.preventDefault()
    const data = { name, mainCategory }
    if (editedCategory) {
      data._id = editedCategory._id
      await axios.put('/api/categories', data)
      setEditedCategory(null)
    }
    else {
      await axios.post('/api/categories', data)
    }
    setName('')
    fetchCategories()
  }

  const editCategory = (category) => {
    setEditedCategory(category)
    setName(category.name)
    setMainCategory(category.main?._id)
  }

  const deleteCategory = (category) => {
     swal.fire({
            title: 'Do you want to remove',
            text: `${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            icon:'warning',
            confirmButtonColor: 'red',
            reverseButtons: true,
          }).then(async(deleted) => {
            if (deleted.isConfirmed === true) {
              const {_id} = category
              await axios.delete('/api/categories?_id=' +_id )
              swal.fire({
                text: `${category.name} is deleted successfully!`,
                icon:'success'
              })
              fetchCategories()
            } else {
              swal.fire({
                text: 'Cancelled Successfully!',
                icon:'success'
              })
            }
          })
  }

  return (
    <Layout>
      <h3>Categories</h3>
      <hr></hr>
      <label>{editedCategory ? <h3>Edit Category <span style={{color:'yellow'}}>"{editedCategory.name}"</span></h3> : '+New Category'}
      </label>

      <form onSubmit={saveCategory}>
        <div>
          <input type='text' placeholder={'Category name'} value={name} onChange={(ev) => { setName(ev.target.value) }} />

          <select value={mainCategory} onChange={(ev)=>{setMainCategory(ev.target.value)}}>
            <option value='' hidden>Choose Main Category</option>
            {categories.length > 0 && categories.map(category => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>

          <button type='submit'>Save</button>
        </div>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Category name</td>
            <td>Main Category</td>
          </tr>
        </thead>
        <tbody>
          {categories.length>0 && categories.map(category => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category?.main?.name}</td>

              <td>
                <button onClick={()=>{editCategory(category)}} className={styles.edit} ><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
                <button onClick={()=>{deleteCategory(category)}} className={styles.edit} ><FontAwesomeIcon icon={faTrash}/>Remove</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default withSwal(({ swal }, ref) => (
  <Category swal={swal} />
))
