import { CartContext } from "../../contexts/cart"
import { useContext } from "react"

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles"

const CheckoutItem = ({ checkoutItem }) => {
  const { changeCartItemQuantity, removeItemFromCart } = useContext(CartContext)
  const { name, quantity, imageUrl, price } = checkoutItem

  const incrementQuantityHandler = () => changeCartItemQuantity(checkoutItem, 1)
  const decrementQuantityHandler = () =>
    changeCartItemQuantity(checkoutItem, -1)
  const removeItemHandler = () => removeItemFromCart(checkoutItem)

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={decrementQuantityHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementQuantityHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
