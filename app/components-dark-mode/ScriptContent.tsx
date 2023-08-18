'use client'

import { FC, useState } from 'react';

import { Col, Row, Container } from 'react-bootstrap';

// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Collapse from 'react-bootstrap/Collapse';
// import Nav from 'react-bootstrap/Nav';
// import Row from 'react-bootstrap/Row';
// import Tab from 'react-bootstrap/Tab';
import ScriptLine from './ScriptLine';
import ScriptView from './ScriptView';
import ScriptSideBar from './ScriptSideBar';
import { latoBold } from '../fonts';

const ScriptsContent = ({ scriptTitle, script, clickStart }) =>{

  const [open, setOpen] = useState(true);
  // const [scriptColumn, setScriptColumn] = useState();

//   const handleToggle = () => {
//     setOpen(!open);
//   }

    // return (
    //     <>
    //         <Tab.Container defaultActiveKey="first">
    //             <Row style={{width:"100%", height: "100vh"}}>
    //                 <Collapse in={open} dimension="width">
    //                     <Col style={{ borderRight: "1px solid #3E3E43", maxWidth: "25%", padding: "0 3px 0 3px "}}>
    //                     {/* <div className='py-5' style={{borderRight:"solid"}}> */}
    //                     <div className='py-5' style={{ textAlign: "center" }}>
    //                         <Button variant='none' size="lg" style={{ border: "2px solid #D65600", borderRadius: "5px", width: "171px", height: "50px", fontSize: "18px", color:"#fff", backgroundColor: "#3E3E43"}}>+ <span className={latoBold.className}>Upload Script</span></Button>
    //                     </div>
    //                     <Nav variant="pills" className="flex-column">
    //                         <Nav.Item>
    //                         <Nav.Link eventKey="first" style={{ backgroundColor: "#3E3E43", color: "#fff", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "13px 0 12px 0", borderRadius: "0px"}}>
    //                             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                                 <path d="M5.33203 18.3337H14.6654C15.7699 18.3337 16.6654 17.4382 16.6654 16.3337V7.58686C16.6654 7.00301 16.4102 6.44831 15.9669 6.06835L11.3938 2.14848C11.0313 1.83778 10.5696 1.66699 10.0922 1.66699H5.33203C4.22746 1.66699 3.33203 2.56242 3.33203 3.66699V16.3337C3.33203 17.4382 4.22746 18.3337 5.33203 18.3337Z" stroke="white" stroke-linejoin="round"/>
    //                                 <path d="M10.832 2.08398V4.66732C10.832 5.77189 11.7275 6.66732 12.832 6.66732H16.2487" stroke="white" stroke-linejoin="round"/>
    //                                 <path d="M5.83203 10H12.4987" stroke="white" stroke-linejoin="round"/>
    //                                 <path d="M5.83203 12.5H9.58203" stroke="white" stroke-linejoin="round"/>
    //                                 <path d="M5.83203 15H11.6654" stroke="white" stroke-linejoin="round"/>
    //                             </svg>
    //                             {scriptTitle}
    //                         </Nav.Link>
    //                         </Nav.Item>
    //                     </Nav>
    //                     </Col>
    //                 </Collapse>
    //                 <Col sm={open ? 9 : 12} >
    //                     <Button variant="none" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
    //                     { open ? (
    //                         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                         <rect x="0.5" y="0.5" width="31" height="31" rx="5.5" fill="#3E3E43"/>
    //                         <path d="M24.332 9.3335L15.9987 16.0002L24.332 22.6668" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    //                         <path d="M16 9.3335L7.66667 16.0002L16 22.6668" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    //                         </svg>
    //                         ) : (
    //                         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                         <rect x="31.5" y="31.5" width="31" height="31" rx="5.5" transform="rotate(-180 31.5 31.5)" fill="#3E3E43"/>
    //                         <path d="M7.66797 22.6665L16.0013 15.9998L7.66797 9.33317" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    //                         <path d="M16 22.6665L24.3333 15.9998L16 9.33317" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    //                         </svg>
    //                         )
    //                     }
    //                     </Button>
    //                     {/* <Tab.Content >
    //                     <Tab.Pane eventKey="first"> */}
    //                     <div style={{ height: "100vh" }}>
    //                         <ScriptView script={script} />
    //                     </div>
    //                     {/* </Tab.Pane> */}
    //                     {/* <Tab.Pane eventKey="second">Second tab content</Tab.Pane> */}
    //                     {/* </Tab.Content> */}
    //                 </Col>
    //             </Row>
    //         </Tab.Container>
    //     </>
    // );


    return (
        <div style={{ height: "100vh", width: "100vw"}}>
            <Container style={{ maxWidth: "100vw", padding: "0"}}>
                <Row style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Col sm={2} style={{ borderRight: "0.5px solid #3E3E43", width: "224px", paddingRight: "5px"}}>
                        <ScriptSideBar scriptTitle={scriptTitle}/>
                    </Col>    
                    <Col sm={9} style={{ height: "100vh", width: "80%"}}>
                        <ScriptView script={script} clickStart={clickStart}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ScriptsContent;