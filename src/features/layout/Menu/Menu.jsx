import { Link } from 'react-router-dom'

import { menuConfig } from '@/data'
import styles from './Menu.module.css'

const Menu = () => {
  return (
    <nav className={styles.menuWrapper}>
      <div className="container">
        <div className={styles.menu}>
          {menuConfig.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Menu
