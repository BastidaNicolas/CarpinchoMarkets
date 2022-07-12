import React from 'react'
import { Link } from 'react-router-dom'
import './sectionGrid.scss'

// Components
import CoinCard from '../Cards/CoinCard/CoinCard'
import NewsCard from '../Cards/NewsCard/NewsCard'
import GridBlock from '../LoadingTing/GridBlock'

const SectionGrid = ({
  title,
  subtitle,
  dataType,
  data,
  btnPosition,
  btnRoute
}) => {

  const typeOfCard = (type, title) => {
    if (type === 'coins') {
      if (title === 'Top Coins') {
        return (
          data.map((coin) => (
            <CoinCard
              key={coin.name}
              icon={coin.image}
              name={coin.name}
              coinId={coin.id}
              symbol={coin.symbol}
              price={coin.current_price}
              percentage={coin.price_change_percentage_7d_in_currency}
              sparkline={coin.sparkline_in_7d.price}
            />
          ))
        )
      } else {
        return (
          data.map((coin) => (
            <CoinCard
              key={coin.data.name}
              icon={coin.data.image.small}
              name={coin.data.name}
              coinId={coin.data.id}
              symbol={coin.data.symbol}
              price={coin.data.market_data.current_price.usd}
              percentage={coin.data.market_data.price_change_percentage_7d}
              sparkline={coin.data.market_data.sparkline_7d.price}
            />
          ))
        )
      }
    } else if (type === 'news') {
      return (
        data.map(article => (
          <NewsCard
            key={article.name}
            image={article.image.contentUrl}
            title={article.name}
            desc={article.description}
            source={article.provider[0].name}
            sourceImg={article.provider[0].image && article.provider[0].image.thumbnail.contentUrl}
            time={article.datePublished}
            url={article.url}
          />
        ))
      )
    }
  }

  return (
    <div className='home-section section-container'>
      <div className='section-titles'>
        <h1>{title} <span>{subtitle}</span></h1>
        {btnPosition === 'header' &&
          <div className='more-btn header-btn'>
            <Link to={btnRoute}>
              View More
            </Link>
          </div>
        }
      </div>
      <div className='section-grid'>
        {data ?
          <>
            {typeOfCard(dataType, title)}
            <div className={`more-btn ${btnPosition === 'header' && 'grid-btn'}`}>
              <Link to={btnRoute}>
                View More
              </Link>
            </div>
          </>
          :
          <>
            <GridBlock /><GridBlock /><GridBlock /><GridBlock /><GridBlock /><GridBlock /><GridBlock />
          </>
        }
      </div>
    </div>
  )
}

export default SectionGrid