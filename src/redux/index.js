import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './features/wishlist.slice';
import cartReducer from './features/cart.slice';

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});
