import React, { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts';
import './chartStyles.scss'

export const LineChart = ({ data, price, theme }) => {
    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight });
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

            const newSeries = chart.addAreaSeries({
                topColor: price >= 0 ? 'rgba(39, 174, 96, .5)' : 'rgba(235, 87, 87, .5)',
                bottomColor: price >= 0 ? 'rgba(39, 174, 96, .03)' : 'rgba(235, 87, 87, .03)',
                lineColor: price >= 0 ? 'rgb(39, 174, 96)' : 'rgba(235, 87, 87, 1)',
                layout: {
                    background: '#2B2B43',
                    lineColor: '#2B2B43',
                    textColor: '#D9D9D9',
                },
            });

            newSeries.setData(data);

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, price, theme]
    );

    return (
        <div
            className='chart-container'
            ref={chartContainerRef}
        />
    );
};