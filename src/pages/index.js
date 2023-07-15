import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import styles from '@/styles/Home.module.css'


export default function Home() {

  const { data: session } = useSession()
  console.log(session)
  return (
    <Layout>
      <div className={styles.details}>
        <h3>Hello, <strong className={styles.strong}>{session?.user?.name}</strong></h3>
        <div className={styles.profile}>
          <img  className={styles.image}  src={session?.user?.image} alt="" />
          <small>{session?.user?.name}</small>
        </div>
        </div>
      </Layout>
)
}
