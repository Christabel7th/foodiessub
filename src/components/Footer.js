import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 Foodiessub. All rights reserved.</p>
      <div className='footer-nav'>
        <Logo/>
        <a href="/">FAQ</a>
        <a href="/">Login</a>
        <a href="/">Register</a>
        <a href="/">Privacy Policy</a>
        <a href="/">Refund Policy</a>
        <a href="/">Contact us</a>
      </div>
    </footer>
  )
}

export default Footer