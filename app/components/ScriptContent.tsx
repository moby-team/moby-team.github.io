'use client'

import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ScriptLine from './ScriptLine';
import ScriptView from './ScriptView';
import { Lato } from 'next/font/google';

const ScriptsContent = ({ scriptTitle, script }) =>{

  const [open, setOpen] = useState(true);
  // const [scriptColumn, setScriptColumn] = useState();

//   const handleToggle = () => {
//     setOpen(!open);
//   }

    return (
        <>
            <Tab.Container defaultActiveKey="first">
                <Row style={{width:"100%"}}>
                    <Collapse in={open} dimension="width">
                        <Col style={{ borderRight: "1px solid #DDD", maxWidth: "360px"}}>
                        {/* <div className='py-5' style={{borderRight:"solid"}}> */}
                        <div className='py-5'>
                            <Button variant='outline-primary' size="lg" style={{ border: "2px solid #3D3D3D", width: "100%", borderRadius: "50px", padding: "16px", fontSize: "19px"}}>+ Upload Script</Button>
                        </div>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="first" style={{ backgroundColor: "rgba(255, 229, 209, 1)", color: "#3D3D3D", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "15px"}}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "15px" }}>
                                    <path d="M5.33203 18.3332H14.6654C15.7699 18.3332 16.6654 17.4377 16.6654 16.3332V7.58637C16.6654 7.00252 16.4102 6.44782 15.9669 6.06786L11.3938 2.14799C11.0313 1.83729 10.5696 1.6665 10.0922 1.6665H5.33203C4.22746 1.6665 3.33203 2.56193 3.33203 3.6665V16.3332C3.33203 17.4377 4.22746 18.3332 5.33203 18.3332Z" stroke="#3E3C3C" strokeLinejoin="round"/>
                                    <path d="M10.832 2.08301V4.66634C10.832 5.77091 11.7275 6.66634 12.832 6.66634H16.2487" stroke="#3E3C3C" strokeLinejoin="round"/>
                                    <path d="M5.83203 10H12.4987" stroke="#3E3C3C" strokeLinejoin="round"/>
                                    <path d="M5.83203 12.5H9.58203" stroke="#3E3C3C" strokeLinejoin="round"/>
                                    <path d="M5.83203 15H11.6654" stroke="#3E3C3C" strokeLinejoin="round"/>
                                </svg>
                                {scriptTitle}
                            </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                    </Collapse>
                    <Col sm={open ? 9 : 12}>
                        <Button variant="none" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                        { open ? (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="5.5" fill="white" stroke="#DDDDDD"/>
                            <path d="M24.332 9.3335L15.9987 16.0002L24.332 22.6668" stroke="#3E3C3C" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M16 9.3335L7.66667 16.0002L16 22.6668" stroke="#3E3C3C" strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                            ) : (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="31.5" y="31.5" width="31" height="31" rx="5.5" transform="rotate(-180 31.5 31.5)" fill="white" stroke="#DDDDDD"/>
                            <path d="M7.66797 22.6665L16.0013 15.9998L7.66797 9.33317" stroke="#3E3C3C" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M16 22.6665L24.3333 15.9998L16 9.33317" stroke="#3E3C3C" strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                            )
                        }
                        </Button>
                        <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <ScriptView script={script} />
                        </Tab.Pane>
                        {/* <Tab.Pane eventKey="second">Second tab content</Tab.Pane> */}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}

export default ScriptsContent;