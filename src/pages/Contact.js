
import React from 'react'

const Contact = () => {
  return (
    <section className="contact">
      
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
      <p>📍 123 Food Street, Lagos</p>
      <p>📞 +234 800 123 4567</p>
    
    </section>
  )
}

export default Contact