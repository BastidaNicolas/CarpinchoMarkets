import React from 'react'
import { Link } from 'react-router-dom'
import CoinCard from '../../Cards/CoinCard/CoinCard'
import GridBlock from '../../LoadingTing/GridBlock'
import './coinGrid.scss'

const CoinGrid = ({
    title,
    subtitle,
    coinData,
    btn,
    btnRoute,
    loaderQty,
}) => {

    const dataTypeCard = () => {
        if (title === 'Top Coins') {
            return(
                coinData.map((coin) => (
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
        }
        return (
            coinData.map((coin) => (
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

    return (
        <div className='coin-grid-container section-container'>
            <div className='grid-header'>
                <span className='xl' >{title} <span className='s'>{subtitle}</span></span>
            </div>
            <div className='grid-content'>
                {coinData ?
                    <>
                        {dataTypeCard()}
                        <div className={`button-theme more-btn`}>
                            <Link to={btnRoute}>
                                View More
                            </Link>
                        </div>
                    </>
                    :
                    <GridBlock qty={loaderQty} />
                }
            </div>
        </div>
    )
}

export default CoinGrid