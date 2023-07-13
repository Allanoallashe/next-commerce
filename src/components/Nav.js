
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faGem, faHome, faListUl, faStore } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'

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
        <Link href={'/dashboard'}
          style={activeLink}>
          <FontAwesomeIcon icon={faHome} /> Dashboard </Link>

        <Link href={'/products'}
          style={inactiveLink}>
          <FontAwesomeIcon icon={faStore} /> Products</Link>
        
        <Link href={'/orders'}
          style={inactiveLink}>
          <FontAwesomeIcon icon={faListUl} /> Orders</Link>

        <Link href={'/settings'}
          style={inactiveLink}>
          <FontAwesomeIcon icon={faGear} /> Settings</Link>
      </nav>
    </aside>
  )
}

export default Nav