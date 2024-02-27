import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import SignupPage from './Signup';
import LoginPage from './Login';
function Footer() {
    const [login, setLogin] = useState(false);
    const [signin, setSignUp] = useState(false);
    return (
        <div className="" style={{ backgroundColor: '#190a28', color: 'white' }} >
            <footer className="text-center text-lg-start text-white" style={{ color: 'white' }}>
                <section className="p-2"></section>
                <section className="" style={{ color: 'white' }}>
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">ProHire</h6>
                                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', height: '2px' }} />
                                <p>
                                    Explore career opportunities, streamline recruitment, and foster professional growth on our dynamic Job Portal.
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Portal</h6>
                                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', height: '2px' }} />
                                <p>
                                    <Link href="/aboutus" className="text-white" style={{ textDecoration: 'none' }}>About Us</Link>
                                </p>
                                <p>
                                    <Link href="" className="text-white" style={{ textDecoration: 'none' }} onClick={() => setLogin(true)}>Login</Link>
                                    <LoginPage
                                        show={login}
                                        onHide={() => setLogin(false)}
                                    />
                                </p>
                                <p>
                                    <Link href="" className="text-white" style={{ textDecoration: 'none' }} onClick={() => setSignUp(true)}>Signup</Link>
                                    <SignupPage
                                        show={signin}
                                        onHide={() => setSignUp(false)}
                                    />
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Useful links</h6>
                                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    <Link href="/alljobs" className="text-white" style={{ textDecoration: 'none' }}>All Jobs</Link>
                                </p>
                                <p>
                                    <Link href="/SignupForHire" className="text-white" style={{ textDecoration: 'none' }}>Hire candidates</Link>
                                </p>
                                <p>
                                    <Link href="/" className="text-white" style={{ textDecoration: 'none' }}>Home</Link>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold">Contact</h6>
                                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                                <p><i className="fas fa-envelope mr-3"></i> pparmeet2003@gmail.com</p>
                                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        </div>
    )
}

export default Footer
