import React, { useEffect, useState } from 'react'
import { AiFillSliders, AiOutlineRise } from "react-icons/ai";
import { useParams } from 'react-router-dom'
import './coin.scss'
import axios from 'axios'
import moment from 'moment'
import HTMLReactParser from 'html-react-parser';

import NewsGrid from '../../components/Grids/NewsGrid/NewsGrid';
import { CandleChart } from '../../components/ChartTypes/CandleChart';
import { LineChart } from '../../components/ChartTypes/LineChart';
import GridBlock from '../../components/LoadingTing/GridBlock';
import ListBlock from '../../components/LoadingTing/ListBlock';

const Coin = ({ globalData, theme }) => {

  const { id } = useParams();
  const [coinData, setCoinData] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [chartSettings, setChartSettings] = useState({
    type: 'line',
    time: '7'
  })
  const [coinNews, setCoinNews] = useState(null)
  const [coinNewsErr, setCoinNewsErr] = useState(null)
  const [listPage, setListPage] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)

  const handleChartType = () => {
    if (chartSettings.type === 'candle') {
      return <CandleChart data={chartData} theme={theme}/>
    }
    return <LineChart data={chartData} price={handleChartColor()} theme={theme}/>
  }
  const handleChartColor = () => {
    switch (chartSettings.time) {
      case '1':
        return coinData?.market_data?.price_change_percentage_24h_in_currency?.usd
      case '7':
        return coinData?.market_data?.price_change_percentage_7d_in_currency?.usd
      case '14':
        return coinData?.market_data?.price_change_percentage_14d_in_currency?.usd
      case '30':
        return coinData?.market_data?.price_change_percentage_30d_in_currency?.usd
      case '90':
        return coinData?.market_data?.price_change_percentage_60d_in_currency?.usd
      case '180':
        return coinData?.market_data?.price_change_percentage_200d_in_currency?.usd
      case '365':
        return coinData?.market_data?.price_change_percentage_1y_in_currency?.usd
      case 'max':
        return coinData?.market_data?.atl_change_percentage?.usd
      default:
        return 1
    }
  }
  const handleLoadingMore = () => {
    setLoadingMore(true);
    setListPage(listPage + 3)
  }

  const getCoinData = () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
      .then(res => {
        // console.log('Coin Info:', res.data)
        setCoinData(res.data)
      })
  }
  const getChartData = () => {
    setChartData(null)
    let data = []
    if (chartSettings.type === 'line') {
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${chartSettings.time}`)
        .then(res => {
          // console.log('Time stamp:', res.data.prices)
          res.data.prices.map(info => {
            data = [...data, { time: info[0] / 1000, value: info[1] }]
          })
          setChartData(data)
        })
    } else if (chartSettings.type === 'candle') {
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${chartSettings.time}`)
        .then(res => {
          // console.log('Time stamp:', res.data)
          res.data.map(info => {
            data = [...data, { time: info[0] / 1000, open: info[1], high: info[2], low: info[3], close: info[4] }]
          })
          setChartData(data)
        })
    }

  }
  const getNews = () => {
    axios.request({
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {
        freshness: 'Day',
        sortBy: 'Day',
        count: '3',
        offset: `${listPage}`,
        q: `${id} cryptocurrency`,
        originalImg: 'true',
        safeSearch: 'Off',
        textFormat: 'Raw',
      },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
        'X-RapidAPI-Key': '2dd85a6544msh36c87c41a3d32bbp15d646jsn39a15a676a2c'
      }
    }).then(function (response) {
      // console.log('news:', response.data.value);
      if (listPage > 0) {
        setCoinNews(coinNews => [...coinNews, ...response.data.value])
        setLoadingMore(false)
      } else {
        setCoinNews(response.data.value)
      }
      if(coinNewsErr){
        setCoinNewsErr(null)
      }
    }).catch((error) => {
      if (error.response) {
        setCoinNewsErr(error.response.data.message)
        setLoadingMore(false)
      }
    })
  }

  useEffect(() => {
    getCoinData()
    getChartData()
    // getNews()
  }, [])
  useEffect(() => {
    getChartData()
  }, [chartSettings])
  useEffect(() => {
    getNews()
  }, [listPage])
  // useEffect(() => {
  //   console.log('pepe:', chartData)
  // }, [chartData])
  return (
    <div className='coin-page-container'>
      {coinData ?
        <>
          <div className='coin-main-content section-container'>
            <div className='chart-content'>
              <span className='xl' style={{ marginBottom: '15px' }} >{coinData.name} Price Chart ({coinData.symbol.toUpperCase()})</span>
              <div className='chart-settings'>
                <div className='chart-type-btns-container full-border'>
                  <div
                    className='linear-btn btn-simple-theme chart-type-btns right-border'
                    style={{ backgroundColor: chartSettings.type === 'line' && 'var(--black05)' }}
                    onClick={() => setChartSettings({ type: 'line', time: chartSettings.time })}
                  >
                    <AiOutlineRise />
                  </div>
                  <div
                    className='candle-btn btn-simple-theme chart-type-btns'
                    style={{ backgroundColor: chartSettings.type === 'candle' && 'var(--black05)' }}
                    onClick={() => setChartSettings({ type: 'candle', time: chartSettings.time })}
                  >
                    <AiFillSliders />
                  </div>
                </div>
                <div className='chart-time-btns-container full-border'>
                  <div
                    className='d1-btn chart-time-btns right-border btn-simple-theme'
                    style={{ backgroundColor: chartSettings.time === '1' && 'var(--black05)' }}
                    onClick={() => setChartSettings({ type: chartSettings.type, time: '1' })}
                  >
                    24h
                  </div>
                  <div
                    className='d7-btn chart-time-btns right-border btn-simple-theme'
                    style={{ backgroundColor: chartSettings.time === '7' && 'var(--black05)' }}
                    onClick={() => setChartSettings({ type: chartSettings.type, time: '7' })}
                  >
                    7d
                  </div>
                  <div
                    className='d14-btn chart-time-btns right-border btn-simple-theme'
                    style={{ backgroundColor: chartSettings.time === '14' && 'var(--black05)' }}
                    onClick={() => setChartSettings({ type: chartSettings.type, time: '14' })}
                  >
                    14d
                  </div>
                  <div
                    className='d30-btn chart-time-btns right-border btn-simple-theme'
                    style={{ backgroundColor: chartSettings.time === '30' && 'var(--black05)' }}
                    onClick={() => setChartSettings({ type: chartSettings.type, time: '30' })}
                  >
                    30d
                  </div>
                  <div
                    className='d90-btn chart-time-btns right-border btn-simple-theme hide-btn'
                    style={{ backgroundColor: chartSettings.time === '90' && 'var(--black05)' }}
                    onClick={() => setChartSettings({ type: chartSettings.type, time: '90' })}
                  >
                    90d
                  </div>
                  <div
                    className='d180-btn chart-time-btns right-border btn-simple-theme hide-btn'
                    style={{ backgroundColor: chartSettings.time === '180' && 'var(--black05)' }}
                    onClick={() => setChartSettings({ type: chartSettings.type, time: '180' })}
                  >
                    180d
                  </div>
                  <div
                    className='d365-btn chart-time-btns right-border btn-simple-theme'
                    style={{ backgroundColor: chartSettings.time === '365' && 'var(--black05)' }}
                    onClick={() => setChartSettings({ type: chartSettings.type, time: '365' })}
                  >
                    1y
                  </div>
                  <div
                    className='dmax-btn chart-time-btns btn-simple-theme'
                    style={{ backgroundColor: chartSettings.time === 'max' && 'var(--black05)' }}
                    onClick={() => setChartSettings({ type: chartSettings.type, time: 'max' })}
                  >
                    Max
                  </div>
                </div>
              </div>
              {chartData ?
                handleChartType()
                :
                <div className='loading-chart s bkg-clr-2'>
                  Loading...
                </div>
              }
              <div className='persentage-chart-container full-border'>
                <div className='persentage-chart-column right-border'>
                  <div className='persentage-header chart-grid bottom-border'>
                    <span className='s' >1h</span>
                  </div>
                  <div className='persentage-value chart-grid'>
                    {coinData.market_data.price_change_percentage_1h_in_currency.usd ?
                      <span style={{ color: coinData.market_data.price_change_percentage_1h_in_currency.usd >= 0 ? 'var(--green)' : 'var(--red)' }}>
                        {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(coinData.market_data.price_change_percentage_1h_in_currency.usd / 100)}
                      </span>
                      :
                      <span>--/--</span>
                    }
                  </div>
                </div>
                <div className='persentage-chart-column right-border'>
                  <div className='persentage-header chart-grid bottom-border'>
                    <span className='s'>24h</span>
                  </div>
                  <div className='persentage-value chart-grid'>
                    {coinData.market_data.price_change_percentage_24h_in_currency.usd ?
                      <span style={{ color: coinData.market_data.price_change_percentage_24h_in_currency.usd >= 0 ? 'var(--green)' : 'var(--red)' }}>
                        {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(coinData.market_data.price_change_percentage_24h_in_currency.usd / 100)}
                      </span>
                      :
                      <span>--/--</span>
                    }
                  </div>
                </div>
                <div className='persentage-chart-column right-border'>
                  <div className='persentage-header chart-grid bottom-border'>
                    <span className='s'>7d</span>
                  </div>
                  <div className='persentage-value chart-grid'>
                    {coinData.market_data.price_change_percentage_7d_in_currency.usd ?
                      <span style={{ color: coinData.market_data.price_change_percentage_7d_in_currency.usd >= 0 ? 'var(--green)' : 'var(--red)' }}>
                        {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(coinData.market_data.price_change_percentage_7d_in_currency.usd / 100)}
                      </span>
                      :
                      <span>--/--</span>
                    }
                  </div>
                </div>
                <div className='persentage-chart-column right-border'>
                  <div className='persentage-header chart-grid bottom-border'>
                    <span className='s'>14d</span>
                  </div>
                  <div className='persentage-value chart-grid'>
                    {coinData.market_data.price_change_percentage_14d_in_currency.usd ?
                      <span style={{ color: coinData.market_data.price_change_percentage_14d_in_currency.usd >= 0 ? 'var(--green)' : 'var(--red)' }}>
                        {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(coinData.market_data.price_change_percentage_14d_in_currency.usd / 100)}
                      </span>
                      :
                      <span>--/--</span>
                    }
                  </div>
                </div>
                <div className='persentage-chart-column right-border'>
                  <div className='persentage-header chart-grid bottom-border'>
                    <span className='s'>30d</span>
                  </div>
                  <div className='persentage-value chart-grid'>
                    {coinData.market_data.price_change_percentage_30d_in_currency.usd ?
                      <span style={{ color: coinData.market_data.price_change_percentage_30d_in_currency.usd >= 0 ? 'var(--green)' : 'var(--red)' }}>
                        {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(coinData.market_data.price_change_percentage_30d_in_currency.usd / 100)}
                      </span>
                      :
                      <span>--/--</span>
                    }
                  </div>
                </div>
                <div className='persentage-chart-column'>
                  <div className='persentage-header chart-grid bottom-border'>
                    <span className='s'>1y</span>
                  </div>
                  <div className='persentage-value chart-grid'>
                    {coinData.market_data.price_change_percentage_1y_in_currency.usd ?
                      <span style={{ color: coinData.market_data.price_change_percentage_1y_in_currency.usd >= 0 ? 'var(--green)' : 'var(--red)' }}>
                        {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(coinData.market_data.price_change_percentage_1y_in_currency.usd / 100)}
                      </span>
                      :
                      <span>--/--</span>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='coin-info full-border'>
              <span className='l'>Price Statistics</span>
              <ul>
                <li className='bottom-border'>
                  <span className='title s'>{coinData?.name} Price</span>
                  <span className='value content'>
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(coinData?.market_data?.current_price?.usd)}
                  </span>
                </li>
                <li className='bottom-border'>
                  <span className='title s'>Market Cap Rank</span>
                  <span className='value content'>#{coinData?.market_data?.market_cap_rank}</span>
                </li>
                <li className='bottom-border'>
                  <span className='title s'>Market Cap</span>
                  <span className='value content'>
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(coinData?.market_data?.market_cap?.usd)}
                  </span>
                </li>
                <li className='bottom-border'>
                  <span className='title s'>Market Cap Dominance</span>
                  <span className='value content'>
                    {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format((coinData?.market_data?.market_cap?.usd) / globalData?.total_market_cap?.usd)}
                  </span>
                </li>
                <li className='bottom-border'>
                  <span className='title s'>Trading Volume</span>
                  <span className='value content'>
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(coinData?.market_data?.total_volume?.usd)}
                  </span>
                </li>
                <li className='bottom-border'>
                  <span className='title s'>Volume / Market Cap</span>
                  <span className='value content'>
                    {Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 }).format(coinData?.market_data?.total_volume?.usd / coinData?.market_data?.market_cap?.usd)}
                  </span>
                </li>
                <li className='bottom-border'>
                  <span className='title s'>24h Low / 24h High</span>
                  <span className='value content'>
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(coinData?.market_data?.low_24h?.usd)} / {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(coinData?.market_data?.high_24h?.usd)}
                  </span>
                </li>
                <li className='bottom-border'>
                  <span className='title s'>Max Supply / Circulating Supply</span>
                  <span className='value content'>
                    {Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(coinData?.market_data?.max_supply)} / {Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(coinData?.market_data?.circulating_supply)}
                  </span>
                </li>
                <li className='bottom-border'>
                  <span className='title s'>All-Time High</span>
                  <div className='value'>
                    <span className='value content'>
                      {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(coinData?.market_data?.ath?.usd)} <span style={{ color: coinData?.market_data?.ath_change_percentage?.usd >= 0 ? 'var(--green)' : 'var(--red)' }}>
                        {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(coinData?.market_data?.ath_change_percentage?.usd / 100)}
                      </span>
                    </span>
                    <span className='date content' >{moment(coinData?.market_data?.ath_date?.usd).format('LL')}</span>
                  </div>
                </li>
                <li>
                  <span className='title s'>All-Time Low</span>
                  <div className='value'>
                    <span className='value content'>
                      {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(coinData?.market_data?.atl?.usd)} <span style={{ color: coinData?.market_data?.atl_change_percentage?.usd >= 0 ? 'var(--green)' : 'var(--red)' }}>
                        {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(coinData?.market_data?.atl_change_percentage?.usd / 100)}
                      </span>
                    </span>
                    <span className='date content' >{moment(coinData?.market_data?.atl_date?.usd).format('LL')}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='coin-about-section section-container content'>
            <span className='xl'>About {coinData?.name}</span>
            {coinData.description.en ?
              HTMLReactParser(coinData.description.en)
              :
              '---'
            }
          </div>
        </>
        :
        <>
          <div className='coin-main-content section-container'>
            <div className='chart-content' style={{ height: 'fit-content' }} >
              <ListBlock qty={1} />
              <GridBlock qty={1} />
            </div>
            <div className='' style={{ height: '100%' }} >
              <GridBlock qty={1} />
            </div>
          </div>
          <div className='coin-about-section section-container'>
            <GridBlock gty={1} />
          </div>
        </>
      }
      <div className='coin-news-section' >
        {coinNewsErr && <div className='section-container' style={{ backgroundColor: 'red', padding: '.7rem .5rem' }} >{coinNewsErr}</div>}
        <NewsGrid
          title={`${coinData?.name} Recent News`}
          subtitle=''
          newsData={coinNews}
          loaderQty={3}
        />
        <div className='pagination-container'>
          <div className='show-more-btn button-theme' onClick={handleLoadingMore}>{loadingMore ? 'Loading...' : 'Load more'}</div>
        </div>
      </div>
    </div>
  )
}

export default Coin