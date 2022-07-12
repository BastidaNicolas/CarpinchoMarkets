import React from 'react'
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './globalBoard.scss'
import GridBlock from '../LoadingTing/GridBlock';

const GlobalBoard = ({ globalData, btcData }) => {

    return (
        <div className='global-board-container section-container full-border'>
            <div className='global-board'>
                {globalData && btcData ?
                    <>
                        <div className='global-data'>
                            <span className='xl'>Global Market Data</span>
                            <span className='xm'>Total Coins: <span className='solid'>{globalData.active_cryptocurrencies}</span></span>
                            <span className='xm'>Total Markets: <span className='solid'>{globalData.markets}</span></span>
                            <span className='xm'>Market Cap: <span
                                style={{
                                    color: globalData.market_cap_change_percentage_24h_usd >= 0 ?
                                        'var(--green)' : 'var(--red)'
                                }}>
                                {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(globalData.total_market_cap.usd)}
                            </span></span>
                            <span className='xm'>24h Volume: <span className='solid'>
                                {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(globalData.total_volume.usd)}
                            </span></span>
                            <div className='big-percent'
                                style={{
                                    color: globalData.market_cap_change_percentage_24h_usd >= 0 ?
                                        'var(--green)' : 'var(--red)'
                                }}>
                                {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(globalData.market_cap_change_percentage_24h_usd/100)}
                                {globalData.market_cap_change_percentage_24h_usd >= 0 ?
                                    <BsCaretUpFill /> : <BsCaretDownFill />}
                            </div>
                        </div>
                        <div className='supremacy-chart'>
                            <div className='chart-header'>
                                <div>
                                    <span className='xm' >{btcData[0].name} {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 10, minimumFractionDigits: 0 }).format(btcData[0].current_price)}</span>
                                    <span className='xm'>
                                        ({Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(globalData.market_cap_percentage.btc/100)} supremacy)
                                    </span>
                                </div>
                                {/* <div style={{textAlign:'right'}} >
                                    <span className='xm'>Supremacy</span>
                                    <span className='xl'>
                                        {Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(globalData.market_cap_percentage.btc/100)}
                                    </span>
                                </div> */}
                            </div>
                            <div className='chart-sparkline'>
                                <Sparklines data={btcData[0].sparkline_in_7d.price} width={627} height={277} margin={1}>
                                    <SparklinesLine color={btcData[0].price_change_percentage_7d_in_currency >= 0 ? 'var(--green)' : 'var(--red)'} />
                                </Sparklines>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='global-data'>
                            <span className='xl'>Global Market Data</span>
                            <span className='xm'>Total Coins: <span>--/--</span></span>
                            <span className='xm'>Total Exchanges: <span>--/--</span></span>
                            <span className='xm'>Market Cap: <span>--/--</span></span>
                            <span className='xm'>24h Volume: <span>--/--</span></span>
                            <div className='big-percent xl'>
                                --/--
                            </div>
                        </div>
                        <div>
                            <GridBlock/>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default GlobalBoard