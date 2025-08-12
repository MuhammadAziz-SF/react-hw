import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryPage: React.FC = () => {
  const params = useParams()
  const raw = params.name ?? ''
  const category = decodeURIComponent(raw)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">{category || 'Категория'}</h1>
      <p className="text-gray-600 mt-2">Здесь пока пусто. Скоро появятся товары этой категории.</p>
    </main>
  )
}

export default React.memo(CategoryPage)


