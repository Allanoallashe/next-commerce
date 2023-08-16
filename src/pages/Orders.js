import Layout from '@/components/Layout'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const heading = {
  backgroundImage: 'linear-gradient(to right, #eb09b2, #b76df3, #659bff, #00bcff, #00d3ff, #00def6, #00e7e5, #00efcc, #00f1af, #08f18a, #49ef5c, #72eb09)',
  webkitBackgroundClip: 'text',
  mozBackgroundClip: 'text',
  webkitTextFillColor: 'transparent',
  mozTextFillColor:'transparent',
  backgroundSize: '10%',
  }


const Orders = () => {
  const [orders,setOrders]=useState([])
  useEffect(() => {
    axios.get('/api/orders').then(res => {
      setOrders(res.data)
    })
  },[])

  return (
    <Layout>
      <>
      <h2 style={heading}>Orders</h2>
      
      <table  border={1} cellPadding={6} className={styles.table}>
        <thead>
          <tr>
            <td>Date</td>
            <td>Recipient</td>
            <td>Products</td>
          </tr>
        </thead>
          <tbody>
            {orders.length > 0 && orders.map(order => (
              <tr key={order}>
                <td style={{whiteSpace:'nowrap'}}>
                  {(new Date (order.createdAt)).toLocaleString()
                  }
                </td>
                <td>
                  {order.name} {order.email} <br />
                  {order.city} {order.postCode} <br />
                  {order.country} <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map(l => (
                    <>
                      {l.price_data?.product_data.name} X {l.quantity}<br/>
                    </>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     </>
    </Layout>
  )
}

export default Orders