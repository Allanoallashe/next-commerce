import Layout from '@/components/Layout'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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
          backgroundImage: ' linear-gradient(to right, #ff1f1f, #f76500, #e59200, #ccb600, #abd600, #c1d200, #d6ce00, #e9c900, #ff9714, #ff4e5a, #ff00a8, #f41fff)',
          padding: '8px 20px',
          borderRadius: 8,
       }}
      >
        +Add new products
      </Link>

      <table style={{marginTop:'20px'}}>
        <thead>
          <tr>
            <td>Product Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr>
              <td>{product.title}</td>
              <td>buttons</td>
            </tr>
          ) )}
        </tbody>
      </table>
    </Layout>
  )
}

export default Products