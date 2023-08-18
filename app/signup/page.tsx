"use client"

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import MobyHomeNavbar from '../components/MobyHomeNavbar';
import MobyHomeNavbar from '../components-dark-mode/MobyHomeNavbar';
import { Google, Apple, Facebook, Envelope } from 'react-bootstrap-icons';
import Link from 'next/link';
import { poppinsBold, lato, latoBold } from '../fonts';


export default function SignUp() {

    return (
        <div style={{ width: '100vw'}}>
            <MobyHomeNavbar />
            <Container fluid className="p-0 m-0">
                <Row style={{ width: '100%', padding: 0, margin: 0}}>
                    <Col lg={6} xs={12} style={{ padding: 0, margin: 0}}>
                        <div 
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            height: "100vh",
                            backgroundColor: "#1F2123"
                        }}>
                        <div className="text-center" style={{ marginTop: '123px'}}>
                            <p className={poppinsBold.className} style={{fontSize:"32px", color: '#fff', lineHeight: '100%'}}><b>Sign Up</b></p>
                            <p className="text-center" style={{color: '#B8E2F0', fontSize: '16px', marginTop: '15px', marginBottom: '45px'}}>Create your free Moby account</p>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '284px', width: '427px', marginBottom: '38px'}}>
                                <Button
                                    className={"sign-up-btns"}
                                    variant="light"
                                    size="lg"
                                    href="/script/upload" // when do we go to log in page?
                                >
                                    {/* how to justify the icon to the left but the text in the middle of the rest */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M23.04 12.2613C23.04 11.4459 22.9668 10.6618 22.8309 9.90906H12V14.3575H18.1891C17.9225 15.795 17.1123 17.0129 15.8943 17.8284V20.7138H19.6109C21.7855 18.7118 23.04 15.7636 23.04 12.2613Z" fill="#4285F4"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.0034 23.4998C15.1084 23.4998 17.7116 22.47 19.6143 20.7137L15.8977 17.8282C14.8679 18.5182 13.5507 18.9259 12.0034 18.9259C9.00815 18.9259 6.47293 16.903 5.56861 14.1848H1.72656V17.1644C3.61884 20.9228 7.50793 23.4998 12.0034 23.4998Z" fill="#34A853"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.56523 14.1851C5.33523 13.4951 5.20455 12.7581 5.20455 12.0001C5.20455 11.2422 5.33523 10.5051 5.56523 9.81512V6.83557H1.72318C0.944318 8.38807 0.5 10.1444 0.5 12.0001C0.5 13.8558 0.944318 15.6122 1.72318 17.1647L5.56523 14.1851Z" fill="#FBBC05"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.0034 5.07386C13.6918 5.07386 15.2077 5.65409 16.3995 6.79364L19.6979 3.49523C17.7063 1.63955 15.1032 0.5 12.0034 0.5C7.50793 0.5 3.61884 3.07705 1.72656 6.83545L5.56861 9.815C6.47293 7.09682 9.00815 5.07386 12.0034 5.07386Z" fill="#EA4335"/>
                                    </svg>

                                    <span className={lato.className} style={{ paddingLeft: "70px"}}>Continue with Google</span>
                                </Button>
                                <Button
                                    className={"sign-up-btns"}
                                    variant="dark"
                                    size="lg"
                                    href="/script/upload" // when do we go to log in page?
                                    style={{ backgroundColor: '#000'}}
                                >
                                    <Apple width="24" height="24" viewBox="0 0 24 24"/>
                                    <span className={lato.className} style={{ paddingLeft: "70px"}}>Continue with Apple</span>
                                </Button>
                                <Button
                                    className={"sign-up-btns"}
                                    variant="primary"
                                    size="lg"
                                    href="/script/upload" // when do we go to log in page?
                                >
                                    <Facebook />
                                    <span className={lato.className} style={{ paddingLeft: "70px"}}>Continue with Facebook</span>
                                </Button>
                                <Button
                                    className={"sign-up-btns"}
                                    variant="light"
                                    size="lg"
                                    href="/script/upload" // when do we go to log in page?
                                >
                                    <Envelope />
                                    <span className={lato.className} style={{ paddingLeft: "70px"}}>Continue with Email</span>
                                </Button>
                            </div>
                        </div>
                            <h6 className={lato.className} style={{color: '#fff', fontSize: '16px'}}>Already have an account?&emsp; 
                            <Link href='/login' className={latoBold.className} style={{color: '#fff'}}>Login</Link>
                            </h6>
                        </div>
                    </Col>
                    <Col lg={6} xs={12} style={{ background: "#FB8847", margin: 0, padding: 0 }}>
                    </Col>
                </Row>
            </Container>
        </div>
    ) 
}