import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
function Header() {
    return (
        <div>
        <Navbar bg="primary" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Students System</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link >
            <NavLink to="/student" className="rmv-link-style">
                Manage students
            </NavLink>
            </Nav.Link>
            
            <Nav.Link >
            <NavLink to="/quiz" className="rmv-link-style">
                Take Quiz
            </NavLink>
            </Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        </div>
    )
}

export default Header
