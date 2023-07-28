import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const NewProducts = () => {

  return (
    <Layout>
      <h3>+New Product</h3>
      <Link
        href={'/Products'}
        style={{
          textDecoration: 'none',
          color:'#fff',
        }}
        ><FontAwesomeIcon icon={faArrowAltCircleLeft}/>  Back</Link>
      <hr></hr>
      <ProductForm/>
    </Layout>
  )
}

export default NewProducts