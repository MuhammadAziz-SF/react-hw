import React, { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import Header from './components/header'
import Loading from './components/Loading'

const Home = lazy(() => import('./pages/home'))
const Cart = lazy(() => import('./pages/cart'))
const Wishlist = lazy(() => import('./pages/wishlist'))
const CategoryPage = lazy(() => import('./pages/category'))

const App: React.FC = () => {
  const element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/cart', element: <Cart /> },
    { path: '/wishlist', element: <Wishlist /> },
    { path: '/category/:name', element: <CategoryPage /> },
  ])

  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        {element}
      </Suspense>
    </div>
  )
}

export default React.memo(App)