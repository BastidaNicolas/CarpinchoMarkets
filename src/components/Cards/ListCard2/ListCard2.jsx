import React, { useState } from 'react'
import './listCard2.scss'

const ListCard2 = ({
    position,
    image,
    listId,
    name,
    score,
    tradeVol,
    est,
    desc,
    link,
}) => {

    const [openCard, setOpenCard] = useState(false)

    return (
        <div className='list-card-2-container'>
            <div className='card-header' onClick={() => setOpenCard(!openCard)}>
                <div className='position'>
                    <p className='content' >{position}</p>
                </div>
                <div className='exchange-name'>
                    <div className='image-container' style={{ backgroundImage: `url(${image})` }} ></div>
                    <p  className='content'>{name}</p>
                </div>
                <div className='trust-score'>
                    <div className='score-bar-container'>
                        <div className='score-bar' style={{ width: `${score * 10}%` }} ></div>
                    </div>
                    <p>{score}</p>
                </div>
                <div className='trade-vol'>
                    <p  className='content'>
                        {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(tradeVol)}
                    </p>
                </div>
                <div className='estab'>
                    <p className='content'>{est ? est : '--'}</p>
                </div>
            </div>
            <div className={`desc-contianer ${openCard && 'show-desc'}`}>
                <div className='desc-info'>
                    <div className='trade-vol'>
                        <p  className='content' >24h Vol.</p>
                        <p  className='content'>
                            {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(tradeVol)}
                        </p>
                    </div>
                    <div className='estab'>
                        <p  className='content'>Est.</p>
                        <p  className='content'>{est ? est : '--'}</p>
                    </div>
                </div>
                <div className='description'>
                    <div className='website-link'>
                        <p  className='content'>Website</p>
                        <a className='link' href={link} target='_blank' rel="noreferrer" >{name}</a>
                    </div>
                    <p className='content'>{desc ? desc : '--'}</p>
                </div>
            </div>
        </div>
    )
}

export default ListCard2