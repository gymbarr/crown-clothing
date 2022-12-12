import { CartContext } from '../../contexts/cart'
import { useContext } from 'react'

import './checkout-item.scss'

const CheckoutItem = ({checkoutItem}) => {
  const { changeCartItemQuantity, removeItemFromCart } = useContext(CartContext)
  const { name, quantity, imageUrl, price } = checkoutItem

  const incrementQuantityHandler = () => changeCartItemQuantity(checkoutItem, 1)
  const decrementQuantityHandler = () => changeCartItemQuantity(checkoutItem, -1)
  const removeItemHandler = () => removeItemFromCart(checkoutItem)

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <span className='arrow' onClick={decrementQuantityHandler}>&#10094;</span>
        <span className='value'>{quantity}</span>
        <span className='arrow' onClick={incrementQuantityHandler}>&#10095;</span>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={removeItemHandler}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem