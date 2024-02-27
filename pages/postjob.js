import { useFirebase } from '@/context/backend';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
function postjob() {
    const [Company, setCompany] = useState("");
    const [Role, setRole] = useState("");
    const [Required_experience, setRequired_experience] = useState("");
    const [salary, setSalary] = useState("");
    const [Work_Mode, setWork_Mode] = useState("");
    const [location, setLocation] = useState("");
    const [Date, setDate] = useState("");
    const [Department, setDepartment] = useState("");
    const [Employment_Type, setEmployment_Type] = useState("");
    const [Role_Category, setRole_Category] = useState("");
    const [Industry_Type, setIndustry_Type] = useState("");
    const [Job_Description, setJob_Description] = useState("");
    const [Required_Candidate_profile, setRequired_Candidate_profile] = useState("");
    const [Perks_and_benefits, setPerks_and_benefits] = useState("");
    const [education, setEducation] = useState("");
    const firebase = useFirebase();
    const router = useRouter();

    const handelPostJob = async (e) => {
        e.preventDefault();
        const id = uuidv4();
        await fetch('https://ef2p0jqhqj.execute-api.ap-south-1.amazonaws.com/default/post_job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "email": firebase.user.email,
                "companyName": Company,
                "role": Role,
                "requiredExperience": Required_experience,
                "salary": salary,
                "workMode": Work_Mode,
                "location": location,
                "date": Date,
                "department": Department,
                "employmentType": Employment_Type,
                "roleCategory": Role_Category,
                "industryType": Industry_Type,
                "jobDescription": Job_Description,
                "requiredCandidateProfile": Required_Candidate_profile,
                "perksAndBenefits": Perks_and_benefits,
                "education": education,
            })
        }).then(router.replace('/jobposted'));
    }
    if (firebase.user === null) {
        return (
            <div style={{ display: 'flex', backgroundColor: '#f8f9fa', minHeight: '70vh', justifyContent:'center' }}>
              <h1>Please Login</h1>
            </div>
          )
    }
    return (
        <div style={{ display: 'flex', backgroundColor: '#f8f9fa', justifyContent: 'center' }}>
            <Form className='my-4' style={{ width: '70%' }}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Company Name" value={Company} onChange={(e) => setCompany(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Role</Form.Label>
                    <Form.Control type="text" placeholder="Enter Role" value={Role} onChange={(e) => setRole(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito' >Required experience</Form.Label>
                    <Form.Control type="text" placeholder="Enter Required experience" value={Required_experience} onChange={(e) => setRequired_experience(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Salary</Form.Label>
                    <Form.Control type="text" placeholder="Enter Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito' >Work Mode</Form.Label>
                    <Form.Control type="text" placeholder="Enter Work Mode" value={Work_Mode} onChange={(e) => setWork_Mode(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito' >Date</Form.Label>
                    <Form.Control type="text" placeholder="Enter Date" value={Date} onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Department</Form.Label>
                    <Form.Control type="text" placeholder="Enter Department" value={Department} onChange={(e) => setDepartment(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Employment Type</Form.Label>
                    <Form.Control type="text" placeholder="Enter Employment Type" value={Employment_Type} onChange={(e) => setEmployment_Type(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Role Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter Role Category" value={Role_Category} onChange={(e) => setRole_Category(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Industry Type</Form.Label>
                    <Form.Control type="text" placeholder="Enter Industry Type" value={Industry_Type} onChange={(e) => setIndustry_Type(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className='google-fonts-nunito'>Job Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={Job_Description} onChange={(e) => setJob_Description(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className='google-fonts-nunito'>Required Candidate profile</Form.Label>
                    <Form.Control as="textarea" rows={3} value={Required_Candidate_profile} onChange={(e) => setRequired_Candidate_profile(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className='google-fonts-nunito'>Perks and benefits</Form.Label>
                    <Form.Control as="textarea" rows={3} value={Perks_and_benefits} onChange={(e) => setPerks_and_benefits(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className='google-fonts-nunito'>Education</Form.Label>
                    <Form.Control as="textarea" rows={3} value={education} onChange={(e) => setEducation(e.target.value)} />
                </Form.Group>
                <Button variant="success" type="submit" onClick={handelPostJob}>
                    Post This Job
                </Button>
            </Form>
        </div>
    )
}

export default postjob
