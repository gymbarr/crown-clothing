import { useContext } from "react"
import { CartContext } from "../../contexts/cart"

import CheckoutItem from "../../components/checkout-item/checkout-item"

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles"

const Checkout = () => {
  const { cartItems, cartPrice } = useContext(CartContext)

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>

      {cartItems.map((item) => (
        <CheckoutItem key={item.id} checkoutItem={item} />
      ))}

      <Total>{`TOTAL: $${cartPrice}`}</Total>
    </CheckoutContainer>
  )
}

export default Checkout
