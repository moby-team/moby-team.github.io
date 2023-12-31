"use client"

import Link from 'next/link';
import { Apple, Facebook } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import MobyHomeNavbar from '../components/MobyHomeNavbar';
import MobyHomeNavbar from '../components-dark-mode/MobyHomeNavbar';
import { lato, poppinsBold } from '../fonts';

// SHOULD BE ALMOST IDENTICAL TO SIGN UP PAGE
// might need https://github.com/MomenSherif/react-oauth which has ability to sign in with google
export default function Login() {

  return (
    <div>
      <MobyHomeNavbar />
      <Container fluid className="p-0 m-0">
      <Row>
        <Col lg={6} xs={12}>
        <div 
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "90vh",
                backgroundColor: "#1F2123"
            }}>
              <div className="d-grid gap-3 text-center">
                <text className={poppinsBold.className} style={{fontSize:"40pt", color: '#B8E2F0'}}><b>Log In</b></text>
                <p></p>
                <Button
                variant="light"
                size="lg"
                href="/script/upload"
                className={lato.className}
                style={{fontSize:"20pt"}}
              >
                {/* how to justify the icon to the left but the text in the middle of the rest */}
                {/* also prob need to change this to a diff image because when you hover, it shows icon in square */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.04 12.2615C23.04 11.446 22.9668 10.6619 22.8309 9.90918H12V14.3576H18.1891C17.9225 15.7951 17.1123 17.013 15.8943 17.8285V20.714H19.6109C21.7855 18.7119 23.04 15.7637 23.04 12.2615Z" fill="#4285F4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9995 23.4998C15.1045 23.4998 17.7077 22.47 19.6104 20.7137L15.8938 17.8282C14.864 18.5182 13.5467 18.9259 11.9995 18.9259C9.00425 18.9259 6.46902 16.903 5.5647 14.1848H1.72266V17.1644C3.61493 20.9228 7.50402 23.4998 11.9995 23.4998Z" fill="#34A853"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.56523 14.185C5.33523 13.495 5.20455 12.7579 5.20455 12C5.20455 11.242 5.33523 10.505 5.56523 9.81499V6.83545H1.72318C0.944318 8.38795 0.5 10.1443 0.5 12C0.5 13.8557 0.944318 15.612 1.72318 17.1645L5.56523 14.185Z" fill="#FBBC05"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9995 5.07386C13.6879 5.07386 15.2038 5.65409 16.3956 6.79364L19.694 3.49523C17.7024 1.63955 15.0992 0.5 11.9995 0.5C7.50402 0.5 3.61493 3.07705 1.72266 6.83545L5.5647 9.815C6.46902 7.09682 9.00425 5.07386 11.9995 5.07386Z" fill="#EA4335"/>
                </svg>
                &emsp;
                Continue with Google
              </Button>
              <Button
                variant="dark"
                size="lg"
                href="/script/upload"
                className={lato.className}
                style={{fontSize:"20pt"}}
              >
                <Apple/>&emsp;
                Continue with Apple
              </Button>
              <Button
                variant="primary"
                size="lg"
                href="/script/upload"
                className={lato.className}
                style={{fontSize:"20pt"}}
              >
                <Facebook />&emsp;
                Continue with Facebook
              </Button>
              <p className="text-center my-auto">or</p>
              <Form>
                <Form.Group className="mb-3 px-2" controlId="formBasicEmail">
                  {/* <Form.Label>Email address</Form.Label> */}
                  <Form.Control type="email" placeholder="Email" className={lato.className} style={{fontSize:"20pt", color: "#3E3C3C", backgroundColor:"#2B2B2B", }}/>
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3 px-2" controlId="formBasicPassword">
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Control type="password" placeholder="Password" className={lato.className} style={{fontSize:"20pt", color: "#3E3C3C", backgroundColor:"#2B2B2B", }}/>
                </Form.Group>
                {/* <Form.Group className="mb-3 px-2" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree to the terms and conditions."
                    />
                </Form.Group> */}
              </Form>
                    </div>
              <h6 className={lato.className} style={{fontSize:"16pt", color: '#B8E2F0'}}>Don't have an account?&emsp;
              <Link href='/signup'>Sign Up</Link>
                {/* <Button
                  variant="link"
                  size="lg"
                  className="text-center"
                  href="/signup" // when do we go to log in page?
                >
                  Sign Up
                </Button> */}
              </h6>
            </div>
          </Col>
          <Col lg={6} xs={12} style={{ background: "#B8E2F0", opacity:"0.3"}}>
          </Col>
        </Row>
      </Container>
    </div>
  ) 
}