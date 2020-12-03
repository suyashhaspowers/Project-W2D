import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

export default class FullJumbotron extends Component {
    render() {
        return (
            <Jumbotron id="jumbotron" className="text-center">
                <h1>Support Social Charities</h1>
                <p>
                    From the comforts of your home and for free.
                </p>
                <p>
                    <Button variant="success">Get Started</Button>
                </p>
            </Jumbotron>
        );
    }
}