import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../types/product'

export interface CartItem {
  product: IProduct
  quantity: number
}

export interface CartState {
  itemsById: Record<number, CartItem>
}

const initialState: CartState = {
  itemsById: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const product = action.payload
      const existing = state.itemsById[product.id]
      if (existing) {
        existing.quantity += 1
      } else {
        state.itemsById[product.id] = { product, quantity: 1 }
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      delete state.itemsById[action.payload]
    },
    changeQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) {
      const { productId, quantity } = action.payload
      const item = state.itemsById[productId]
      if (!item) return
      if (quantity <= 0) {
        delete state.itemsById[productId]
      } else {
        item.quantity = quantity
      }
    },
    clearCart(state) {
      state.itemsById = {}
    },
  },
})

export const { addToCart, removeFromCart, changeQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer


