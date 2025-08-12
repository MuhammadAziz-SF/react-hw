import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../types/product'

export interface WishlistState {
  ids: number[]
  entities: Record<number, IProduct>
}

const initialState: WishlistState = {
  ids: [],
  entities: {},
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<IProduct>) {
      const product = action.payload
      const index = state.ids.indexOf(product.id)
      if (index >= 0) {
        state.ids.splice(index, 1)
        delete state.entities[product.id]
      } else {
        state.ids.push(product.id)
        state.entities[product.id] = product
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      const id = action.payload
      const idx = state.ids.indexOf(id)
      if (idx >= 0) state.ids.splice(idx, 1)
      delete state.entities[id]
    },
    clearWishlist(state) {
      state.ids = []
      state.entities = {}
    },
  },
})

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions

export default wishlistSlice.reducer


