import React, { useEffect, useState } from 'react'
import Image from "next/image"
import briefCase_logo from '../assets/images/briefcase.svg'
import salary_logo from '../assets/images/salaryIcon.svg'
import loc_logo from '../assets/images/locIcon.svg'
import pin_logo from '../assets/images/pin.svg'
import Button from 'react-bootstrap/Button';
import { useFirebase } from '@/context/backend'
import SignupPage from './Signup'
import { useRouter } from 'next/router'
import URL from 'url-parse';
function JdCard1(props) {
  const firebase = useFirebase();
  const [signin, setSignUp] = useState(false);
  const [userType, setUserType] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const findUserType = async (em) => {
    if (em) {
      try {
        if (email != "") {
          const data = await fetch('https://zhmh32ekn8.execute-api.ap-south-1.amazonaws.com/default/tell_me_user_type_jobportal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "email": String(em)
            })
          })
          const res = await data.json();
          return res;

        }
      }
      catch (error) {
        console.log(error)
      }

    }
  }

  const email = firebase?.user?.email;
  const router = useRouter();
  const handelClick = () => {
    if (firebase.user == null) {
      setSignUp(true);
    }
    else {
      const currentUrl = new URL(window.location.href);
      const pathname = currentUrl.pathname;
      const jobId = pathname.split('/job/')[1];
      router.push(`/apply/${jobId}`)
    }
  }

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const pathname = currentUrl.pathname;
    const id = pathname.split('/job/')[1];
    if(email!=="" && email!==undefined && email!==null){
      fetch('https://ztoa33rkxa.execute-api.ap-south-1.amazonaws.com/default/tell_user_applied_or_not', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "appliedToThisId": id
        })
      })
      .then(async(res)=>{
        const pp = await res.json();
        if(pp.length!==0){
          setAlreadyApplied(true);
        }
      })

    }
  }, [])
  useEffect(() => {
    findUserType(email).then((userType) => {
      setUserType(userType)
    })
  }, [])
  return (
    <div className='job-card-jd1'>
      <div className='job-card-title-jd1'>{props?.data?.role}</div>
      <div className='job-card-com-name-jd1'>{props?.data?.companyName}</div>
      <div className='job-card-a-jd1'>
        <Image alt="loading" src={briefCase_logo} />
        <span className='job-card-a-ex-jd1'>{props?.data?.requiredExperience}</span>
        <Image alt="loading" src={salary_logo} style={{ marginLeft: '40px', marginTop: '1px' }} />
        <span className='job-card-a-ex-jd1'>{props?.data?.salary}</span>
      </div>
      <div className='job-card-b-jd1'>
        <Image alt="loading" src={loc_logo} style={{ marginLeft: '0px', marginTop: '0px' }} />
        <div className='job-card-a-ex-jd1' style={{ marginTop: '-20px', marginLeft: '24px' }}>{props?.data?.workMode}</div>
        <Image alt="loading" src={pin_logo} style={{ marginLeft: '-2px', marginTop: '0px' }} />
        <div className='job-card-a-ex-jd1' style={{ marginTop: '-23px', marginLeft: '24px' }}>{props?.data?.location}</div>
      </div>
      <div className='job-card-c-jd1'>
        <div className='job-card-b-desc-jd1'>Posted on:- {props?.data?.date}</div>
      </div>
      {alreadyApplied===true?(
        <Button variant="" style={{ backgroundColor: '#f05537', marginLeft: '10px', borderRadius: '50px', color: 'white', width: '192px' }} className='register-button'>Already Applied</Button>
      ):(
        userType === "" ? (null) : (
          userType === "company" ? (
            null
          ) : (
            <Button variant="" style={{ backgroundColor: '#f05537', marginLeft: '10px', borderRadius: '50px', color: 'white', width: '192px' }} className='register-button' onClick={handelClick}>{firebase.user == null ? ("Login/Register to apply") : ("Apply Now")}</Button>
          )
        )

      )}
      <SignupPage
        shownewpage="false"
        show={signin}
        onHide={() => setSignUp(false)}
      />
    </div>
  )
}


export default JdCard1