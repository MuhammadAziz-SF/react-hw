import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../lib'
import ProductCard from '../../components/ProductCard'

const Wishlist: React.FC = () => {
  const products = useSelector((s: RootState) => s.wishlist.ids.map((id) => s.wishlist.entities[id]))

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Избранное</h1>
      {products.length === 0 ? (
        <p className="text-gray-600 mt-2">Сохранённые товары появятся здесь.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  )
}

export default React.memo(Wishlist)


