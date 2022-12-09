import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { CartIcon } from '../../components/cart-icon/cart-icon'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown'
import { UserContext } from '../../contexts/user'
import { CartContext } from '../../contexts/cart'

import { signOutUser } from '../../utils/firebase/firebase'

import './navigation.scss'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { dropdownVisible } = useContext(CartContext)

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='nav-logo-container' to='/'>
          <CrownLogo className='nav-logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {dropdownVisible && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
