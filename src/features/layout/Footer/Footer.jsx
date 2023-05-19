import { appConfig } from '@/data'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        Created by
        <a href="https://josenaldo.github.io">{appConfig.footer.createdBy}</a>.
      </span>
      <span>
        See{' '}
        <a href={appConfig.footer.repository}>{appConfig.footer.repository}</a>{' '}
        for the source code.
      </span>
    </footer>
  )
}

export default Footer
