import { useContext } from "react"
import { CartContext } from "../../contexts/cart"

import CheckoutItem from "../../components/checkout-item/checkout-item"

import "./checkout.scss"

const Checkout = () => {
  const { cartItems, cartPrice } = useContext(CartContext)

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <span className="header-block">Product</span>
        <span className="header-block">Description</span>
        <span className="header-block">Quantity</span>
        <span className="header-block">Price</span>
        <span className="last-child">Remove</span>
      </div>

      {cartItems.map((item) => (
        <CheckoutItem key={item.id} checkoutItem={item} />
      ))}

      <div className="total">
        {`TOTAL: $${cartPrice}`}
      </div>
    </div>
  )
}

export default Checkout
