import React, { useEffect } from 'react'
import Image from "next/image"
import AOS from 'aos';
import { useRouter } from 'next/router';
function SmallCard(props) {
  const router = useRouter();
  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1000,

    }); // You can adjust the duration as needed
  }, []);
  const handleCardClick = () => {
    router.push({
      pathname: `/jobtype/${(props.title)}`,
      query: { additionalProp: "industryType" } // Add your additional props here
    });
  };

  return (
    <div data-aos-container className='small-card-style' data-aos="flip-left" style={{cursor:"pointer"}} onClick={handleCardClick}>
      <Image alt="loading" src={props.imgLogo} />
      <p className='google-fonts-nunito m-2 small-card-text'>{props.title}</p>
    </div>
  )
}

export default SmallCard
