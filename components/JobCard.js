import React, { useEffect, useState } from 'react'
import Image from "next/image"
import briefCase_logo from '../assets/images/briefcase.svg'
import salary_logo from '../assets/images/salaryIcon.svg'
import loc_logo from '../assets/images/locIcon.svg'
import note_logo from '../assets/images/document-svgrepo-com.svg'
import Button from 'react-bootstrap/Button';
import AOS from 'aos';
import { useRouter } from 'next/router'

function JobCard(props) {
  const router = useRouter();
  const [applications, setApplications] = useState("");
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const handleJobCardClick = () => {
    // Pass props and navigate to new route
    router.push(`/job/${props.job.id}`);
  };
  const handelViewClick = async (event) => {
    event.stopPropagation();
    await fetch('https://8a6ogjull8.execute-api.ap-south-1.amazonaws.com/default/view_job_applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "appliedToThisId":String(props.job.id)
      })
    }).then( async (res)=>{
      const result = await res.json();
      setApplications(result);
      router.push(`/view/${props.job.id}`)
    })
  }
  return (
    <div className='job-card my-3' onClick={handleJobCardClick}>
      <div className='job-card-title'>{props.job?.role}</div>
      <div className='job-card-com-name'>{props.job?.companyName}</div>
      <div className='job-card-a'>
        <Image alt="loading" src={briefCase_logo} />
        <span className='job-card-a-ex'>{props.job?.requiredExperience}</span>
        <Image alt="loading" src={salary_logo} style={{ marginLeft: '40px', marginTop: '1px' }} />
        <span className='job-card-a-ex'>{props.job?.salary}</span>
        <Image alt="loading" src={loc_logo} style={{ marginLeft: '40px', marginTop: '0px' }} />
        <span className='job-card-a-ex'>{props.job?.workMode}</span>
      </div>
      <div className='job-card-b'>
        <Image alt="loading" src={note_logo} style={{ marginLeft: '-4px', marginTop: "10px" }} />
        <div className='job-card-b-desc'>{props.job?.requiredCandidateProfile}</div>
      </div>
      <div className='job-card-c'>
        <div className='job-card-b-desc'>{props.job?.date}</div>
      </div>
      {props.deleteButton == "true" ? (
        <>
          <Button className='mt-3' variant="info" style={{ fontFamily: 'Nunito' }} onClick={handelViewClick}>View Applicants</Button>
        </>
      ) : (null)}
    </div>
  )
}

export default JobCard
