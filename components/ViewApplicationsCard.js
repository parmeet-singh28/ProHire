import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';

function ViewApplicationsCard(props) {
  const handleViewResumeClick = () => {
    window.open(props.data.resumeUrl, '_blank');
  };
  const handelClick = (status) => {
    fetch('https://bmcl6nzeu7.execute-api.ap-south-1.amazonaws.com/default/update_job_status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id":props.data.id,
        "status":status
      })
    })
    .then(alert("Status Updated, Please Send Interview Mail"));
  }
 
  return (
    <div className='view-applications-card my-4'>
      <div className='google-fonts-nunito mt-3'>Candidate Full Name</div>
      <div className='google-nato'>{props.data.fullName}</div>
      <div className='google-fonts-nunito mt-4'>Phone Number</div>
      <div className='google-nato'>{props.data.phoneNumber}</div>
      <div className='google-fonts-nunito mt-4'>Email Address</div>
      <div className='google-nato'>{props.data.email}</div>
      <div className='google-fonts-nunito mt-4'>Address</div>
      <div className='google-nato'>{props.data.address}</div>
      <div className='google-fonts-nunito mt-4'>Prefered Location</div>
      <div className='google-nato'>{props.data.preferedLocation}</div>
      <div className='google-fonts-nunito mt-4'>Expected Salary</div>
      <div className='google-nato'>{props.data.expectedSalary}</div>
      <div className='google-fonts-nunito mt-4'>Does candidate require visa sponsorship now or in the future</div>
      <div className='google-nato'>{props.data.visaRequired}</div>
      <div className='google-fonts-nunito mt-4'>Skills</div>
      <div className='google-nato mb-4'>{props.data.skills}</div>
      <Button variant="info" className='mt-3' style={{ fontFamily: 'Nunito' }} onClick={() => handleViewResumeClick()}>View Resume</Button>
      <Button variant="success" className='mt-3' style={{ fontFamily: 'Nunito' }} onClick={()=>handelClick("Interview Scheduled")} >Interview this candidate</Button>
      <Button variant="danger" className='mt-3' style={{ fontFamily: 'Nunito' }} onClick={()=>handelClick("Rejected")} >Send Rejection</Button>
      <Button variant="warning" className='mt-3' style={{ fontFamily: 'Nunito' }} onClick={()=>handelClick("Selected")} >Send Selection</Button>
    </div>
  )
}

export default ViewApplicationsCard

