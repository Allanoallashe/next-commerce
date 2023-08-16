'use client'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faGem, faHome, faListCheck, faListUl, faRightFromBracket, faStore } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'

import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { signOut } from 'next-auth/react'



const activeLink ={
          zIndex: 10,
          color: "#041387",
          textDecoration: "none",
          padding: '6px 12px',
          borderRadius: 4,
          fontWeight: 'bold',
          backgroundColor: '#fff'
      }
const inactiveLink = {
          zIndex: 10,
          color: "#fff",
          textDecoration: "none",
          padding: '6px 12px',
          borderRadius: 4,
          fontWeight: 'bold',
          backgroundColor: 'transparent',
          border:'solid 1px #fff'
          }

const Nav = () => {
    const router = useRouter()
    const {pathname} = router
    
  const logOut = async () => {
      await router.push('/')
      await signOut()
    }  
  
  return (
    <aside className={styles.aside}>
      <div
        style={{
          padding: '6px 12px',
          width: 'max-content',
          marginTop:'-30px'
        }}
      >
        <h2><FontAwesomeIcon icon={faGem} /> Admin</h2>
      </div>
      <nav className={styles.navSide}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          width: 'max-content',
        }}
      >
        <Link href={'/'}
          style={pathname ==="/" || pathname.includes( "/dashboard") ? activeLink:inactiveLink}>
          <FontAwesomeIcon icon={faHome} /> Dashboard </Link>

        <Link href={'/products'}
          style={pathname.includes('/products')?activeLink:inactiveLink}>
          <FontAwesomeIcon icon={faStore} /> Products</Link>
        
        <Link href={'/categories'}
          style={pathname.includes('/categories')?activeLink:inactiveLink}>
          <FontAwesomeIcon icon={faListCheck} /> Categories</Link>
        
        <Link href={'/orders'}
          style={pathname.includes('/orders')?activeLink:inactiveLink}>
          <FontAwesomeIcon icon={faListUl} /> Orders</Link>

        <Link href={'/settings'}
          style={pathname.includes('/settings')?activeLink:inactiveLink}>
          <FontAwesomeIcon icon={faGear} /> Settings</Link>
        
        <button 
          onClick={logOut}
          style={{backgroundImage: 'linear-gradient(to right, #4c1ab8, #363cc6, #1b53d0, #0067d7, #0079db, #107fe5, #1b84ef, #258af9, #5b81ff, #9073ff, #c359ff, #f41fff)',border:'none',borderRadius:'16px',padding:8,cursor:'pointer',color:'#fff',fontSize:'16px',fontWeight:'bold'}}>
          <FontAwesomeIcon style={{marginRight:3}} icon={faRightFromBracket} rotation={180}/> Logout</button>
      </nav>
    </aside>
  )
}

export default Nav