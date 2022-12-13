import { createContext, useReducer } from "react"

import { createAction } from "../utils/reducer/reducer"

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const changeItemQuantity = (cartItems, cartItemToChangeQuantity, value) => {
  if (cartItemToChangeQuantity.quantity <= 1 && value < 0) return cartItems

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToChangeQuantity.id
      ? { ...cartItem, quantity: cartItem.quantity + value }
      : cartItem
  )
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
}

export const CartContext = createContext({
  dropdownVisible: false,
  toggleDropdownVisible: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartPrice: 0,
})

export const CART_ACTION_TYPES = {
  TOGGLE_DROPDOWN_VISIBLE: "TOGGLE_DROPDOWN_VISIBLE",
  SET_CART_ITEMS: "SET_CART_ITEMS",
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPES.TOGGLE_DROPDOWN_VISIBLE:
      return {
        ...state,
        dropdownVisible: !state.dropdownVisible,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}

const INITIAL_STATE = {
  dropdownVisible: false,
  cartItems: [],
  cartCount: 0,
  cartPrice: 0,
}

export const CartProvider = ({ children }) => {
  const [{ dropdownVisible, cartItems, cartCount, cartPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE)

  const toggleDropdownVisible = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_DROPDOWN_VISIBLE))
  }

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )

    const newCartPrice = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    )

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartPrice: newCartPrice,
      })
    )
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const changeCartItemQuantity = (cartItemToChangeQuantity, value) => {
    const newCartItems = changeItemQuantity(
      cartItems,
      cartItemToChangeQuantity,
      value
    )
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const value = {
    dropdownVisible,
    toggleDropdownVisible,
    addItemToCart,
    changeCartItemQuantity,
    removeItemFromCart,
    cartItems,
    cartCount,
    cartPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
