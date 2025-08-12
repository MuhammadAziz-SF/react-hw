import React, { useEffect, useState } from 'react'
import axios, { CanceledError } from 'axios'
import ProductCard from '../../components/ProductCard'
import type { IProduct } from '../../types/product'

const Home: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get<{ products: IProduct[] }>(
          'https://dummyjson.com/products',
          { params: { limit: 32 }, signal: controller.signal },
        )
        setProducts(data.products || [])
      } catch (error) {
        if (error instanceof CanceledError) return
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {loading ? (
        <div className="text-center text-gray-500">Загрузка…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  )
}

export default React.memo(Home)