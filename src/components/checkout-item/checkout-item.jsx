import { CartContext } from '../../contexts/cart'
import { useContext } from 'react'

import './checkout-item.scss'

const CheckoutItem = ({checkoutItem}) => {
  const { name, quantity, imageUrl, price } = checkoutItem

  return (
    <div className='checkout-item-container'>
      <span className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </span>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <span className='arrow'>&#10094;</span>
        <span className='value'>{quantity}</span>
        <span className='arrow'>&#10095;</span>
      </span>
      <span className='price'>{price}</span>
      <span className='remove-button'>✕</span>
    </div>
  )
}

export default CheckoutItem