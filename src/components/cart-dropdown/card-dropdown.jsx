import Button from '../button/button'
import './cart-dropdown.scss'

const CartDropwdown = () => {
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        <Button>GO TO CHECKOUT</Button>
      </div>
    </div>
  )
}

export default CartDropwdown