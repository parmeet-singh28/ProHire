import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/mainLogo.jpg'
import Image from 'next/image'
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import LoginPage from './Login';
import SignupPage from './Signup';
import { useFirebase } from '@/context/backend';
import { useRouter } from 'next/router';
function BasicExample() {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [signin, setSignUp] = useState(false);
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
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
  useEffect(() => {
    if (firebase.user != null) {
      if (firebase.user.displayName != null) {
        setName(firebase.user.displayName);
      }
      else {
        setName(firebase.user.email)
      }
      findUserType(firebase.user.email).then((res)=>(setUser(res)));
    }
    else{
      setUser("");
    }
  }, [firebase.user])
  const handelLogout = async (e) => {
    e.preventDefault();
    try {
      setSignUp(false)
      await firebase.signOutUser();
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ boxShadow: '0 6px 12px rgba(30,10,58,.04)' }}>
      <Container>
        <Image alt="img" src={logo} height={30} className='me-3' />
        <Navbar.Brand href="#home" className='google-fonts-nunito'>ProHire</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto google-fonts-nunito" style={{ fontSize: '20px' }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/alljobs">Jobs</Nav.Link>
            <Nav.Link href="/aboutus">About Us</Nav.Link>
            {(user==="candidate")?(<Nav.Link href="/appliedjobs">Applied Jobs</Nav.Link>):(null)}
            {(user==="company")?(<Nav.Link href="/postedjobs">Posted Jobs</Nav.Link>):(null)}
            
          </Nav>
          {(firebase.user == null) ? (
            <>
              <Button variant="info" style={{ borderRadius: '8px', fontFamily: 'Noto Sans' }} className='hire-cand-button' onClick={() => router.replace('/SignupForHire')}>Hire Candidates</Button>{' '}

              <Button variant="outline-primary" style={{ marginLeft: '10px', borderRadius: '50px', width: '82px', fontFamily: 'Nunito' }} className='google-fonts-nunito' onClick={() => setLogin(true)} >Login</Button>{' '}
              <LoginPage
                show={login}
                onHide={() => setLogin(false)}
              />
              <Button variant="" style={{ backgroundColor: '#f05537', marginLeft: '10px', borderRadius: '50px', color: 'white', width: '82px' }} className='register-button' onClick={() => setSignUp(true)}>Register</Button>{' '}
              <SignupPage
                show={signin}
                onHide={() => setSignUp(false)}
              />
            </>
          ) : (
            <>

              <Navbar.Text className='google-fonts-nunito' style={{ color: "black" }}>
                {name}
              </Navbar.Text>

              <Button variant="" style={{ backgroundColor: '#f05537', marginLeft: '10px', borderRadius: '50px', color: 'white', width: '82px' }} className='register-button' onClick={handelLogout}>Logout</Button>
            </>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;