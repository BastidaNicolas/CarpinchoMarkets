import React from 'react'
import './loadingStyles.scss'

const GridBlock = ({ qty }) => {

  const loadBlocks = () => {
    const blocks = [] 

    for(let i = 0; i < qty; i++){
      blocks.push(
        <div className='grid-block' key={i}>
        </div>
      )
    }

    return (
      blocks.map(block => (
        block
      ))
    )
  }

  return (
    loadBlocks()
  )
}

export default GridBlock