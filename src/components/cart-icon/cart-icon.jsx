import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"

import { useContext } from "react"
import { CartContext } from "../../contexts/cart"

import { CartIconContainer, ItemCount } from "./cart-icon.styles"

export const CartIcon = () => {
  const { toggleDropdownVisible, cartCount } = useContext(CartContext)

  return (
    <CartIconContainer onClick={toggleDropdownVisible}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}
