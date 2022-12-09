import { useContext } from 'react'
import { CartContext } from '../../contexts/cart'

import './checkout.scss'

const Checkout = () => {
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
          <span className='header-block'>Product</span>
          <span className='header-block'>Description</span>
          <span className='header-block'>Quantity</span>
          <span className='header-block'>Price</span>
          <span className='last-child'>Remove</span>
      </div>
    </div>
  )
}

export default Checkout