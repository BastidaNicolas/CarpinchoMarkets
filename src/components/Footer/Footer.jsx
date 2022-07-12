import React from 'react'
import { Link } from 'react-router-dom';
import './footer.scss'

import Logo from '../../media/logo/dark-mode-logo.svg';

const Footer = ({scrollToTop}) => {
  return (
    <div className='footer-cotainer'>
      <div className='footer section-container'>
        <div className='logo-section'>
          <img src={Logo} alt='carpincho logo' width='320px' height='52px' />
          <p>Carpincho provides a fundamental analysis of the crypto market. Tracking price, volume and market capitalisation. This is possible by displaying data obtained from CoinGecko API.</p>
        </div>
        <div className='nav-section'>
          <ul className='link-list'>
            <li className='list-title'>The Page’s Pages</li>
            <li><Link className='list-item' to='/' onClick={scrollToTop}>Home</Link></li>
            <li><Link className='list-item' to='/coins'>Coins</Link></li>
            <li><Link className='list-item' to='/news'>News</Link></li>
            <li><Link className='list-item' to='/exchanges'>Exchanges</Link></li>
          </ul>
          <ul className='link-list'>
            <li className='list-title'>Website Uses</li>
            <li><a className='list-item' href='https://www.coingecko.com/en/api' target='_blank' rel="noreferrer" >Coingecko API</a></li>
            <li><a className='list-item' href='https://docs.microsoft.com/en-us/bing/search-apis/bing-news-search/how-to/search-for-news' target='_blank' rel="noreferrer">Bing API</a></li>
            <li><a className='list-item' href='https://www.tradingview.com/lightweight-charts/' target='_blank' rel="noreferrer">Tradingview</a></li>
          </ul>
          <ul className='link-list'>
            <li className='list-title'>Donations</li>
            <li><span className='list-item' >Bitcoin</span></li>
            <li><span className='list-item' >Ethereum</span></li>
            <li><span className='list-item' >Solana</span></li>
          </ul>
        </div>
        <div className='subscription-section'>
          <span>Want ads sent to your mail?</span>
          <p>Sign up to our “News letter” and get the latest information in the cryptoverse.</p>
          <input type='email' placeholder='Enter Your Email' disabled/>
          <button className='button'>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default Footer