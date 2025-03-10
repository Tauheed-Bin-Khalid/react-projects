import React from 'react'
import phoneImg from './images/phone.svg'
import { useGlobalContext } from './context'
const Hero = () => {
  const {closeSubmenu} = useGlobalContext()
  
  return <section className='hero' onMouseOver={closeSubmenu}>
    <div className='hero-center'>
      <article className='hero-info' >
        <h1>Payments infrastructure for the internet</h1>
        <p>
          Millions of cmpanies of all sizes from startups to 
          fortune 500 use
          Stripes software and apis to accept payments, send
          payouts and 
          manage their buisness online.
        </p>
        <button className='btn'>Start now</button>
      </article>
      <article className='hero-images'>
        <img src={phoneImg} className='phone-img' 
        alt='phone'/>
        
        </article>
      
    </div>
  </section>
}

export default Hero
