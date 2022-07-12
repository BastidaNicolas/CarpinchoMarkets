import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ListCard2 from '../../components/Cards/ListCard2/ListCard2'
import './exchanges.scss'
import Search from '../../components/Search/Search';
import ListBlock from '../../components/LoadingTing/ListBlock';

const Exchanges = ({ btcData, theme }) => {

  const [exchangeList, setExchangeList] = useState(null)
  const [loadingMore, setLoadingMore] = useState(false)
  const [listPage, setListPage] = useState(1)

  const handleLoadingMore = () => {
    setLoadingMore(true);
    setListPage(listPage + 1)
  }

  const getExchangeList = () => {
    axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=100&page=${listPage}`)
      .then(res => {
        if (listPage > 1) {
          setExchangeList(listPage => [...listPage, ...res.data])
          setLoadingMore(false);
        } else {
          setExchangeList(res.data)
        }
        // console.log('exchanges:', res.data)
      })
  }

  useEffect(() => {
    getExchangeList()
  }, [listPage])


  return (
    <div className='page-container section-container'>
      <Search main theme={theme} />
      <div className='list-header bottom-border'>
        <div className='position'>
          <span className='m'>#</span>
        </div>
        <div className='exchange-name'>
          <span className='m'>Exchange</span>
        </div>
        <div className='trust-score'>
          <span className='m'>Trust Score</span>
        </div>
        <div className='trade-vol'>
          <span className='m'>24h Trade Vol.</span>
        </div>
        <div className='estab'>
          <span className='m'>Est.</span>
        </div>
      </div>
      {exchangeList && btcData ?
        <div className='list-content'>
          {exchangeList.map((exchange, index) => (
            <ListCard2
              key={exchange.id + index}
              position={exchange.trust_score_rank}
              image={exchange.image}
              listId={exchange.id}
              name={exchange.name}
              score={exchange.trust_score}
              tradeVol={exchange.trade_volume_24h_btc_normalized * btcData.market_data.current_price.usd}
              est={exchange.year_established}
              desc={exchange.description}
              link={exchange.url}
            />
          ))}
        </div>
        :
        <div className='list-content'>
          <ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock /><ListBlock />
        </div>
      }
      <div className='pagination-container'>
        <div className='show-more-btn button-theme' onClick={handleLoadingMore}>{loadingMore ? 'Loading...' : 'Load more'}</div>
      </div>
    </div>
  )
}

export default Exchanges