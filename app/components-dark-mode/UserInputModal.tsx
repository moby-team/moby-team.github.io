'use client'

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CharacterNames from "./CharacterNames";
import { lato } from '../fonts';

// we want to surface this once the script has been loaded but character not yet chosen

const UserInputModal = ({ scriptTitle, scriptDialogue, chooseCharacter, showScript }) => {
  
  const [show, setShow] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (scriptDialogue && scriptDialogue.length > 0) {
        setShow(true);
    }
  }, [show])

  const handleClose = () => { 
    setShow(false); 
    showScript(true);
}

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
//       <Modal.Header closeButton>
//         <Button variant="none" size="lg" onClick={handleClose}>
//           <ArrowLeftCircle />
//         </Button>
//       </Modal.Header>
//       <Modal.Body 
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//       }}>
//         <Form>
//           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Control
//               size="lg"
//               type="scriptTitle"
//               placeholder="need to pass down the script title and put here" // grab the title from the script and put here
//               autoFocus
//             />
//           </Form.Group>
//           <p 
//             className="pb-5"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//           }}>
//             script authors?
//           </p>
//           <Form.Group className=" pt-5 pb-3" controlId="exampleForm.ControlTextarea1">
//             <Form.Label style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               }}>
//                 Who are you reading as?
//             </Form.Label>
//             <DropdownButton 
//               id="dropdown-basic-button" 
//               variant="light"
//               title="Choose a character"
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}>
//               {/* <CharacterNames listOfNames={names} /> */}
//               <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//               <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//               <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//             </DropdownButton>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer 
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//       }}>
//         <Button variant="primary" size="lg" onClick={handleClose}>Start</Button>
//       </Modal.Footer>
//     </Modal>
//   )

  return (
    <>
        <Modal 
            show={show}
            size="lg"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >   
            <Modal.Header closeButton style={{borderBottom:"none", backgroundColor:"#3E3E43"}}>
                <Button variant="none" size="lg" onClick={handleClose}>
                    <ArrowLeft style={{ color: "#fff"}} />
                </Button>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor:"#3E3E43", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "0" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            size="lg"
                            type="scriptTitle"
                            value={scriptTitle.substring(0, scriptTitle.lastIndexOf('.'))} // grab the title from the script and put here
                            autoFocus
                            style={{ textAlign: "center", color: "#fff", backgroundColor:"#1F2123", border:"none", fontSize: "24px"}}
                            readOnly
                        />
                    </Form.Group>
                        {/* <p 
                            className="pb-5"
                            style={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            Script Authors
                        </p> */}
                    <Form.Group className=" pt-5 pb-3" controlId="exampleForm.ControlTextarea1" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <Form.Label style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white"
                        }}>
                            <span className={lato.className} style={{ fontSize: '16px'}}>Who are you reading as?</span>
                        </Form.Label>
                        <div style={{ border:"none", display: "flex", justifyContent: "center", width: "100%"}}>
                            <CharacterNames listOfNames={scriptDialogue} chooseCharacter={chooseCharacter}/>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ borderTop:"none", backgroundColor:"#3E3E43", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "0" }}>
                <Button size="lg" onClick={() => handleClose()} style={{ width: "87px", height: "50px", borderRadius: "5px", fontSize: "18px", backgroundColor: "#EC5500", border: "none"}}><span className={lato.className}>Start</span></Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default UserInputModal;