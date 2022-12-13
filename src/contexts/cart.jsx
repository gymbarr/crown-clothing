import { createContext, useState, useEffect } from "react"

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

export const CartProvider = ({ children }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartPrice, setCartPrice] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )

    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newCartPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    )

    setCartPrice(newCartPrice)
  }, [cartItems])

  const toggleDropdownVisible = () => setDropdownVisible(!dropdownVisible)

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const changeCartItemQuantity = (cartItemToChangeQuantity, value) => {
    setCartItems(changeItemQuantity(cartItems, cartItemToChangeQuantity, value))
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
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
