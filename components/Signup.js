import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
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
      "userType": "candidate"
    })
  })
  const result = await res.json();
}

function SignupPage(props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useFirebase();

  const handelSubmit = async (e) => {
    e.preventDefault();
    firebase.signUpWithEmailAndPass(email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        addUserType(user.email);
        // ...
        if (props.shownewpage != "false") router.replace('/alljobs')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        // ..
      });
    props.onHide();
  }
  const signupGoogle = async (e) => {
    e.preventDefault();
    firebase.signinWithGoogle()
      .then(res => {
        const user = res.user;
        addUserType(user.email);
        if (props.shownewpage != "false") router.replace('/alljobs')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(errorMessage)
      });
    props.onHide();
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handelSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={e => setEmail(e.target.value)} type="email" value={email} placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        <Button variant="danger" className='my-3' type="button" onClick={signupGoogle}>
          Sign Up with Google
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignupPage
