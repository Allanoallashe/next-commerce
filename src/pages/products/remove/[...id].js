
import Layout from '@/components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'

const removeButton = {
  backgroundColor: 'red',
  color: '#fff',
  padding: '8px 16px',
  width:80,
  border: 'none',
  borderRadius: '16px',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight:'bold',
}
const cancelButton = {
  backgroundColor: 'beige',
  color: 'navy',
  padding: '8px 16px',
  width:80,
  border: 'none',
  borderRadius: '16px',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight:'bold',
}

const RemoveProduct = () => {

  const [productInfo, setProductinfo] = useState()

  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id=' + id).then((res) => {
      setProductinfo(res.data)
    })
  },[id])
  const goBack = () => {
    router.push('/Products')
  }
  const removeProduct = async() => {
    await axios.delete('/api/products?id=' + id)
    goBack()
  }
  return (
    <Layout>
      <h4>Do you want to remove <span style={{ color: 'yellow' }}>"{productInfo?.title}"</span> ?</h4>
      <div
        style={{ display: 'flex', gap: 30, justifyContent: 'center' }}>
         <button
          onClick={goBack}
          style={cancelButton}
          className={styles.remProduct}
        >No</button>
        <button
          onClick={removeProduct}
          style={removeButton}
          className={styles.remProduct}
        >Yes</button>
      </div>
    </Layout>
  )
}

export default RemoveProduct