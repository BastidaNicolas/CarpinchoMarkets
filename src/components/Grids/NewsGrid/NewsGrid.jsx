import React from 'react'
import { Link } from 'react-router-dom'
import NewsCard from '../../Cards/NewsCard/NewsCard'
import GridBlock from '../../LoadingTing/GridBlock'
import './newsGrid.scss'

const NewsGrid = ({
    title,
    subtitle,
    newsData,
    btn,
    btnRoute,
    loaderQty,
}) => {

    const handleBtn = (position) => {
        if (position === 'header') {
            return (
                <div className='more-btn header-btn'>
                    <Link to={btnRoute}>
                        View More
                    </Link>
                </div>
            )
        } else if (position === 'grid') {
            return (
                <div className={`more-btn grid-btn button-theme`}>
                    <Link to={btnRoute}>
                        View More
                    </Link>
                </div>
            )
        }
    }


    return (
        <div className='news-grid-container section-container'>
            <div className='grid-header'>
                <span className='xl'>{title} <span className='s'>{subtitle}</span></span>
                {btn && handleBtn('header')}
            </div>
            <div className='grid-content'>
                {newsData ?
                    newsData.map((article, index) => (
                        <NewsCard
                            key={article.name + index}
                            image={article.image && article.image.contentUrl}
                            title={article.name}
                            desc={article.description}
                            source={article.provider[0].name}
                            sourceImg={article.provider[0].image && article.provider[0].image.thumbnail.contentUrl}
                            time={article.datePublished}
                            url={article.url}
                        />
                    ))
                    :
                    <GridBlock qty={loaderQty}/>
                }
            </div>
            {btn && handleBtn('grid')}
        </div>
    )
}

export default NewsGrid