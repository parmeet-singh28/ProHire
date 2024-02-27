import { useRouter } from 'next/router'
import React from 'react'
import Button from 'react-bootstrap/Button';

function jobposted() {
    const router = useRouter();
  return (
    <>
    <div style={{ backgroundColor: '#f8f9fa', justifyContent:'center', display: 'flex', flexDirection: 'column', minHeight:"70vh" }}>
      <p className='google-fonts-nunito' style={{margin:'0px auto'}} >Job Posted SuccessFully</p>
      <span  style={{margin:'0px auto'}}>
        <Button onClick={()=>router.replace('/postedjobs')} variant="success">Click here to view All jobs posted by you</Button>
        </span>
    </div>
    </>
  )
}

export default jobposted
