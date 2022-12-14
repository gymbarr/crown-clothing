import { createSelector } from "reselect"

const selectCartReducer = (state) => state.cart

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
)

export const selectDropdownVisible = createSelector(
  [selectCartReducer],
  (cart) => cart.dropdownVisible
)

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)

export const selectCartPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
)