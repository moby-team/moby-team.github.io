
import React, { useState } from "react";
import { Nav, Button, Collapse } from "react-bootstrap";
import { latoBold } from "../fonts";

const ScriptSideBar = ({ scriptTitle }) => {
    const [open, setOpen] = useState(true);

    const title = scriptTitle.includes("Risk-Management") ? "Risk-Management" : "White-Room";

    let sidebarClass = open ? "sidebar open" : "sidebar";
    let sideBtnClass = open ? "sideBtn open" : "sideBtn" 

    return (
        <div style={{ padding: "0" }} className={sidebarClass}>
            <Nav style={{ top: "0", bottom: "0", left: "0", minHeight: "100vh", padding: "48px 0 0", zIndex: "100", display: "flex", flexDirection: "column", alignItems: "center"}}
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >   
                        {/* <div className="sidebar-sticky"></div>
                    <Nav.Item>
                        <Nav.Link href="/home">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                            Disabled
                        </Nav.Link>
                    </Nav.Item> */}
                    {/* <div style={{ textAlign: "center" }}> */}
                <Button variant="" className={sideBtnClass} onClick={() => setOpen(!open)}>
                    { open ? (
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="5.5" fill="#3E3E43"/>
                            <path d="M24.332 9.3335L15.9987 16.0002L24.332 22.6668" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M16 9.3335L7.66667 16.0002L16 22.6668" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                        </svg> ) : 
                        (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <rect x="31.5" y="31.5" width="31" height="31" rx="5.5" transform="rotate(-180 31.5 31.5)" fill="#3E3E43"/>
                                <path d="M7.66797 22.6665L16.0013 15.9998L7.66797 9.33317" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path d="M16 22.6665L24.3333 15.9998L16 9.33317" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                    )}
                </Button>
                <Button variant='none' size="lg" style={{ border: "2px solid #D65600", borderRadius: "5px", width: "171px", height: "50px", fontSize: "18px", color:"#fff", backgroundColor: "#3E3E43"}}>+ <span className={latoBold.className}>Upload Script</span></Button>
                {/* </div> */}
                <Nav.Item style={{ backgroundColor: "#3E3E43", color: "#fff", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", padding: "13px 0 12px 5px", borderRadius: "0px", marginTop: "36px", fontSize: "16px", textAlign: "center", width: "100%" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33203 18.3337H14.6654C15.7699 18.3337 16.6654 17.4382 16.6654 16.3337V7.58686C16.6654 7.00301 16.4102 6.44831 15.9669 6.06835L11.3938 2.14848C11.0313 1.83778 10.5696 1.66699 10.0922 1.66699H5.33203C4.22746 1.66699 3.33203 2.56242 3.33203 3.66699V16.3337C3.33203 17.4382 4.22746 18.3337 5.33203 18.3337Z" stroke="white" strokeLinejoin="round"/>
                        <path d="M10.832 2.08398V4.66732C10.832 5.77189 11.7275 6.66732 12.832 6.66732H16.2487" stroke="white" strokeLinejoin="round"/>
                        <path d="M5.83203 10H12.4987" stroke="white" strokeLinejoin="round"/>
                        <path d="M5.83203 12.5H9.58203" stroke="white" strokeLinejoin="round"/>
                        <path d="M5.83203 15H11.6654" stroke="white" strokeLinejoin="round"/>
                    </svg>
                        {title}
                </Nav.Item>
        </Nav>
    </div>
    )
}

export default ScriptSideBar;