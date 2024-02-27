import React from 'react'

function JdCard2(props) {
    return (
        <div className='job-card-jd2 mb-5'>
            <div className='google-fonts-nunito'>
                Job description
            </div>
            <div className='google-nato my-3'>
                {props?.data?.jobDescription}
            </div>
            <div className='google-fonts-nunito'>
                Required Candidate profile
            </div>
            <div className='google-nato my-3'>
            {props?.data?.requiredCandidateProfile}
            </div>
            <div className='google-fonts-nunito'>
                Perks and benefits
            </div>
            <div className='google-nato my-3'>
            {props?.data?.perksAndBenefits}
            </div>
            <div style={{ display: 'flex' }} className='my-2' >
                <span className='google-fonts-nunito'>Role:</span>
                <span className='google-nato mx-2'> {props?.data?.role}</span>
            </div>
            <div style={{ display: 'flex' }} className='my-2'>
                <span className='google-fonts-nunito'>Industry Type:</span>
                <span className='google-nato mx-2'> {props?.data?.industryType}</span>
            </div>
            <div style={{ display: 'flex' }} className='my-2'>
                <span className='google-fonts-nunito'>Department:</span>
                <span className='google-nato mx-2'> {props?.data?.department}</span>
            </div>
            <div style={{ display: 'flex' }} className='my-2'>
                <span className='google-fonts-nunito'>Employment Type:</span>
                <span className='google-nato mx-2'> {props?.data?.employmentType
}</span>
            </div>
            <div style={{ display: 'flex' }} className='my-2'>
                <span className='google-fonts-nunito'>Role Category:</span>
                <span className='google-nato mx-2'> {props?.data?.roleCategory}</span>
            </div>
            <div className='google-fonts-nunito my-2'>
                Education
            </div>
            <div className='google-nato'>
            {props?.data?.education}
            </div>

        </div>
    )
}

export default JdCard2
