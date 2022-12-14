import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import { ReactComponent as CrownLogo } from "../../assets/crown.svg"
import { CartIcon } from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"

import { signOutUser } from "../../utils/firebase/firebase"
import { selectCurrentUser } from "../../store/user/user-selector"

import { selectDropdownVisible } from "../../store/cart/cart-selector"

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles"

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dropdownVisible = useSelector(selectDropdownVisible)

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
