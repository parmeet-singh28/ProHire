import JobCard from '@/components/JobCard';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function jobType(props) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const currentUrl = new URL(window.location.href);
        const pathname = currentUrl.pathname;
        var type = pathname.split('/jobtype/')[1]; // Extract the title part
        type = type.replace(/%20/g, ' ');
        const searchParams = new URLSearchParams(currentUrl.search);
        const toSearch = searchParams.get('additionalProp'); // Extract industryType from query string
        const response = await fetch('https://bmwifnz9ti.execute-api.ap-south-1.amazonaws.com/default/search_jobs_query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "toSearch": String(toSearch),
            "toQuery": String(type)
          })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchAllJobs();
  }, []);

  if (loading) { // Show loading message if data is still being fetched
    return (
      <div style={{ display: 'flex', backgroundColor: '#f8f9fa', minHeight: '70vh', justifyContent: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div style={{ display: 'flex', backgroundColor: '#f8f9fa', minHeight: '70vh', justifyContent: 'center' }}>
        <h1>No Jobs For Your Input</h1>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', minHeight: '70vh' }}>
      <div className='my-5'>
        {jobs?.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default jobType;
