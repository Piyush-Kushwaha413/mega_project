import React from 'react'
import imgUrl from '../assets/logo.png'

function Logo({width="100px"}) {
  return  <div className={`logo max-w-[150px] ${width}`} >
    <img src={imgUrl} alt="" />
  </div>
}

export default Logo