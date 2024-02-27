import React, { useEffect } from 'react'
import Image from "next/image"
import AOS from 'aos';
function FeaturedCard(props) {
  useEffect(() => {
    AOS.init({
      duration:1000,
    }); 
  }, []);
  return (
    <div data-aos-container className='featured-card' data-aos="fade-up">
      <Image alt="loading" src={props.imgLogo}/>
      <div data-aos="fade-right" className='featured-card-title-box mt-3' style={{backgroundColor:`${props.baCol}`}}>
        <p className='featured-card-title text-center'>{props.title}</p>
      </div>
        <p data-aos="fade-left" className='google-fonts-poppins text-center featured-card-desc'>{props.description}</p>
    </div>
  )
}

export default FeaturedCard
