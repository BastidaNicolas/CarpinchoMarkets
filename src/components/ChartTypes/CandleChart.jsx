import React, { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts';
import './chartStyles.scss'

export const CandleChart = ({data, theme}) => {
	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth, height:chartContainerRef.current.clientHeight});
			};

			const darkTheme = {
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
                rightPriceScale: {
                    visible: true,
                    borderColor:'rgba(255, 255, 255, 0.7)'
                },
                leftPriceScale: {
                    visible: false,
                },
                timeScale: {
                    timeVisible: true,
                    borderColor:'rgba(255, 255, 255, 0.7)'
                },
                grid:{
					vertLines: {
						color:'rgba(255, 255, 255, 0.15)'
					},
					horzLines:{
						color:'rgba(255, 255, 255, 0.15)'
					}
				},
                layout: {
                    fontSize: chartContainerRef.current.clientHeight <= 250 ? 9 : 11,
                    textColor: 'white',
                    background: { type: 'solid', color: '#292929' },
                    priceLineOptions: {color:'white'}
                }
            }
            const lightTheme = {
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
                rightPriceScale: {
                    visible: true,
                },
                leftPriceScale: {
                    visible: false,
                },
                timeScale: {
                    timeVisible: true,
                },
                layout: {
                    fontSize: chartContainerRef.current.clientHeight <= 250 ? 9 : 11,
                }
            }


			const chart = createChart(chartContainerRef.current, theme ? lightTheme:darkTheme);
			chart.timeScale().fitContent();

			const candelSeries = chart.addCandlestickSeries()

			candelSeries.setData(data);

			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, theme]
	);

	return (
		<div
			className='chart-container'
			ref={chartContainerRef}
		/>
	);
};