import { configureStore } from '@reduxjs/toolkit'
import counter from "./features/counter.slice"
import cart from "./features/cart.slice"
import wishlist from "./features/wishlist.slice"
import auth from "./features/auth.slice"

export const store = configureStore({
  reducer: {
    counter,
    wishlist,
    cart,
    auth,
  },
})