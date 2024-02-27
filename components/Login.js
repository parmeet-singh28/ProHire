import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '@/context/backend';
import { useRouter } from 'next/router';


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const firebase = useFirebase();

  const findUserType = async (em) => {
    if(em){
      try{
        if(em!=""){
          const data = await fetch('https://zhmh32ekn8.execute-api.ap-south-1.amazonaws.com/default/tell_me_user_type_jobportal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "email": String(em)
            })
          })
          const res = await data.json();
          return res;
  
        }
      }
      catch (error) {
        console.log(error)
      }

    }
  }
  const handelSubmit = async (e) => {
    e.preventDefault();
    firebase.signInWithEmailAndPass(email, password)
      .then(e => {
        const user = e.user;
        findUserType(user.email).then((userType)=>{
          if(userType==="candidate"){
            router.replace('/alljobs')
          }
          else{
            router.replace('/postedjobs')
          }
        }

        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const loginGoogle = async (e) => {
    e.preventDefault();
    try {
      const res = await firebase.signinWithGoogle();
      const user = res.user;
      const userType = await findUserType(user.email);
      if (userType === "candidate") {
        router.replace('/alljobs');
      } else if (userType === 'company') {
        router.replace('/postedjobs');
      } else {
        // Handle other user types or scenarios
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle error appropriately, such as displaying a message to the user
    }
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
          Login
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
          <Button variant="primary" type="submit" onClick={handelSubmit}>
            Login
          </Button>
        </Form>
        <Button variant="danger" className='my-3' type="submit" onClick={loginGoogle}>
          Login with Google
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginPage
