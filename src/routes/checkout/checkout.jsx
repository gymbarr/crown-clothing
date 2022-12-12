import { useContext } from "react"
import { CartContext } from "../../contexts/cart"

import CheckoutItem from "../../components/checkout-item/checkout-item"

import "./checkout.scss"

const Checkout = () => {
  const { cartItems, cartPrice } = useContext(CartContext)

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((item) => (
        <CheckoutItem key={item.id} checkoutItem={item} />
      ))}

      <span className="total">{`TOTAL: $${cartPrice}`}</span>
    </div>
  )
}

export default Checkout
