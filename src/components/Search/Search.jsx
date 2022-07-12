import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { BsSearch } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import SearchCard from '../Cards/SearchCard/SearchCard';
import './search.scss'

const Search = ({ main, theme, setNewsSearch }) => {

  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation().pathname;

  const debounce = (call, delay = 1000) => {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        call(...args)
      }, delay);
    }
  }

  const handleSearch = debounce((value) => {
    if(location === '/news'){
      setNewsSearch(value)
      return
    }
    if (!value) {
      setSearchData([])
      return
    }
    axios.get(`https://api.coingecko.com/api/v3/search?query=${value}`)
      .then(
        res => { 
          // console.log(res.data); 
          setSearchData(res.data) 
        }
      )
  })

  const displaySearch = () => {
    if (!searchData.coins) {
      return (
        <span className='xs' style={{ display: 'block', padding: '.5rem 1rem' }}>No Results Found</span>
      )
    }
    if (searchData.coins.length > 0) {
      return (
        searchData.coins.map(coin => (
          <SearchCard
            key={coin.id}
            image={coin.thumb}
            name={coin.name}
            position={coin.market_cap_rank}
            route={`/coins/${coin.id}`}

          />
        ))
      )
    }
    return (
      <span className='xs' style={{ display: 'block', padding: '.5rem 1rem' }}>No Results Found</span>
    )

  }

  return (
    <div className={`${theme ? 'search-light' : 'search-dark'} search-container ${main && 'main'}`}>
      {/* <input type='search' placeholder='Search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} required /> */}
      <input type='search' placeholder='Search' onChange={(e) => handleSearch(e.target.value.toLowerCase())} required />
      <BsSearch />
      <div className={location === '/news' ? 'search-result-none':'search-result'} id='style-4'>
        <div className='search-section '>
          <div className='section-header bottom-border'>
            <span className='xs' >Currencies</span>
          </div>
          {searchData &&
            displaySearch()
          }
        </div>
      </div>
    </div>
  )
}

export default Search