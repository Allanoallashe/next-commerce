import Layout from '@/components/Layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { withSwal } from 'react-sweetalert2';

const Category = ({swal}) => {
   const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [mainCategory, setMainCategory] = useState('')
  const [editedCategory, setEditedCategory] = useState(null)
  const [properties,setProperties] = useState([])

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
    const data = {
      name,
      mainCategory,
      properties:properties.map(p => ({name:p.name, values:p.values.split(',')}))
    }
    if (editedCategory) {
      data._id = editedCategory._id
      await axios.put('/api/categories', data)
      setEditedCategory(null)
      setMainCategory('');
    }
    else {
      await axios.post('/api/categories', data)
    }
    setName('')
    setMainCategory('')
    setProperties([])
    fetchCategories()
  }

  const editCategory = (category) => {
    setEditedCategory(category)
    setName(category.name)
    setMainCategory(category.main?._id)
    setProperties(category.properties.map(({name,values})=>({name,values:values.join(',')})))
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

  const addNewProperty = () => {
    setProperties(prev => {
      return[...prev, {name:'',values:''}]
    })
  }

  const handlePropertyValuesChange = (index,property,newValues) => {
    setProperties(prev => {
      const properties = [...prev]
      properties[index].values = newValues
      return properties;
    })
  }
  const handlePropertyNameChange = (index,property,newName) => {
    setProperties(prev => {
      const properties = [...prev]
      properties[index].name = newName
      return properties;
    })
  }
  const removeProperty = (indexToRemove) => {
    setProperties(prev => {
      const newProperties = [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove
      })
      
      return newProperties
      
    })
  }

  return (
    <Layout>
      <h3>Categories</h3>
      <hr style={{backgroundColor:'#f00',}}/>
      <label >{editedCategory ? <h3>Edit Category <span style={{color:'yellow'}}>"{editedCategory.name}"</span></h3> : '+New Category'}
      </label>

      <form className={styles.categoryForm} onSubmit={saveCategory}>
        <div style={{ marginTop: '10px' }}>
          <div
            style={{
              display: 'flex',
            }}
          >
          <input type='text' placeholder={'Category name'} value={name} onChange={(ev) => { setName(ev.target.value) }} />

          <select value={mainCategory} onChange={(ev)=>{setMainCategory(ev.target.value)}}>
            <option value='' hidden>Choose Main Category</option>
            {categories.length > 0 && categories.map(category => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
          </div>

          <div style={{marginTop:10,display:'flex',flexDirection:'column',gap:8,}}>
            <label>Properties</label>
            <button type='button' onClick={addNewProperty}>
              + New Properties
            </button>
            {properties.length > 0 && properties.map((property,index) => (
              <div>
                <input type="text"
                  value={property.name}
                  onChange={ev => handlePropertyNameChange(index,property, ev.target.value)}
                  placeholder='property name (example: color)' />
                
                <input type="text"
                  value={property.values}
                  onChange={ev=>handlePropertyValuesChange(index,property,ev.target.value)}
                  placeholder='values, comma seperated' />
                <button type='button' onClick={()=>removeProperty(index)}>Remove</button>
              </div>
            ))}
          </div>
          
          {editedCategory && (<button type='button' onClick={() => {
            setEditedCategory(null)
            setName('')
            setMainCategory('')
            setProperties([])
          }}>Cancel</button>)}
          <button style={{marginTop:8}} type='submit'>Save</button>
        </div>
      </form>

      {!editedCategory && (
        <table style={{marginTop:10}} border={1} cellPadding={5} cellSpacing={0} className={styles.table}>
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
                <div className={styles.actions}>
                  <button onClick={()=>{editCategory(category)}} className={styles.edit} ><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
                  <button onClick={() => { deleteCategory(category) }}
                    style={{
                    backgroundImage: 'linear-gradient(to right, #eb0998, #ee008b, #ef007d, #ef0071, #ee0064, #ee005b, #ed0053, #ec034a, #ec0143, #ec013b, #ec0433, #eb092b)', color: '#fff',
                    }}
                    className={styles.edit} ><FontAwesomeIcon icon={faTrash} />Remove</button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      )}
      
    </Layout>
  )
}

export default withSwal(({ swal }, ref) => (
  <Category swal={swal} />
))
