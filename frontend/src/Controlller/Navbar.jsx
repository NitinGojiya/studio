import React, { useState } from 'react'
import Login from './Login'

const Navbar = ({ login, setLogin, user, setUser, admin }) => {

  const logout = () => {
    localStorage.setItem("login", "false")
    localStorage.setItem("user", null)

  }

  return (
    <>

      <div className="navbar bg-[#29221d] md:text-white font-serif font-bold sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a href='/'>Home</a></li>
              {login === "true"
                ?
                <li><a href='/studio'>Studio</a></li>
                :
                <></>
              }
              {login === "true"
                ?
                <li><a href='/orderdetails'>Your Booking Details</a></li>
                :
                <></>
              }
              <li><a href='/service'>Service</a></li>
              <li><a href='/aboutus'>About us</a></li>
              {login === "true"
                ?
                <></>
                :
                <li><a href='/signup'>Signup</a></li>
               
              }


            </ul>
          </div>
          <a className="text-2xl"><span className="text-3xl text-red-500">S</span>tudio.com</a>
        </div>
        <div className="navbar-end">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a href='/'>Home</a></li>
              {login === "true"
                ?
                <li><a href='/studio'>Studio</a></li>
                :
                <></>
              }
              {login === "true"
                ?
                <li><a href='/orderdetails'>Your Booking Details</a></li>
                :
                <></>
              }
              <li><a href='/service'>Service</a></li>
              <li><a href='/aboutus'>About us</a></li>
              {login === "true"
                ?
                <></>
                :
                <li><a href='/signup'>Signup</a></li>
               
              }

            </ul>
          </div>
          {
            login === "true" ? <a className="btn btn-outline btn-accent" href='/' onClick={logout}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>


            </a>
              :
              <a className="btn btn-outline btn-accent" onClick={() => document.getElementById('my_modal_1').showModal()}>
                Login

              </a>
          }

          <Login login={login} setLogin={setLogin} user={user} setUser={setUser} />
        </div>
      </div>


    </>
  )
}

export default Navbar
