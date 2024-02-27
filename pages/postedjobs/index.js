import JobCard from '@/components/JobCard';
import { useFirebase } from '@/context/backend';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function PostedJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const firebase = useFirebase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        if (!firebase.user) return; // Check if user exists

        const response = await fetch('https://0l0084eofk.execute-api.ap-south-1.amazonaws.com/default/get_posted_jobs_by_email_id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": String(firebase.user.email)
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        setJobs(data);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchAllJobs();
  }, [firebase.user]); // Only run effect when firebase.user changes

  if (!firebase.user) {
    return (
      <div style={{ display: 'flex', backgroundColor: '#f8f9fa', minHeight: '70vh', justifyContent:'center' }}>
        <h1>Please Login</h1>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', backgroundColor: '#f8f9fa', minHeight: '70vh', justifyContent:'center' }}>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', minHeight:'70vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }} className='my-4'>
        <Button variant='success' style={{ fontFamily: 'Nunito' }} onClick={() => { router.push('/postjob') }}>Post New Job</Button>
      </div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} deleteButton="true" /> // Pass job data to JobCard component
      ))}
    </div>
  );
}

export default PostedJobs;
