import { useFirebase } from '@/context/backend';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '@/components/SpinnerComponent';
function ApplyJob() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [preferedLocation, setPreferedLocation] = useState("");
    const [expectedSalary, setExpectedSalary] = useState("");
    const [skills, setSkills] = useState("");
    const [visaRequired, setVisaRequired] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const firebase = useFirebase();

    useEffect(() => {
        if (firebase.user !== null) {
            setEmail(firebase.user.email);
        }
    }, [firebase.user]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; // Get the selected file
        const allowedTypes = ['application/pdf']; // Allowed file types

        // Check if a file is selected
        if (selectedFile) {
            // Check if the selected file type is allowed
            if (allowedTypes.includes(selectedFile.type)) {
                // Check if the file size is less than or equal to 5MB
                if (selectedFile.size <= 5 * 1024 * 1024) { // Convert 5MB to bytes
                    // Generate the filename
                    const fileId = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.')); // Get the filename without extension
                    const extension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')); // Get the file extension
                    const uuidPart = uuidv4().substring(0, 10); // Get the first 10 characters of a UUID
                    const name = `${fileId}_${uuidPart}${extension}`; // Append the UUID to the filename
                    setFile(selectedFile); // Update the state with the selected file
                    setFileName(name); // Update the state with the generated filename
                } else {
                    alert('File size should be less than or equal to 5MB.'); // Show an alert for file size exceeded
                }
            } else {
                alert('File should be in PDF format.'); // Show an alert for invalid file type
            }
        }
    };

    const handelPutApplication = async () => {
        const currentUrl = new URL(window.location.href);
        // Extract the part after '/apply/'
        const pathname = currentUrl.pathname;
        const jobId = pathname.split('/apply/')[1];
        
        await fetch('https://ztoa33rkxa.execute-api.ap-south-1.amazonaws.com/default/tell_user_applied_or_not', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "appliedToThisId": jobId
            })
        }).then(async (res) => {
            const pp = await res.json();
            if (pp.length === 0) {
                // No application found, proceed with the application

                if (!fullName || !phoneNumber || !address || !preferedLocation || !expectedSalary || !skills || !visaRequired || !file) {
                    alert('Please fill in all required fields.');
                    return;
                }
                setLoading(true)
                // Upload resume to S3
                const uploadResume = async () => {
                    const res = await fetch('https://qsz9htc0uj.execute-api.ap-south-1.amazonaws.com/default/get_signedurlfor_resume_jobportal', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "fileName": fileName
                        })
                    });
                    return res.json();
                };

                uploadResume().then(async (res) => {
                    const uploadResponse = await fetch(res, {
                        method: 'PUT',
                        body: file
                    });

                    if (uploadResponse.ok) {
                        const fileUrl = `https://portal-resume.s3.ap-south-1.amazonaws.com/${fileName}`;

                        const id = uuidv4();

                        const postApplication = async () => {
                            await fetch('https://ccpemcrrvc.execute-api.ap-south-1.amazonaws.com/default/post_job_application', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    "id": id,
                                    "appliedToThisId": jobId,
                                    "resumeUrl": fileUrl,
                                    "fullName": fullName,
                                    "phoneNumber": phoneNumber,
                                    "address": address,
                                    "preferedLocation": preferedLocation,
                                    "expectedSalary": expectedSalary,
                                    "skills": skills,
                                    "visaRequired": visaRequired,
                                    "email": email,
                                    "status":"Under Review"
                                })
                            })
                        };

                        postApplication()
                        .then(()=>{router.replace('/appliedjobs')});

                    } else {
                        console.error('Failed to upload file.');
                    }
                });
            } else {
                alert("You Already Applied");
                return;
            }
        });
    };
    if(email===""){
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
                    <Form.Label className='google-fonts-nunito'>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Prefered Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter Prefered Location" value={preferedLocation} onChange={(e) => setPreferedLocation(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label className='google-fonts-nunito'>Expected Salary</Form.Label>
                    <Form.Control type="text" placeholder="Enter Expected Salary" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} required />
                </Form.Group>
                <Form.Label className='google-fonts-nunito'>Would you require visa sponsorship now or in the future</Form.Label>
                <Form.Select aria-label="Default select example" className='mb-3' value={visaRequired} onChange={(e) => setVisaRequired(e.target.value)} required>
                    <option className='google-fonts-nunito'>Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Form.Select>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className='google-fonts-nunito'>Skills</Form.Label>
                    <Form.Control as="textarea" rows={3} value={skills} onChange={(e) => setSkills(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className='google-fonts-nunito'>Upload your resume</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} accept=".pdf" required />
                </Form.Group>
                <Button variant="success" type="button" onClick={handelPutApplication}>
                    Apply
                </Button>
                <div className='my-4'>
                    {loading==true?(
                        <Spinner/>
                    ):(null)}
                </div>
            </Form>
        </div>
    );
}

export default ApplyJob;
