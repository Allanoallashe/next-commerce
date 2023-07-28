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
      <div>
        <Link href={"/products/New"}
          className={styles.newHover}
      >
        +Add new products
      </Link>
      </div>


      <table border={1} cellPadding={6} className={styles.table}>
        <thead>
          <tr>
            <td colSpan={2}>Available Products</td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td style={{maxWidth:'60%',width:'90%'}}>{product.title}</td>
              <td className={styles.actions}>
                <Link className={styles.edit} href={'/products/edit/' + product._id}><FontAwesomeIcon icon={faPenToSquare} /> Edit</Link>
                <Link style={{
                  backgroundImage: 'linear-gradient(to right, #eb0998, #ee008b, #ef007d, #ef0071, #ee0064, #ee005b, #ed0053, #ec034a, #ec0143, #ec013b, #ec0433, #eb092b)', color: '#fff',
                  }}
                  className={styles.edit} href={'/products/remove/' + product._id}><FontAwesomeIcon icon={faTrash} />Remove</Link>
              </td>
            </tr>
          ) )}
        </tbody>
      </table>
    </Layout>
  )
}

export default Products