import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

export const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>Trải nghiệm tốt khi download app</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}
export default AppDownload