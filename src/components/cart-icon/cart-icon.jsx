import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { useContext } from 'react'
import { CartContext } from '../../contexts/cart'

import './cart-icon.scss'

export const CartIcon = () => {
  const { toggleDropdownVisible, cartCount } = useContext(CartContext)

  return (
    <div className='cart-icon-container' onClick={toggleDropdownVisible}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}
