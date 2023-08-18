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
            <Container fluid className="home-container">
                <Row className={"hero"}>
                    <Col lg={6} xs={12}>
                        <Container className="p-1" style={{ height: '100%' }}>
                            <div className="mx-auto hero-content" style={{ paddingLeft: "12%"}}>
                                <h1 className={poppinsBold.className} style={{ lineHeight: '130%', letterSpacing: '2px', fontSize: '60px', color: '#fff'}}>AI Powered <br /> On Demand Script <br />Reading</h1>
                                <p className={poppins.className} style={{ marginTop: "75px"}}>Take control of your acting with Moby.</p>
                                <div>
                                <Button variant="primary" size="lg" href="/signup" className={"hero-cta"}>
                                    <span className={poppins.className}>Try Moby for Free</span>
                                </Button>
                                </div>
                            </div>
                        </Container>
                    </Col>
                    <Col lg={6} xs={12} className={"hero-image"}>
                        <Image
                            src="/hero-image.png"
                            width={606}
                            height={606}
                            alt="man with laptop"
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
                                <h2 className={poppinsBold.className} style={{ lineHeight: '150%', letterSpacing: '1px', fontSize: '40px'}}>Upload script</h2>
                                <p className={poppins.className} style={{ fontSize: '24px'}}>Moby will recognize any script <br />and upload it to begin practicing.</p>
                            </div>
                        </Container>
                    </Col>
                </Row>
                <Row className={"hero"}>
                    <Col lg={6} xs={12}>
                        <Container className="p-1" style={{ height: '100%' }}>
                            <div className="mx-auto hero-content" style={{ paddingLeft: "12%"}}>
                                <h2 className={poppinsBold.className} style={{ lineHeight: '150%', letterSpacing: '1px', fontSize: '40px'}}>Select reader</h2>
                                <p className={poppins.className} style={{ fontSize: '24px' }}>Choose who you’re reading as <br/> and Moby will read the other parts.</p>
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
                                <h2 className={poppinsBold.className} style={{ lineHeight: '150%', letterSpacing: '1px', fontSize: '40px'}}>Start practicing</h2>
                                <p className={poppins.className} style={{ fontSize: '24px'}}>Begin reading, or say “moby” to <br /> run lines on demand!</p>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container fluid className={"p-0 m-0"}style={{ width: '100vw', backgroundColor: '#FFE5D1' }}>
                <Row className={"footer"}>
                    <div className={"footer-content"}>
                        <h3 className={poppinsBold.className} style={{ letterSpacing: '1px', fontSize: '24px' }}>Sign up for <span>moby</span> updates</h3>
                        <p className={poppins.className} style={{ fontSize: '12px' }}>Stay updated on new features</p>
                        <input type="text" placeholder='Enter email' style={{ padding: '5px', borderRadius: '5px', border: '0.5px solid #000', width: '60%', margin: 'auto'}}/>
                        <Button variant="primary" size="lg" href="/" className={"footer-cta"}>
                            <span className={poppins.className} style={{ fontSize: '16px' }}>Subscribe</span>
                        </Button>
                    </div>
                </Row>
            </Container>
        </>
  )
}