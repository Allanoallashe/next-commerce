
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'

const heading = {
  backgroundImage: 'linear-gradient(to right, #eb09b2, #b76df3, #659bff, #00bcff, #00d3ff, #00def6, #00e7e5, #00efcc, #00f1af, #08f18a, #49ef5c, #72eb09)',
  webkitBackgroundClip: 'text',
  mozBackgroundClip: 'text',
  webkitTextFillColor: 'transparent',
  mozTextFillColor:'transparent',
  backgroundSize: '10%',
  }

export default function EditProduct() {

  const [productInfo,setProductInfo] = useState(null)

  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
      axios.get('/api/products?id=' + id).then((res) => {
      setProductInfo(res.data)
    })
  }, [id])
  
  return (
    <Layout>
      <h3 style={heading}>Edit Product</h3>
      <Link
        href={'/Products'}
        className={styles.back}
        style={{
          textDecoration: 'none',
        }}
      ><FontAwesomeIcon icon={faArrowAltCircleLeft} />
        Back
      </Link>
      <hr
        style={{
          borderImage: 'linear-gradient(to right, #e1e9ed, #bfd9e8, #9dc9e5, #7bb8e2, #57a7df, #3d9fe9, #2895f2, #258af9, #5b81ff, #9073ff, #c359ff, #f41fff)1',
          borderRadius:'1px'
        }}
      ></hr>
      {productInfo && (<ProductForm {...productInfo} />)}
    </Layout>
  )
}