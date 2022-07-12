import React, { useEffect, useState } from 'react'
import axios from 'axios'

import GlobalBoard from '../../components/GlobalBoard/GlobalBoard'
import Search from '../../components/Search/Search'
import NewsGrid from '../../components/Grids/NewsGrid/NewsGrid'
import CoinGrid from '../../components/Grids/CoinGrid/CoinGrid'

const Home = ({
  globalData,
  btcData,
  theme
}) => {

  const [trendingData, setTrendingData] = useState(null);
  const [topCoinsData, setTopCoinsData] = useState(null);
  const [latestNews, setLatestNews] = useState(null);
  const [coinNewsErr, setCoinNewsErr] = useState(null);

  const getTopCoins = () => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=7&page=1&sparkline=true&price_change_percentage=7d')
    .then(res => {setTopCoinsData(res.data); })
    // .then(res => {setTopCoinsData(res.data); console.log('top coins:',res.data)})
  }
  const getTrendingCoins = () => {
    axios.get('https://api.coingecko.com/api/v3/search/trending')
      .then(res => {
        // console.log('first trending coins:',res.data.coins)
        const getReq = []
        res.data.coins.forEach(coin => {
          getReq.push(axios.get(`https://api.coingecko.com/api/v3/coins/${coin.item.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`))
        });
        Promise.all(getReq).then(res => {
          // console.log('second trending coins:', res)
          setTrendingData(res)
        })
      })
  }
  const getLatestNews = () => {
    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {
        freshness: 'Day', 
        sortBy: 'Day',
        count:'3',
        originalImg: 'true',
        q:'Crypto',
        safeSearch: 'Off', 
        textFormat: 'Raw',
      },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
        'X-RapidAPI-Key': '2dd85a6544msh36c87c41a3d32bbp15d646jsn39a15a676a2c'
      }
    };

    axios.request(options).then(function (response) {
      // console.log('news:', response.data.value);
      setLatestNews(response.data.value)
      if(coinNewsErr){
        setCoinNewsErr(null)
      }
    }).catch((error) => {
      if (error.response) {
        setCoinNewsErr(error.response.data.message)
      }
    })
  }

  useEffect(() => {
    getTrendingCoins();
    getTopCoins();
    getLatestNews();
  }, [])

  return (
    <div>
      <Search main theme={theme}/>
      <GlobalBoard 
        globalData={globalData} 
        btcData={topCoinsData}
      />
      <CoinGrid
        title='Top Coins'
        subtitle='(Mkt Cap)'
        coinData={topCoinsData}
        btn
        btnRoute='/coins'
        loaderQty={8}
      />
      <CoinGrid
        title='Trending Coins'
        subtitle=''
        coinData={trendingData}
        btn
        btnRoute='/coins'
        loaderQty={8}
      />
      {coinNewsErr && <div className='section-container' style={{backgroundColor:'red', padding:'.7rem .5rem'}} >{coinNewsErr}</div>}
      <NewsGrid
        title='Recent News'
        subtitle=''
        newsData={latestNews}
        btn
        btnRoute='/news'
        loaderQty={3}
      />
    </div>
  )
}

export default Home