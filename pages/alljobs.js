import JobCard from '@/components/JobCard';
import { useEffect, useState } from 'react';

function AllJobs({ jobs }) {
  return (
    <div style={{ backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column' }}>
      <div className='my-5'>
        {jobs?.map(job => (
          <JobCard key={job.id} job={job} /> // Pass job data to JobCard component
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await fetch('https://vtu440tccc.execute-api.ap-south-1.amazonaws.com/default/get_all_posted_jobs');
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const jobs = await response.json();
    return {
      props: {
        jobs,
      },
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {
      props: {
        jobs: [],
      },
    };
  }
}

export default AllJobs;