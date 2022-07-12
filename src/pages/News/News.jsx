import React, { useEffect, useState } from 'react'
import './news.scss'
import axios from 'axios'
import Search from '../../components/Search/Search'
import NewsGrid from '../../components/Grids/NewsGrid/NewsGrid'

const News = ({
  theme,
  newsSearch,
  setNewsSearch,
}) => {
  const [newsList, setNewsList] = useState(null)
  const [loadingMore, setLoadingMore] = useState(false)
  const [listPage, setListPage] = useState(0)
  const [coinNewsErr, setCoinNewsErr] = useState(null)

  const handleLoadingMore = () => {
    setLoadingMore(true);
    setListPage(listPage + 15)
  }

  useEffect(() => {
    axios.request({
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {
        freshness: 'Day',
        sortBy: 'Day',
        count: '15',
        offset: `${listPage}`,
        q: `Crypto ${newsSearch}`,
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
        setNewsList(newsList => [...newsList, ...response.data.value])
        setLoadingMore(false)
      } else {
        setNewsList(response.data.value)
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
  }, [listPage, newsSearch])


  return (
    <div className='news-page-container'>
      <Search main theme={theme} setNewsSearch={setNewsSearch} />
      {coinNewsErr && <div className='section-container' style={{ backgroundColor: 'red', padding: '.7rem .5rem' }} >{coinNewsErr}</div>}
      <NewsGrid
        title=''
        subtitle=''
        newsData={newsList}
        loaderQty={9}
      />
      <div className='pagination-container'>
        <div className='show-more-btn button-theme' onClick={handleLoadingMore}>{loadingMore ? 'Loading...' : 'Load more'}</div>
      </div>
    </div>
  )
}

export default News