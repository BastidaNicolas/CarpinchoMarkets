import React from 'react'
import { Link } from 'react-router-dom';
import { BsMoonFill, BsSunFill, BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import './appbar.scss'

import LogoLight from '../../media/logo/light-mode-logo.svg'
import LogoDark from '../../media/logo/dark-mode-logo.svg'
import Hamburg from '../../media/hamburger-menu.svg'
import Search from '../Search/Search';

const Appbar = ({
  data,
  theme,
  handleTheme,
  menuOpen,
  handleMenu,
  scrollToTop,
  setNewsSearch
}) => {

  return (
    <>
      <div className='header-banner-container bottom-border'>
        <div className='header-banner section-container'>
          {data ?
            <ul>
              <li><span className='s'>Coins: <span className='banner-info'>{data.active_cryptocurrencies}</span></span></li>
              <li><span className='s'>Markets: <span className='banner-info'>{data.markets}</span></span></li>
              <li><span className='s'>Market Cap: <span className='banner-info'>
                {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(data.total_market_cap.usd)}
              </span> <span style={{
                color: data.market_cap_change_percentage_24h_usd >= 0 ? 'var(--green)' : 'var(--red)',
              }}>
                  {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(data.market_cap_change_percentage_24h_usd / 100)}
                  {data.market_cap_change_percentage_24h_usd >= 0 ?
                    <BsCaretUpFill /> : <BsCaretDownFill />}
                </span>
              </span></li>
              <li><span className='s'>24h Vol: <span className='banner-info'>
                {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(data.total_volume.usd)}
              </span></span></li>
            </ul>
            :
            <ul>
              <li><span className='s'>Coins: --/--</span></li>
              <li><span className='s'>Markets: --/--</span></li>
              <li><span className='s'>Market Cap: --/--</span></li>
              <li><span className='s'>24h Vol: --/--</span></li>
            </ul>
          }
          <span className='theme-btn icon' onClick={handleTheme}>
            {theme ? <BsMoonFill /> : <BsSunFill />}
          </span>
        </div>
      </div>
      <div className={`main-header-container-sticky ${theme ? 'lightMode' : 'darkMode'} bottom-border`}>
        <div className='main-header section-container'>
          <Link className='logo-container' to='/'>
            <img src={theme ? LogoLight : LogoDark} alt="carpincho logo" width="243.51px" height="40px" />
          </Link>
          <nav>
            <ul>
              <li><Link to='/coins' onClick={handleMenu}><h4>Coins</h4></Link></li>
              <li><Link to='/news' onClick={handleMenu}><h4>News</h4></Link></li>
              <li><Link to='/exchanges' onClick={handleMenu}><h4>Exchanges</h4></Link></li>
              <li><Link to='/' onClick={handleMenu}><h4>NFT Builder</h4></Link></li>
            </ul>
          </nav>
          <Search theme={theme} setNewsSearch={setNewsSearch} />
          <span className='menu-btn icon' onClick={handleMenu}><GiHamburgerMenu/></span>
        </div>
      </div>
    </>
  )
}

export default Appbar