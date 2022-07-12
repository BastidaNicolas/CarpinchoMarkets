import React, { useEffect, useState } from 'react'
import './coins.scss'
import { BsSliders, BsCaretDownFill } from 'react-icons/bs'
import Search from '../../components/Search/Search'
import ListCard from '../../components/Cards/ListCard/ListCard'
import axios from 'axios'
import ListBlock from '../../components/LoadingTing/ListBlock'

const Coins = ({theme}) => {

  const [coinList, setCoinList] = useState(null)
  const [coinCatList, setCoinCatList] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const [listOrder, setListOrder] = useState('market_cap_desc')
  const [coinCat, setCoinCat] = useState('all')
  const [pageNum, setPageNum] = useState(1)

  const handleLoadingMore = () => {
    setLoadingMore(true);
    setPageNum(pageNum + 1)
  }

  const getCoinList = () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${listOrder}&${coinCat === 'all' ? '' : (`&category=${coinCat}`)}&per_page=100&page=${pageNum}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`)
      .then(res => {
        if(pageNum > 1){
          setCoinList(coinList => [...coinList , ...res.data]);
          setLoadingMore(false)
        }else{
          setCoinList(res.data);
        }
        // console.log('CoinList:', res.data)
      })
  }
  const getCoinCat = () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/categories/list`)
      .then(res => { 
        setCoinCatList(res.data); 
        // console.log('CoinCat:', res.data) 
      })
  }

  useEffect(() => {
    getCoinCat()
  }, [])

  useEffect(() => {
    setCoinList(null)
    getCoinList()
  }, [listOrder, coinCat])

  useEffect(() => {
    if(pageNum > 1){
      getCoinList()
    }
  }, [pageNum])

  return (
    <div className='coins-page-container section-container'>
      <div className='filter-container'>
        <div className='filter-main'>
          <Search main theme={theme} />
          <BsSliders className='more-fltr-btn icon' onClick={() => setFilterOpen(!filterOpen)} />
        </div>
        <div className={`filter-options bkg-clr-2 ${filterOpen && 'filter-options-show'}`}>
          <div className='select-container button-theme'>
            <select onChange={(e) => {setPageNum(1); setListOrder(e.target.value)}}>
              <option value='market_cap_desc'>Higher Mkt Cap </option>
              <option value='market_cap_asc'>Lower Mkt Cap</option>
              <option value='volume_desc'>Higher Volume</option>
              <option value='volume_asc'>Lower Volume</option>
            </select>
            <BsCaretDownFill />
          </div>
          <div className='select-container button-theme'>
            <select onChange={(e) => {setPageNum(1); setCoinCat(e.target.value)}}>
              <option value='all'>All Categories</option>
              {coinCatList &&
                coinCatList.map(cat => (
                  <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                ))
              }
            </select>
            <BsCaretDownFill />
          </div>
        </div>
      </div>
      <div className='list-container'>
        <div className='list-header bottom-border'>
          <div className='position'>
            <span className='m'>#</span>
          </div>
          <div className='name'>
            <span className='m'>Coin</span>

          </div>
          <div className='price'>
            <span className='m'>Price</span>

          </div>
          <div className='percent h1-time'>
            <span className='m'>1h</span>

          </div>
          <div className='percent h24-time'>
            <span className='m'>24h</span>

          </div>
          <div className='percent d7-time'>
            <span className='m'>7d</span>

          </div>
          <div className='vol-24h'>
            <span className='m'>24h Volume</span>

          </div>
          <div className='mkt-cap'>
            <span className='m'>Mkt Cap</span>

          </div>
          <div className='sparkline'>
            <span className='m'>7d Grid</span>

          </div>
        </div>
        <div className='list'>
          {coinList ?
            coinList.map((coin, index) => (
              <ListCard
                key={coin.id + index}
                position={coin.market_cap_rank}
                icon={coin.image}
                name={coin.name}
                coinId={coin.id}
                symbol={coin.symbol}
                price={coin.current_price}
                h1={coin.price_change_percentage_1h_in_currency}
                h24={coin.price_change_percentage_24h_in_currency}
                d7={coin.price_change_percentage_7d_in_currency}
                priceChange={coin.total_volume}
                mrktCap={coin.market_cap}
                sparkline={coin.sparkline_in_7d.price}
              />
            ))
            :
            <>
              <ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock />
            </>
          }
        </div>
      </div>
      <div className='pagination-container'>
        <div className='button-theme show-more-btn' onClick={handleLoadingMore}>{loadingMore ? 'Loading...':'Load more'}</div>
      </div>
    </div>
  )
}

export default Coins