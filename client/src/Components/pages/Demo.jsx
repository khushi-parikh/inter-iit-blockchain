import React from 'react'
import qala from './qala.mp3'
const Demo = () => {
  return (
    <div className='page'>
        <audio src={qala} controls></audio>
        <h1>nkash</h1>
    </div>
  )
}

export default Demo