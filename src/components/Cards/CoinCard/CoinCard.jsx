import React from 'react'
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './coinCard.scss'

const CoinCard = ({
  icon,
  name,
  coinId,
  symbol,
  price,
  percentage,
  sparkline
}) => {

  return (
    <Link to={`/coins/${coinId}`}>
      <div className='card-container'>
        <div className='card-header'>
          <div className='icon'>
            <img src={icon} alt={name} />
          </div>
          <div className='name-price'>
            <span className='s' >{name} ({symbol.toUpperCase()})</span>
            <span className='xm'>
              {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(price)}
            </span>
          </div>
          <div className='percentage'>
            <span className='s' style={{
              color: percentage >= 0 ? 'var(--green)' : 'var(--red)'
            }}>
              {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(percentage/100)}
            </span>
          </div>
        </div>
        <div className='card-sparkline'>
          <Sparklines data={sparkline} width={290} height={150} margin={1}>
            <SparklinesLine style={{ fill: "none" }} color={percentage >= 0 ? 'var(--green)' : 'var(--red)'} />
          </Sparklines>
        </div>
      </div>
    </Link>
  )
}

export default CoinCard