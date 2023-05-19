import { appConfig } from '@/data'
const AboutPage = () => {
  return (
    <div>
      <h2>About {appConfig.application.name}</h2>
      <article>
        <p>{appConfig.application.description}</p>
      </article>
    </div>
  )
}

export default AboutPage
