import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from "next/image"
import data_science_logo from "../assets/images/data-scienceonetheme.svg"
import finance_logo from "../assets/images/financeonetheme.svg"
import freshers_logo from "../assets/images/freshersonetheme.svg"
import hr_logo from "../assets/images/hronetheme.svg"
import marketing_logo from "../assets/images/marketingonetheme.svg"
import mnc_logo from "../assets/images/mnconetheme.svg"
import remote_logo from "../assets/images/remoteonetheme.svg"
import project_management_logo from "../assets/images/project-managementonetheme.svg"
import software_logo from "../assets/images/softwareonetheme.svg"
import startup_logo from "../assets/images/startuponetheme.svg"
import supply_chain_logo from "../assets/images/supplychainonetheme.svg"
import SmallCard from '@/components/SmallCard';
import FeaturedCard from '@/components/FeaturedCard';
import bigbasket_logo from '../assets/images/bigbasketLogo.gif'
import icici_logo from '../assets/images/iciciLogo.gif'
import jp_logo from '../assets/images/jpMorganLogo.gif'
import reliance_logo from '../assets/images/RelianceLogo.gif'
import nagarro_logo from '../assets/images/NagarroLogo.gif'
import role_logo from '../assets/images/role-collection-ot.png'
import ab_interview_logo from '../assets/images/ab-interview-ot.png'
import flipkart_logo from '../assets/images/flipkart-ot.png'
import cognizant_logo from '../assets/images/cognizant-ot.png'
import byjus_logo from '../assets/images/byjus-ot.png'
import blinkit_logo from '../assets/images/blinkit.jpg'
import snapdeal_logo from '../assets/images/snapdeal-ot.jpg'
import amazon_logo from '../assets/images/amazon-ot.png'
import two_people_logo from '../assets/images/two-people.png'
import background_logo from '../assets/images/background.jpg'
import AOS from 'aos';
import SignupPage from '@/components/Signup';
import { useRouter } from 'next/router';
import Link from 'next/link'
function HomePage() {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [signin, setSignUp] = useState(false);
  const [signin2, setSignUp2] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  useEffect(() => {
    AOS.init({
      duration: 1000,

    });
  }, []);
  const handelSearchClick = (e) => {
    e.preventDefault()
    router.push({
      pathname: `/jobtype/${searchTxt}`,
      query: { additionalProp: "findByRole" }
    });
  }
  return (
    <div data-aos-container>
      <div className='apply-background-col'>
        <div className="qsb-header-container google-fonts-nunito center-flex">
          <h1 className="qsb-title" data-aos="zoom-out" data-aos-duration="1500" style={{ textAlign: 'center' }}>Find your dream job now</h1>
          <div className="qsb-byLine" data-aos="zoom-out" data-aos-duration="1500" style={{ textAlign: 'center' }}>5 lakh+ jobs for you to explore</div>
        </div>
        <Form className='max-width-home'>
          <div style={{ display: 'flex', justifyContent: 'center', }} data-aos="zoom-in" data-aos-duration="1000">
            <Form.Control onSubmit={handelSearchClick} size="lg" type="text" placeholder="Find Jobs near you" className="box-shaddow" style={{ margin: '12px' }} value={searchTxt} onChange={(e) => setSearchTxt(e.target.value)} />
          </div>
          <div className='center-button'>
            <Button onClick={handelSearchClick} variant="primary" type="submit" data-aos="zoom-out" data-aos-duration="2000">
              Search
            </Button>
          </div>
        </Form>
        <div className='small-card-home1'>
          <SmallCard imgLogo={remote_logo} title="Remote" />
          <SmallCard imgLogo={mnc_logo} title="MNC" />
          <SmallCard imgLogo={finance_logo} title="Banking" />
          <SmallCard imgLogo={freshers_logo} title="Fresher" />
          <SmallCard imgLogo={data_science_logo} title="Data Science" />
          <SmallCard imgLogo={project_management_logo} title="Project Management" />
        </div>
        <div className='small-card-home2'>
          <SmallCard imgLogo={software_logo} title="Software & IT" />
          <SmallCard imgLogo={marketing_logo} title="Marketing" />
          <SmallCard imgLogo={hr_logo} title="HR" />
          <SmallCard imgLogo={startup_logo} title="Startup" />
          <SmallCard imgLogo={supply_chain_logo} title="Supply Chain" />
        </div>
      </div>
      <div className='premium-collection-main'>
        <h2 className="premium-collection-title" data-aos="fade-up">Featured companies</h2>
        <div className='featured-comp-card'>
          <Link href={'https://www.bigbasket.com/'} style={{ textDecoration: 'none', color: 'black' }}>
            <FeaturedCard imgLogo={bigbasket_logo} title="Bigbasket" description=" India’s largest online food and grocery store. " baCol="rgba(166, 204, 57, 0.03)" aaos="fade-up" />
          </Link>
          <Link href={'https://www.icicibank.com/'} style={{ textDecoration: 'none', color: 'black' }}>
            <FeaturedCard imgLogo={icici_logo} title="ICICI Bank" description="Leading private sector bank in India." baCol="rgba(176, 42, 48, 0.03)" aaos="fade-down" />
          </Link>
          <Link href={'https://www.jpmorgan.com/'} style={{ textDecoration: 'none', color: 'black' }}>
            <FeaturedCard imgLogo={jp_logo} title="JPMorgan" description="Leader in financial services." baCol="rgba(58, 34, 6, 0.03)" aaos="fade-up" />
          </Link>

          <Link href={'https://relianceretail.com/'} style={{ textDecoration: 'none', color: 'black' }}>
            <FeaturedCard imgLogo={reliance_logo} title="Reliance Retail" description="One of India's Top 100 workplaces in 2022." baCol="rgba(238, 28, 46, 0.03)" aaos="fade-down" />
          </Link>
          <Link href={'https://www.nagarro.com/'} style={{ textDecoration: 'none', color: 'black' }}>
            <FeaturedCard imgLogo={nagarro_logo} title="Nagarro" description="Leader in digital product engineering." baCol="rgba(19, 41, 75, 0.03)" aaos="fade-up" />
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='card-container-parent'>
        <div className='card-container' data-aos="fade-down-right" >
          <div className='left-section' data-aos="fade-up">
            <Image alt="img" src={role_logo} height={175} width={200} />
            <p className="heading">Discover jobs across popular roles</p>
            <p className="sub-heading">Select a role and we'll show you relevant jobs for it!</p>
          </div>
          <div className='right-section' data-aos="fade-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className='chip chip1' data-aos="zoom-out" onClick={() => { router.push({ pathname: `/jobtype/Full Stack Developer`, query: { additionalProp: "findByRole" } }) }}>
                Full Stack Developer
              </div>
              <div className='chip chip2' data-aos="zoom-out" onClick={() => { router.push({ pathname: `/jobtype/App Developer`, query: { additionalProp: "findByRole" } }) }}>
                Mobile / App Developer
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className='chip chip1' data-aos="zoom-out" onClick={() => { router.push({ pathname: `/jobtype/Front End Developer`, query: { additionalProp: "findByRole" } }) }}>
                Front End Developer
              </div>
              <div className='chip chip2' data-aos="zoom-out" onClick={() => { router.push({ pathname: `/jobtype/DevOps Engineer`, query: { additionalProp: "findByRole" } }) }}>
                DevOps Engineer
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className='chip chip1' data-aos="zoom-out" onClick={() => { router.push({ pathname: `/jobtype/Engineering Manager`, query: { additionalProp: "findByRole" } }) }}>
                Engineering Manager
              </div>
              <div className='chip chip2' data-aos="zoom-out" onClick={() => { router.push({ pathname: `/jobtype/Technical Lead`, query: { additionalProp: "findByRole" } }) }}>
                Technical Lead
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='hire-card-container' data-aos="fade-down-right">
        <Image alt="img" data-aos="zoom-out" src={two_people_logo} className='hire-card-img' />
        <div data-aos="fade-right" className='hire-heading'>Want to hire?</div>
        <div data-aos="fade-left" className='hire-sub-heading'>Find the best candidate from 5 crore+ active job seekers!</div>
        <button data-aos="flip-left" className='hire-button' onClick={() => router.push('/SignupForHire')}>Post job {'>'}</button>

      </div>


      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='card-container-parent mb-3'>
        <div className='card-container' data-aos="fade-down-right" >
          <div className='left-section' data-aos="fade-up" >
            <Image alt="img" src={ab_interview_logo} className='mt-3' height={152} width={247} />
            <p className="heading mt-4" >Prepare for your next interview</p>
          </div>
          <div className='right-section' data-aos="fade-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className='google-fonts-nunito'>
              Interview questions by company

            </div>
            <div data-aos="zoom-out" style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href={'https://www.ambitionbox.com/interviews/flipkart-interview-questions?utm_source=naukri&utm_medium=desktop&utm_campaign=nonlogged_homepage'} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='chip chip1' style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Image alt="img" src={flipkart_logo} height={40} width={40} />
                  Flipkart
                </div>
              </Link>
              <Link href={'https://www.ambitionbox.com/interviews/cognizant-interview-questions?utm_source=naukri&utm_medium=desktop&utm_campaign=nonlogged_homepage'} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='chip chip2' style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Image alt="img" src={cognizant_logo} height={40} width={40} />
                  Cognizant
                </div>
              </Link>
            </div>
            <div data-aos="zoom-out" style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href={'https://www.ambitionbox.com/interviews/blinkit-interview-questions?utm_source=naukri&utm_medium=desktop&utm_campaign=nonlogged_homepage'} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='chip chip1' style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Image alt="img" src={blinkit_logo} height={40} width={40} />
                  Blinkit
                </div>
              </Link>
              <Link href={'https://www.ambitionbox.com/interviews/byjus-interview-questions?utm_source=naukri&utm_medium=desktop&utm_campaign=nonlogged_homepage'} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='chip chip2' style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Image alt="img" src={byjus_logo} height={40} width={40} />
                  Byjus
                </div>

              </Link>
            </div>
            <div data-aos="zoom-out" style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href={'https://www.ambitionbox.com/interviews/snapdeal-interview-questions?utm_source=naukri&utm_medium=desktop&utm_campaign=nonlogged_homepage'} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='chip chip1' style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Image alt="img" src={snapdeal_logo} height={40} width={40} />
                  Snapdeal
                </div>
              </Link>
              <Link href={'https://www.ambitionbox.com/interviews/amazon-interview-questions?utm_source=naukri&utm_medium=desktop&utm_campaign=nonlogged_homepage'} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='chip chip2' style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Image alt="img" src={amazon_logo} height={40} width={40} />
                  Amazon
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default HomePage
