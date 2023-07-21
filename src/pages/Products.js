import Layout from '@/components/Layout'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

const Products = () => {
  const [products,setProducts] = useState([])
  useEffect(() => {
    axios.get('api/products').then((res) => {
      setProducts(res.data)
    })
  },[])
  return (
    <Layout>
      <Link href={"/products/New"}
        style={{
          textDecoration: "none",
          color: "#fff",
          backgroundImage: 'linear-gradient(to right, #4c1ab8, #363cc6, #1b53d0, #0067d7, #0079db, #107fe5, #1b84ef, #258af9, #5b81ff, #9073ff, #c359ff, #f41fff)',
          padding: '8px 20px',
          borderRadius: 8,
       }}
      >
        +Add new products
      </Link>

      <table border={1} cellPadding={6} cellSpacing={0} className={styles.table}>
        <thead>
          <tr>
            <td>Product Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                <Link className={styles.edit} href={'/products/edit/' + product._id}><FontAwesomeIcon icon={faPenToSquare} /> Edit</Link>
                <Link className={styles.edit} href={'/products/remove/' + product._id}><FontAwesomeIcon icon={faTrash}/>Remove</Link>
              </td>
            </tr>
          ) )}
        </tbody>
      </table>
    </Layout>
  )
}

export default Products