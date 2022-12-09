import Button from '../button/button'
import CartItem from '../cart-item/cart-item'

import { Link } from 'react-router-dom'

import { CartContext } from '../../contexts/cart'
import { useContext } from 'react'

import './cart-dropdown.scss'

const CartDropwdown = () => {
  const { cartItems } = useContext(CartContext)

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => 
          <CartItem key={item.id} cartItem={item} />
        )}
      </div>
      <Link to='/checkout'>
        <Button>GO TO CHECKOUT</Button>
      </Link>
      </div>
  )
}

export default CartDropwdown