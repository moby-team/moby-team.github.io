'use client'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { lato } from '../fonts';

export default function MobyNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container fluid className="moby-nav-dark">
        <Navbar.Brand href="/">
        <svg width="141" height="50" viewBox="0 0 141 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.864 19.696C30.36 19.696 32.34 20.452 33.804 21.964C35.292 23.476 36.036 25.576 36.036 28.264V40H29.916V29.092C29.916 27.796 29.568 26.8 28.872 26.104C28.2 25.384 27.264 25.024 26.064 25.024C24.864 25.024 23.916 25.384 23.22 26.104C22.548 26.8 22.212 27.796 22.212 29.092V40H16.092V29.092C16.092 27.796 15.744 26.8 15.048 26.104C14.376 25.384 13.44 25.024 12.24 25.024C11.04 25.024 10.092 25.384 9.396 26.104C8.724 26.8 8.388 27.796 8.388 29.092V40H2.232V19.912H8.388V22.432C9.012 21.592 9.828 20.932 10.836 20.452C11.844 19.948 12.984 19.696 14.256 19.696C15.768 19.696 17.112 20.02 18.288 20.668C19.488 21.316 20.424 22.24 21.096 23.44C21.792 22.336 22.74 21.436 23.94 20.74C25.14 20.044 26.448 19.696 27.864 19.696ZM49.4854 40.288C47.5174 40.288 45.7414 39.868 44.1574 39.028C42.5974 38.188 41.3614 36.988 40.4494 35.428C39.5614 33.868 39.1174 32.044 39.1174 29.956C39.1174 27.892 39.5734 26.08 40.4854 24.52C41.3974 22.936 42.6454 21.724 44.2294 20.884C45.8134 20.044 47.5894 19.624 49.5574 19.624C51.5254 19.624 53.3014 20.044 54.8854 20.884C56.4694 21.724 57.7174 22.936 58.6294 24.52C59.5414 26.08 59.9974 27.892 59.9974 29.956C59.9974 32.02 59.5294 33.844 58.5934 35.428C57.6814 36.988 56.4214 38.188 54.8134 39.028C53.2294 39.868 51.4534 40.288 49.4854 40.288ZM49.4854 34.96C50.6614 34.96 51.6574 34.528 52.4734 33.664C53.3134 32.8 53.7334 31.564 53.7334 29.956C53.7334 28.348 53.3254 27.112 52.5094 26.248C51.7174 25.384 50.7334 24.952 49.5574 24.952C48.3574 24.952 47.3614 25.384 46.5694 26.248C45.7774 27.088 45.3814 28.324 45.3814 29.956C45.3814 31.564 45.7654 32.8 46.5334 33.664C47.3254 34.528 48.3094 34.96 49.4854 34.96ZM69.4193 22.756C69.9953 21.82 70.8233 21.064 71.9033 20.488C72.9833 19.912 74.2193 19.624 75.6113 19.624C77.2673 19.624 78.7673 20.044 80.1113 20.884C81.4553 21.724 82.5113 22.924 83.2793 24.484C84.0713 26.044 84.4673 27.856 84.4673 29.92C84.4673 31.984 84.0713 33.808 83.2793 35.392C82.5113 36.952 81.4553 38.164 80.1113 39.028C78.7673 39.868 77.2673 40.288 75.6113 40.288C74.1953 40.288 72.9593 40.012 71.9033 39.46C70.8473 38.884 70.0193 38.128 69.4193 37.192V40H63.2633V13.36H69.4193V22.756ZM78.2033 29.92C78.2033 28.384 77.7713 27.184 76.9073 26.32C76.0673 25.432 75.0233 24.988 73.7753 24.988C72.5513 24.988 71.5073 25.432 70.6433 26.32C69.8033 27.208 69.3833 28.42 69.3833 29.956C69.3833 31.492 69.8033 32.704 70.6433 33.592C71.5073 34.48 72.5513 34.924 73.7753 34.924C74.9993 34.924 76.0433 34.48 76.9073 33.592C77.7713 32.68 78.2033 31.456 78.2033 29.92ZM108.217 19.912L95.6168 49.54H88.9928L93.6008 39.316L85.4288 19.912H92.3048L96.9488 32.476L101.557 19.912H108.217Z" fill="#B8E2F0"/>
        </svg>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav style={{ justifyContent: "center", alignItems: "center", display: "flex"}}>
            <Nav.Link href="#deets" className={lato.className} style={{color:"#B8E2F0"}}>Upgrade</Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes"> 
              
            </Nav.Link> */}
            <Button variant="none" style={{color:"#B8E2F0"}}>
              J (account)
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}