import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react'
import { useFirebase } from '@/context/backend';
import { useRouter } from 'next/router';

const addUserType = async (em) => {
    const res = await fetch('https://bqbuyweqp1.execute-api.ap-south-1.amazonaws.com/default/add_user_type_jobportal', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": String(em),
            "userType": "company"
        })
    })
    const result = await res.json();
}
function SignupForHire() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const firebase = useFirebase();
    const router = useRouter();
    if (firebase.user) {
        router.replace('/postedjobs')
    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        firebase.signUpWithEmailAndPass(email, password)
        .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                addUserType(user.email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // ..
            });
    }
    const signupGoogle = async (e) => {
        e.preventDefault();
        firebase.signinWithGoogle()
        .then(res => {
            const user = res.user;
            addUserType(user.email);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(errorMessage)
          });
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: "#f8f9fa", minHeight:"70vh" }}>
            <Form onSubmit={handelSubmit} className='hire-signup my-5'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='google-fonts-nunito'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='google-fonts-nunito'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button style={{ display: 'block' }} variant="primary" type="submit">
                    Sign Up
                </Button>
                <Button variant="danger" className='my-3' type="button" onClick={signupGoogle}>
                    Sign Up with Google
                </Button>
            </Form>
        </div>
    );
}

export default SignupForHire;