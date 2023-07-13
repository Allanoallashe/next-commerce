

 'use client'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import favicon from '../../public/favicon.ico'
import Nav from './Nav'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {

  const { data: session } = useSession()
  if (!session) {
    return (
      <>
        <Head>
          <title>Nalla Shop</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type='image/x-icon' href={favicon} />
        </Head>
      <div className={styles.main}>
        <div className={styles.buttonBox}>
          <button onClick={() => signIn('google')} className={styles.button}>Login with Google</button>
        </div>
        </div>
      </>
      )
  }
  

    else {
    return (
      <>
        <Head>
          <title>Nalla Shop</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type='image/x-icon' href={favicon} />
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <div className={styles.nav}>
            <Nav />
            <div className={styles.pane}>
              <h3>{children}</h3>
            </div>
            </div>
        </main>
      </>
    )
  }
}
