import React from 'react'
import moment from 'moment'
import fallbackImg from '../../../media/news-fallback.jpg'
import './newsCard.scss'

const NewsCard = ({
  image,
  title,
  desc,
  source,
  sourceImg,
  time,
  url,
}) => {
  return (
    <div className='news-card-container'>
      <div className='main-content'>
        <a href={url} target='_blank' rel="noreferrer">
          <div className='img-container'
            style={{
              backgroundImage: image ? `url(${image})` : `url(${fallbackImg})`
            }}
          />
        </a>
        <div className='content-container'>
          <a href={url} target='_blank' rel="noreferrer"><span className='xm'>{title}</span></a>
          <span className='s'>{desc ? desc : 'Read more...'}</span>
        </div>
      </div>
      <div className='footer-container'>
        <div className='publisher-img' style={{backgroundImage: `url(${sourceImg})`}} >
        </div>
        <div className='source-writer'>
          <span className='m'>{source}</span>
          <span className='s'>{moment(time).startOf('ss').fromNow()}</span>
        </div>
      </div>
    </div>
  )
}

export default NewsCard