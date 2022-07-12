import React from 'react'
import { Link } from 'react-router-dom'
import './searchCard.scss'

const SearchCard = ({image, name, position, route}) => {
  return (
    <Link to={route} className='search-card-container' >
        <img src={`${image}`}/>
        <span className='s' style={{flexGrow: 1}} >{`${name}`}</span>
        <span className='s'>{position ? `${position}`:""}</span>
    </Link>
  )
}

export default SearchCard