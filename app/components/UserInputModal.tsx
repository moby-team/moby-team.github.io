'use client'

import { useEffect, useState } from 'react';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CharacterNames from "./CharacterNames";

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
    console.log(scriptTitle);
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
            <Modal.Header closeButton>
                <Button variant="none" size="lg" onClick={handleClose}>
                    <ArrowLeftCircle />
                </Button>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            size="lg"
                            type="scriptTitle"
                            placeholder={scriptTitle} // grab the title from the script and put here
                            autoFocus
                            style={{ color: "#3E3C3C"}}
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
                        }}>
                            Who are you reading as?
                        </Form.Label>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%"}}>
                            <CharacterNames listOfNames={scriptDialogue} chooseCharacter={chooseCharacter}/>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button variant="primary" size="lg" onClick={handleClose} style={{ width: "84px", height: "51px", borderRadius: "25px", fontSize: "16px"}}>Start</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default UserInputModal;