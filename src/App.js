import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import useThemeDetector from './functions/useThemeDetector';
import axios from 'axios';
import './App.scss';
// Components
import Appbar from './components/Appbar/Appbar';
import SideMenu from './components/SideMenu/SideMenu';
import Footer from './components/Footer/Footer';
// Pages
import Home from './pages/Home/Home'
import Coins from './pages/Coins/Coins'
import Coin from './pages/Coin/Coin'
import News from './pages/News/News'
import Exchanges from './pages/Exchanges/Exchanges'
// Functions

function App() {

  // Actions
  const [lightMode, setlightMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  // API Data
  const [globalData, setGlobalData] = useState(null);
  const [btcData, setBtcData] = useState(null);
  const [newsSearch, setNewsSearch] = useState('')


  const routePath = useLocation();
  const islightMode = useThemeDetector();

  // PASS ALL FUNCTION TO SEPERATE JS FILE
  const handleTheme = () => {
    setlightMode(!lightMode)
  }
  const handleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  const getGlobalData = () => {
    axios.get('https://api.coingecko.com/api/v3/global')
      .then(res => {
        setGlobalData(res.data.data)
        // console.log('global:', res.data.data)
      })
  }
  const getBtcData = () => {
    axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true')
      .then(res => {
        setBtcData(res.data)
        // console.log('bitcoin:', res.data)
      })
  }

  useEffect(() => {
    getGlobalData();
    getBtcData();
    if(islightMode){
      setlightMode(true);
    }else{
      setlightMode(false)
    }
  }, [])

  useEffect(() => {
    scrollToTop();
  }, [routePath.pathname])

  return (
    <div className={`App ${lightMode ? 'lightMode' : 'darkMode'}`}>
      <SideMenu
        theme={lightMode}
        handleTheme={handleTheme}
        menuOpen={menuOpen}
        handleMenu={handleMenu}
      />
      <Appbar
        data={globalData}
        theme={lightMode}
        handleTheme={handleTheme}
        menuOpen={menuOpen}
        handleMenu={handleMenu}
        scrollToTop={scrollToTop}
        setNewsSearch={setNewsSearch}
      />
      <main>
        <Routes>
          <Route path='/' element={
            <Home
              globalData={globalData}
              btcData={btcData}
              theme={lightMode}
            />
          } />
          <Route path='/coins' element={
            <Coins
              theme={lightMode}
            />
          } />
          <Route path='/coins/:id' element={
            <Coin
              globalData={globalData}
              theme={lightMode}
            />
          } />
          <Route path='/exchanges' element={
            <Exchanges
              btcData={btcData}
              theme={lightMode}
            />
          } />
          <Route path='/news' element={
            <News
              theme={lightMode}
              newsSearch={newsSearch} 
              setNewsSearch={setNewsSearch}
            />
          } />
        </Routes>
      </main>
      <Footer scrollToTop={scrollToTop} />
    </div>
  );
}

export default App;
