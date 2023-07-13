'use client'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faGem, faHome, faListUl, faStore } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'

import { useRouter } from 'next/router'



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
  return (
    <aside>
      <div
        style={{
          padding: '6px 12px',
          width: 'max-content',
          marginTop:'-30px'
        }}
      >
        <h2><FontAwesomeIcon icon={faGem} /> Admin</h2>
      </div>
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          width: 'max-content',
        }}
      >
        <Link href={'/Dashboard'}
          style={pathname ==="/"? activeLink:inactiveLink}>
          <FontAwesomeIcon icon={faHome} /> Dashboard </Link>

        <Link href={'/Products'}
          style={pathname.includes('/Products')?activeLink:inactiveLink}>
          <FontAwesomeIcon icon={faStore} /> Products</Link>
        
        <Link href={'/Orders'}
          style={pathname.includes('/Orders')?activeLink:inactiveLink}>
          <FontAwesomeIcon icon={faListUl} /> Orders</Link>

        <Link href={'/Settings'}
          style={pathname.includes('/Settings')?activeLink:inactiveLink}>
          <FontAwesomeIcon icon={faGear} /> Settings</Link>
      </nav>
    </aside>
  )
}

export default Nav