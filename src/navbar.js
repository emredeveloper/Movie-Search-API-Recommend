// MyNavbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './MyNavbar.css'; // Import your custom CSS file

const MyNavbar = () => {
    return (
        <Navbar className="navbar-dark bg-primary" expand="lg">
            <div className="mx-auto">

            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link href="/" className="text-light">Ana Sayfa</Nav.Link>
                    <Nav.Link href="../portfoy/portfoy.html" className="text-light">Portföyüm</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;




