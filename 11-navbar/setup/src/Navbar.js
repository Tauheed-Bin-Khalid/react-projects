import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef(null);
  const linkRef = useRef(null)

  useEffect(()=>{
    const linksHeight 
    = linkRef.current.getBoundingClientRect().height;
    if(showLinks){
      linksContainerRef.current.style.height = `${linksHeight}px`
    }
  else{
    linksContainerRef.current.style.height = '0px'
  }

  },[showLinks])

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} alt="logo" />
          <button className='nav-toggle'
            onClick={() => setShowLinks(!showLinks)}>
            <FaBars />
          </button>
        </div>

        <div className='links-container'
          ref={linksContainerRef}>
          <ul className='links' ref={linkRef}>
            {links.map((link) => {
              const { id, url, text } = link
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              )
            })}
          </ul>
        </div>
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon
            return (
              <li key={id}>
                <a href={url}>
                  {icon}</a>
              </li>

            )
          })}

        </ul>
      </div>

    </nav>)
}

export default Navbar
