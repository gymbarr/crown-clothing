import { createContext, useState } from "react"

export const CartContext = createContext({
  dropdownVisible: false,
  toggleDropdownVisible: () => null
})

export const CartProvider = ({ children }) => {

  const [dropdownVisible, setDropdownVisible] = useState(false)

  const toggleDropdownVisible = () => setDropdownVisible(!dropdownVisible)

  const value = { dropdownVisible, toggleDropdownVisible }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
