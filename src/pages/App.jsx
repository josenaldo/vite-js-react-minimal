import { Route, Routes } from 'react-router-dom'

import { Template } from '@/features/layout'
import AboutPage from '@/pages/AboutPage'
import HomePage from '@/pages/HomePage'

const IndexPage = () => {
  return (
    <Template>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Template>
  )
}

export default IndexPage
