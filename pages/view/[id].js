import ViewApplicationsCard from '@/components/ViewApplicationsCard'
import React, { useEffect, useState } from 'react'

function ViewApplications() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUrl = new URL(window.location.href);
        const pathname = currentUrl.pathname;
        const jobId = pathname.split('/view/')[1];

        const response = await fetch('https://8a6ogjull8.execute-api.ap-south-1.amazonaws.com/default/view_job_applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "appliedToThisId": jobId
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  if (data.length === 0) {
    return (
      <div style={{ display: 'flex', backgroundColor: '#f8f9fa', minHeight: '70vh', justifyContent:'center' }}>
        <h1>No Applicants</h1>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f8f9fa', minHeight: '70vh' }}>
      {data.map((item, index) => (
        <ViewApplicationsCard key={index} data={item} />
      ))}
    </div>
  );
}

export default ViewApplications;
