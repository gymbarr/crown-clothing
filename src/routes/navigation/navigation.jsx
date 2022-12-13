import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"

import { ReactComponent as CrownLogo } from "../../assets/crown.svg"
import { CartIcon } from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"
import { UserContext } from "../../contexts/user"
import { CartContext } from "../../contexts/cart"

import { signOutUser } from "../../utils/firebase/firebase"

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles"

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { dropdownVisible } = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="nav-logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {dropdownVisible && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
