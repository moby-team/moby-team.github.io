'use client'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';
import { poppinsBold, poppins } from '../fonts';

export default function LandingPageContent () {
    return (
        <>
            <Container fluid className="home-container-dark">
                <Row className={"hero"}>
                    <Col lg={7} xs={12}>
                        <Container className="p-1" style={{ height: '100%', width: '100%' }}>
                            <div className="mx-auto hero-content-dark" style={{ paddingLeft: "5%"}}>
                                <h1 className={poppinsBold.className} style={{ lineHeight: '130%', letterSpacing: '1px', fontSize: '56px', color: '#fff'}}>AI Powered <br /> On Demand Script <br />Reading</h1>
                                <p className={poppins.className} style={{color: '#B8E2F0', marginTop: "75px"}}>Take control of your acting with Moby.</p>
                                <div>
                                <Button variant="primary" size="lg" href="/signup" className={"hero-cta"}>
                                    <span className={poppins.className}>Try Moby for Free</span>
                                </Button>
                                </div>
                            </div>
                        </Container>
                    </Col>
                    <Col lg={5} xs={12} className={"hero-image"}>
                        <Image
                            src="/hero-image.png"
                            width={606}
                            height={606}
                            alt="man with laptop"
                            style={{ maxWidth: '606px', maxHeight: '606px', height: '606px'}}
                        />
                    </Col>
                </Row>
                <Row className={"hero"}>
                    <Col lg={7} xs={12} className={"hero-image block-1"}>
                        <Image
                            src="/Home.png"
                            width={350}
                            height={200}
                            alt="Screenshot of the account page"
                            style={{ border: "0.5px solid lightgray", boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)", borderRadius: "5px" }}
                        />
                    </Col>
                    <Col lg={5} xs={12}>
                        <Container className="p-1" style={{ height: '100%' }}>
                            <div className="mx-auto hero-content">
                                <h2 className={poppinsBold.className} style={{ lineHeight: '150%', letterSpacing: '1px', fontSize: '40px', color: '#fff'}}>Upload script</h2>
                                <p className={poppins.className} style={{color: '#B8E2F0', fontSize: '24px', marginTop: '23px'}}>Moby will recognize any script <br />and upload it to begin practicing.</p>
                            </div>
                        </Container>
                    </Col>
                </Row>
                <Row className={"hero"}>
                    <Col lg={6} xs={12}>
                        <Container className="p-1" style={{ height: '100%' }}>
                            <div className="mx-auto hero-content" style={{ paddingLeft: "12%"}}>
                                <h2 className={poppinsBold.className} style={{ lineHeight: '150%', letterSpacing: '1px', fontSize: '40px', color: '#fff'}}>Select reader</h2>
                                <p className={poppins.className} style={{color: '#B8E2F0', fontSize: '24px', marginTop: '23px'}}>Choose who you’re reading as <br/> and Moby will read the other parts.</p>
                            </div>
                        </Container>
                    </Col>
                    <Col lg={6} xs={12} className={"hero-image block-2"}>
                        <Image
                            src="/reader.png"
                            width={350}
                            height={200}
                            alt="Screenshot of the account page"
                        />
                    </Col>
                </Row>
                <Row className={"hero"}>
                    <Col lg={6} xs={12} className={"hero-image block-3"}>
                        <span className={'movie-icon'}role="img" aria-label="movie">🎬</span>
                    </Col>
                    <Col lg={6} xs={12}>
                        <Container className="p-1" style={{ height: '100%' }}>
                            <div className="mx-auto hero-content">
                                <h2 className={poppinsBold.className} style={{ lineHeight: '150%', letterSpacing: '1px', fontSize: '40px', color: '#fff'}}>Start practicing</h2>
                                <p className={poppins.className} style={{color: '#B8E2F0', fontSize: '24px', marginTop: '23px'}}>Begin reading, or say “moby” to <br /> run lines on demand!</p>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container fluid className={"p-0 m-0"}style={{ width: '100vw' }}>
                <Row className={"footer-dark"}>
                    <div className={"footer-content"}>
                        <h3 className={poppinsBold.className} style={{ letterSpacing: '1px', color: '#fff', fontSize: '40px' }}>Sign up for <span style={{color: '#B8E2F0'}}>moby</span> updates</h3>
                        <p className={poppins.className} style={{ fontSize: '12px', color: '#fff', marginTop: '24px', marginBottom: '27px' }}>Stay updated on new features</p>
                        <input type="text" placeholder='Enter email' style={{ padding: '5px', borderRadius: '5px', border: '0.5px solid #000', width: '300px', height: '44px', margin: 'auto'}}/>
                        <Button variant="primary" size="lg" href="/" className={"footer-cta"}>
                            <span className={poppins.className} style={{ fontSize: '16px', color: '#fff' }}>Subscribe</span>
                        </Button>
                    </div>
                </Row>
            </Container>
        </>
  )
}