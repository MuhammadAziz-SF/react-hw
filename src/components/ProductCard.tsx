import React from 'react'
import type { IProduct } from '../types/product'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../lib/features/cartSlice'
import { toggleWishlist } from '../lib/features/wishlistSlice'
import type { RootState } from '../lib'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoIosHeart } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

interface Props {
  product: IProduct
}



const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isWished = useSelector((state: RootState) => state.wishlist.ids.includes(product.id))

  const monthly = Math.round((product.price) / 12) * 100 // man yozdim | can paste coefficient to calculate monthly price

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border">
      <div className="relative">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-full h-64 object-cover"
          loading="lazy"
        />

        <button
          type="button"
          aria-label={isWished ? 'Убрать из избранного' : 'В избранное'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow"
          onClick={() => dispatch(toggleWishlist(product))}
        >
          {isWished ? (
            <IoIosHeart className="text-pink-500 w-5 h-5" />
          ) : (
            <IoMdHeartEmpty className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="p-3">
        <div className="flex gap-2 text-xs font-medium">
          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">Гарантия низкой цены</span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Суперцена</span>
        </div>

        <div className="mt-2">
          <div className="text-purple-700 font-bold text-xl leading-none">{product.price}</div>
          <div className="text-gray-500 text-sm line-through">{Math.round(product.price * 1.05)}</div>
        </div>

        <div className="mt-2 inline-block bg-yellow-300 text-black text-xs font-semibold px-2 py-0.5 rounded">
          {monthly} сум/мес
        </div>

        <div className="mt-2 text-sm text-gray-800 line-clamp-2 min-h-10">
          {product.title}
        </div>

        <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
          <span>⭐ {product.rating.toFixed(1)}</span>
          <span className="text-gray-400">(отзывы)</span>
        </div>

        <button
          className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-2"
          onClick={() => {
            dispatch(addToCart(product))
            navigate('/cart')
          }}
        >
          В корзину
        </button>
      </div>
    </div>
  )
}

export default React.memo(ProductCard)


