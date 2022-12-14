import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"

import { useDispatch, useSelector } from "react-redux"

import { toggleDropdownVisible } from "../../store/cart/cart-action"
import { selectCartCount, selectDropdownVisible } from "../../store/cart/cart-selector"

import { CartIconContainer, ItemCount } from "./cart-icon.styles"

export const CartIcon = () => {
  const dispatch = useDispatch()
  
  const cartCount = useSelector(selectCartCount)
  const dropdownVisible = useSelector(selectDropdownVisible)

  const toggleDropdownVisibleHandler = () => dispatch(toggleDropdownVisible(!dropdownVisible))

  return (
    <CartIconContainer onClick={toggleDropdownVisibleHandler}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}
