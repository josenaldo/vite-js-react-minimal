import { Header, Menu, Footer } from '@/features/layout'
// import { Notification } from '@/features/notification'
import { Alert } from '@/features/alert'
import styles from './Template.module.css'

const Template = ({ children }) => {
  return (
    <div className={styles.mainWindow}>
      <Header />
      <Menu />
      <Alert />
      {/* <Notification /> */}

      <div className={`container ${styles.mainContainer}`}>
        <main>{children}</main>
      </div>

      <Footer />
    </div>
  )
}

export default Template
