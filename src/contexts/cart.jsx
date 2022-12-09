import { createContext, useState, useEffect } from "react"

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id)

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id 
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  } 

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
  dropdownVisible: false,
  toggleDropdownVisible: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
})

export const CartProvider = ({ children }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

    setCartCount(newCartCount)
  }, [cartItems])

  const toggleDropdownVisible = () => setDropdownVisible(!dropdownVisible)

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const value = { dropdownVisible, toggleDropdownVisible, addItemToCart, cartItems, cartCount }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
