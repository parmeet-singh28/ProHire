import JdCard1 from '@/components/JdCard1'
import JdCard2 from '@/components/JdCard2'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import URL from 'url-parse';

function jobJd() {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const currentUrl = new URL(window.location.href);;

    // Extract the part after '/job/'
    const pathname = currentUrl.pathname;
    const jobId = pathname.split('/job/')[1];
    const res = await fetch('https://89pcwcbm1k.execute-api.ap-south-1.amazonaws.com/default/get_job_by_id',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": jobId
      })
    })
    const tp = await res.json();
    return tp
  }
  useEffect(()=>{
    setData(fetchData());
    fetchData().then((res)=>{
      setData(res);
    })
  },[])
  if(data){
    return (
      <div style={{ backgroundColor: '#f8f9fa', display: 'flex', flexDirection:'column' }}>
        <JdCard1 data={data}/>
        <JdCard2 data={data}/>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', backgroundColor: '#f8f9fa', minHeight: '70vh', justifyContent:'center' }}>
      <h1>Loading...</h1>
    </div>
  )
}

export default jobJd