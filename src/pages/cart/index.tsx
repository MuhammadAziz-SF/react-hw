import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../lib'
import { changeQuantity, removeFromCart } from '../../lib/features/cartSlice'

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => Object.values(state.cart.itemsById))

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Корзина</h1>
      {items.length === 0 ? (
        <p className="text-gray-600 mt-2">Ваша корзина пуста.</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 items-center border rounded-lg p-3">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium">{product.title}</div>
                <div className="text-gray-600">{product.price} сум</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() =>
                    dispatch(
                      changeQuantity({ productId: product.id, quantity: quantity - 1 }),
                    )
                  }
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() =>
                    dispatch(
                      changeQuantity({ productId: product.id, quantity: quantity + 1 }),
                    )
                  }
                >
                  +
                </button>
              </div>
              <button
                className="ml-4 text-red-600 hover:underline"
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                Удалить
              </button>
            </div>
          ))}

          <div className="text-right text-lg font-semibold">
            Итого: {new Intl.NumberFormat('ru-RU').format(total)} сум
          </div>
        </div>
      )}
    </main>
  )
}

export default React.memo(Cart)
