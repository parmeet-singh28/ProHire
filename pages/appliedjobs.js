import AppliedJobsCard from '@/components/AppliedJobsCard';
import { useFirebase } from '@/context/backend';
import React, { useEffect, useState } from 'react';

function AppliedJobs() {
    const firebase = useFirebase();
    const [email, setEmail] = useState("");
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [additionalData, setAdditionalData] = useState([]);
    const [originalData, setOiginalData] = useState([]);

    useEffect(() => {
        if (firebase.user) {
            setEmail(firebase.user.email);
        }
    }, [firebase.user]);
    useEffect(() => {
        if (email) {
            fetch('https://057fdjuh12.execute-api.ap-south-1.amazonaws.com/default/get_all_applied_jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email": email })
            })
                .then(res => res.json())
                .then(data => {
                    setAdditionalData(data.additionalData)
                    setOiginalData(data.originalData)
                })
                .catch(error => {
                    console.error('Error fetching applied jobs:', error);
                });
        }
    }, [email])
    if(originalData.length===0){
        return (
            <div style={{ display: 'flex', backgroundColor: '#f8f9fa', minHeight: '70vh', justifyContent:'center' }}>
              <h1>No Applied Jobs</h1>
            </div>
          )
    }
    return (
        <div>
            {email === "" || email === null || email === undefined ? (
                <div style={{ display: 'flex', backgroundColor: '#f8f9fa', minHeight: '70vh', justifyContent: 'center' }}>
                    <h1>Please Login/Signup</h1>
                </div>
            ) : (
                <div style={{ backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', minHeight: '70vh' }}>
                    {additionalData.map((data, idx) => {
                        return <AppliedJobsCard key={idx} additionalData={data} originalData={originalData[idx]} />
                    })}
                </div>
            )}
        </div>
    );
}

export default AppliedJobs;

