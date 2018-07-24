import React from 'react';
import banner from '../assets/img/banner.jpg';
// banner组件
class Banner extends React.Component{
    render(){
        return <div className='banner-box'>
            <img src={banner} alt=''/>
        </div>
    }
}
export default Banner;