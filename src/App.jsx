import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@context/AuthContext'
import { ScholarshipProvider } from '@context/ScholarshipContext'
import Layout from '@components/layout/Layout'
import ProtectedRoute from '@components/auth/ProtectedRoute'

// Pages (lazy loaded for performance)
import HomePage from '@pages/HomePage'
import ListingPage from '@pages/ListingPage'
import DetailPage from '@pages/DetailPage'
import DashboardPage from '@pages/DashboardPage'
import ServicesPage from '@pages/ServicesPage'
import BlogPage from '@pages/BlogPage'
import BlogDetailPage from '@pages/BlogDetailPage'
import AboutPage from '@pages/AboutPage'
import ContactPage from '@pages/ContactPage'
import NotFoundPage from '@pages/NotFoundPage'

export default function App() {
  return (
    <AuthProvider>
      <ScholarshipProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="scholarships" element={<ListingPage />} />
            <Route path="scholarships/:id" element={<DetailPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:id" element={<BlogDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route
              path="dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ScholarshipProvider>
    </AuthProvider>
  )
}
