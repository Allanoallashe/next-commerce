
import Layout from '@/components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

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
      <h4>Do you want to remove <span style={{ color: 'pink' }}>"{productInfo?.title}"</span> ?</h4>
      <div style={{display:'flex', gap:10, justifyContent:'center'}}>
        <button onClick={removeProduct}>Yes</button>
        <button onClick={goBack}>No</button>
      </div>
    </Layout>
  )
}

export default RemoveProduct