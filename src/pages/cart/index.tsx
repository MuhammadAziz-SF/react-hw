import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../lib'
import { changeQuantity, removeFromCart } from '../../lib/features/cartSlice'
import { FiTrash2 } from 'react-icons/fi'
import { IoIosInformationCircleOutline } from 'react-icons/io'

const formatCurrency = (value: number) => new Intl.NumberFormat('ru-RU').format(value)

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => Object.values(state.cart.itemsById))

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  const withoutCard = Math.round(itemsTotal * 1.05)
  const withCard = itemsTotal
  const savings = Math.max(0, withoutCard - withCard)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Ваша корзина, {items.length} товар{items.length === 1 ? '' : items.length < 5 ? 'а' : 'ов'}</h1>

      {items.length === 0 ? (
        <p className="text-gray-600 mt-2">Ваша корзина пуста.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div className="flex items-center justify-end border rounded-xl px-4 py-3 bg-white text-sm text-gray-500">
              Ближайшая дата доставки: <span className="text-purple-700 font-medium ml-2">13 августа</span>
            </div>

            <div className="mt-4 space-y-4">
              <div className="text-sm text-gray-600 px-2">Доставка Uzum Market</div>
              <div className="bg-white border rounded-xl">
                <div className="px-4 pt-4 text-[15px] font-semibold">Доставим с 13 августа</div>
                {items.map(({ product, quantity }) => (
                    <div key={product.id} className="px-4 py-4 flex items-start gap-4 border-t">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-28 h-28 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="inline-flex items-center gap-2 text-xs font-medium">
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">Гарантия низкой цены</span>
                        </div>
                        <div className="mt-1 text-gray-900 font-medium line-clamp-2">
                          {product.title}
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          Продавец: <span className="text-gray-800">{product?.category || 'Продавец'}</span>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <button
                            className="w-8 h-8 rounded border text-lg leading-none"
                            onClick={() =>
                              dispatch(
                                changeQuantity({ productId: product.id, quantity: quantity - 1 }),
                              )
                            }
                          >
                            −
                          </button>
                          <span className="w-8 text-center">{quantity}</span>
                          <button
                            className="w-8 h-8 rounded border text-lg leading-none"
                            onClick={() =>
                              dispatch(
                                changeQuantity({ productId: product.id, quantity: quantity + 1 }),
                              )
                            }
                          >
                            +
                          </button>

                          <button
                            className="ml-4 inline-flex items-center gap-2 text-gray-700 hover:text-red-600"
                            onClick={() => dispatch(removeFromCart(product.id))}
                          >
                            <FiTrash2 /> Удалить
                          </button>
                        </div>
                      </div>
                      <div className="text-right min-w-[9rem]">
                        <div className="text-xl font-bold text-purple-700">{formatCurrency(product.price * quantity)} сум</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          без карты Uzum {formatCurrency(Math.round(product.price * quantity * 1.05))} сум
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right column */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="bg-white border rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-lg font-semibold">Доставка в пункт выдачи 5 000 сум</div>
                <IoIosInformationCircleOutline className="text-gray-400 mt-0.5" />
              </div>
              <div className="mt-3">
                <div className="h-1.5 bg-gray-200 rounded">
                  <div className="h-1.5 bg-purple-600 rounded" style={{ width: '30%' }} />
                </div>
                <div className="mt-2 grid grid-cols-4 text-xs text-gray-600">
                  <div className="text-purple-700">7 000 сум</div>
                  <div className="text-purple-700">5 000 сум</div>
                  <div>3 000 сум</div>
                  <div>0 сум</div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <div className="text-lg font-semibold">Ваш заказ</div>
              <div className="mt-3 text-sm text-gray-700">Товары ({items.length}): <span className="float-right">{formatCurrency(itemsTotal)} сум</span></div>
              <div className="mt-2">
                <button className="w-full border rounded-lg px-3 py-2 text-sm">Доставим 13 августа</button>
              </div>
              <div className="mt-4 text-lg font-semibold">Итого</div>
              <div className="mt-2 text-gray-700">С картой Uzum <span className="float-right text-2xl font-bold text-purple-700">{formatCurrency(withCard)} сум</span></div>
              <div className="mt-1 text-green-600 text-sm">Вы экономите: {formatCurrency(savings)} сум</div>
              <div className="mt-1 text-gray-700">Без карты <span className="float-right">{formatCurrency(withoutCard)} сум</span></div>

              <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-3">Перейти к оформлению</button>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}

export default React.memo(Cart)
