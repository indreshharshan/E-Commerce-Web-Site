import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

  const [visible, setVisible] = useState(false)
  const [showOffer, setShowOffer] = useState(true)

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <>
      {/*  OFFER BAR */}
      {showOffer && (
        <div className="fixed top-0 left-0 w-full bg-pink-300 text-gray-800 text-sm z-50 overflow-hidden h-10 flex items-center font-outfit">
          <div className="relative w-full h-full flex items-center">
            {/* First copy */}
            <div className="animate-news whitespace-nowrap tracking-wide">
              <span className="mr-6">
                📌 Sign up now and get <b>20% OFF</b> on your first order!
              </span>
              <span className="mx-6">
                🚚 Free shipping on orders over ₹1,500!
              </span>
              <span className="mx-6">
                ✨ Limited-time fashion spree – shop now 🛍️
              </span>
            </div>

            {/* Second copy */}
            <div className="animate-news animation-delay-10s whitespace-nowrap tracking-wide absolute left-0">
              <span className="mr-6">
                📌 Sign up now and get <b>20% OFF</b> on your first order!
              </span>
              <span className="mx-6">
                🚚 Free shipping on orders over ₹1,500!
              </span>
              <span className="mx-6">
                ✨ Limited-time fashion spree – shop now 🛍️
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowOffer(false)}
            className="absolute right-4 text-lg font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/*  NAVBAR */}
      <div className={`flex items-center justify-between py-5 font-medium ${showOffer ? 'mt-10' : ''}`}>
        
        <Link to='/'>
          <img src={assets.logo} className='w-36' alt="" />
        </Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
          <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>

          <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>

          <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>

          <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
          <img
            onClick={() => {
              setShowSearch(true)
              navigate('/collection')
            }}
            src={assets.search_icon}
            className='w-5 cursor-pointer'
            alt=""
          />

          <div className='group relative'>
            <img
              onClick={() => (token ? null : navigate('/login'))}
              className='w-5 cursor-pointer'
              src={assets.profile_icon}
              alt=""
            />

            {token && (
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                  <p className='cursor-pointer hover:text-black'>My Profile</p>
                  <p
                    onClick={() => navigate('/orders')}
                    className='cursor-pointer hover:text-black'
                  >
                    Orders
                  </p>
                  <p onClick={logout} className='cursor-pointer hover:text-black'>
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className='w-5 cursor-pointer sm:hidden'
            alt=""
          />
        </div>

        {/*  MOBILE MENU */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? 'w-full' : 'w-0'
          }`}
        >
          <div className='flex flex-col text-gray-600'>
            <div
              onClick={() => setVisible(false)}
              className='flex items-center gap-4 p-3 cursor-pointer'
            >
              <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
              <p>Back</p>
            </div>

            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className='py-2 pl-6 border'
              to='/collection'
            >
              COLLECTION
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className='py-2 pl-6 border'
              to='/contact'
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
