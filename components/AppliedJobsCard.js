import React, { useEffect } from 'react'
import Image from "next/image"
import briefCase_logo from '../assets/images/briefcase.svg'
import salary_logo from '../assets/images/salaryIcon.svg'
import loc_logo from '../assets/images/locIcon.svg'
import note_logo from '../assets/images/document-svgrepo-com.svg'
import Button from 'react-bootstrap/Button';
import AOS from 'aos';
import { useRouter } from 'next/router'

function AppliedJobsCard(props) {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const handleJobCardClick = () => {
    // Pass props and navigate to new route
    router.push(`/job/${props.additionalData?.id}`);
  };
  const handelViewClick = async (event) => {
    event.stopPropagation();
    await fetch('https://8a6ogjull8.execute-api.ap-south-1.amazonaws.com/default/view_job_applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "appliedToThisId":String(props.additionalData?.id)
      })
    }).then( async (res)=>{
      const result = await res.json();
      console.log(result)
    })
  }
  return (
    <div className='job-card my-3' onClick={handleJobCardClick}>
      <div className='job-card-title'>{props.additionalData?.role}</div>
      <div className='job-card-com-name'>{props.additionalData?.companyName}</div>
      <div className='job-card-a'>
        <Image alt="loading" src={briefCase_logo} />
        <span className='job-card-a-ex'>{props.additionalData?.requiredExperience}</span>
        <Image alt="loading" src={salary_logo} style={{ marginLeft: '40px', marginTop: '1px' }} />
        <span className='job-card-a-ex'>{props.additionalData?.salary}</span>
        <Image alt="loading" src={loc_logo} style={{ marginLeft: '40px', marginTop: '0px' }} />
        <span className='job-card-a-ex'>{props.additionalData?.workMode}</span>
      </div>
      <div className='job-card-b mt-2'>
        <span className='job-card-b-desc' style={{color:'blue', marginLeft:'0px'}}>Status:- </span>
        <span className='job-card-b-desc' style={{color:'blue', marginLeft:'10px'}}>{props.originalData.status}</span>
      </div>
      <div className='job-card-c'>
        <div className='job-card-b-desc' style={{marginLeft:'0px'}}>{props.additionalData?.date}</div>
      </div>
      {props.deleteButton == "true" ? (
        <>
          <Button className='mt-3' variant="info" style={{ fontFamily: 'Nunito' }} onClick={handelViewClick}>View Applications</Button>
          <Button className='mt-3' variant="danger" style={{ fontFamily: 'Nunito' }}>Delete Job</Button>
        </>
      ) : (null)}
    </div>
  )
}

export default AppliedJobsCard
