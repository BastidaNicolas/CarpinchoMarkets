import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './listCard.scss'
import { Link } from 'react-router-dom';

const ListCard = ({
    position,
    icon,
    name,
    coinId,
    symbol,
    price,
    h1,
    h24,
    d7,
    priceChange,
    mrktCap,
    sparkline
}) => {
    return (
        <Link to={`/coins/${coinId}`}>
            <div className='list-card-container'>
                <div className='card-content-container'>
                    <div className='card-content'>
                        <div className='position'>
                            <p className='content' >{position}</p>
                        </div>
                        <div className='name'>
                            <div className='img-container' style={{ backgroundImage: `url(${icon})` }}></div>
                            <div className='info-container'>
                                <div className='name-container'>
                                    <p className='coin-name content' style={{ flexGrow: '1' }} >{name}</p>
                                    <p className='symbol content'>({symbol})</p>
                                </div>
                                <p className='price-container content'>
                                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(price)}
                                </p>
                            </div>
                        </div>
                        <div className='price'>
                            <p className='content' >
                                {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(price)}
                            </p>

                        </div>
                        <div className='percent h1-time'>
                            <p style={{ color: h1 >= 0 ? 'var(--green)' : 'var(--red)' }}>
                                {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(h1/100)}
                            </p>
                        </div>
                        <div className='percent h24-time' >
                            <p style={{ color: h24 >= 0 ? 'var(--green)' : 'var(--red)' }}>
                                {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(h24/100)}
                            </p>
                        </div>
                        <div className='percent d7-time'>
                            <p style={{ color: d7 >= 0 ? 'var(--green)' : 'var(--red)' }}>
                                {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(d7/100)}
                            </p>
                        </div>
                        <div className='vol-24h'>
                            <p className='content'>
                                {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(priceChange)}
                            </p>
                        </div>
                        <div className='mkt-cap' >
                            <p className='content'>
                                {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(mrktCap)}
                            </p>
                        </div>
                        <div className='sparkline'>
                            <Sparklines data={sparkline} width={150} height={50} margin={5}>
                                <SparklinesLine style={{ fill: "none" }} color={d7 >= 0 ? 'var(--green)' : 'var(--red)'} />
                            </Sparklines>
                        </div>
                    </div>
                    <div className='list'>

                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ListCard