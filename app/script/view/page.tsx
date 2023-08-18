"use client"

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
// import ScriptsContent from '../../components/ScriptsContent';
// import ScriptsContent from '../../components/ScriptContent';
import ScriptsContent from '../../components-dark-mode/ScriptContent';

// import UserInputModal from '../../components/UserInputModal';
import UserInputModal from '../../components-dark-mode/UserInputModal';


// navigate to this page after upload script is successful
export default function ViewScript() {

  return (
    <div>
      {/* <UserInputModal names={names}/>
      <ScriptsContent script={script}/> */}

      {/* actual script component with modal where user picks who they're reading for */}
      {/* for each script, create a new link (use a loop) */}
      {/* <Nav className="flex-column">
        <Nav.Item>
          <Button variant='primary' size="lg">+ Upload Script</Button>
        </Nav.Item>
        <Nav className="flex-column" variant='tabs'>
          <Nav.Link href="/home">Active</Nav.Link>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
          <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
        </Nav>
      </Nav> */}
      {/* <ScriptView /> */}
    </div>
  ) 
}