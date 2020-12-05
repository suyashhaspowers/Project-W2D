import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {getFromStorage} from '../utils/storage'
import GoogleBtn from './GoogleBtn'

export default class FullNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    }

    componentDidMount() {
        const token = getFromStorage('project-w2d');
        if (token) {
            // Verify the token to see if user is logged in
            fetch('/api/account/verify?token=' + token)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        loggedIn: true,
                    });
                }
            });
        }
    }

  render() {
    const { loggedIn } = this.state;

    let button_combination;

    if (loggedIn) {
        button_combination = (
            <div>
                <Button variant="primary">Get Started</Button>{'   '}
                <Button variant="danger">Log Out</Button>
            </div>
        );
    } else {
        button_combination = (
            <div>
                <Button variant="success">Login</Button>{'   '}
                <Button variant="info">Sign Up</Button>
            </div>
        );
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Nav className="mx-auto">
            <Navbar.Brand href="#home">Project-W2D</Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
            <GoogleBtn/>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
  }
}