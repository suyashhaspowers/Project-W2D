import React, { Component } from 'react';
import Media from 'react-bootstrap/Media'
import Container from 'react-bootstrap/Container'

export default class About extends Component {
    render() {
        return (
            <Container>
                <Media>
                    <img
                        width={300}
                        height={300}
                        className="mr-3"
                        src='../../../public/assets/img/logo.png'
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h2><u>About Us</u></h2>
                        <p>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                        Donec lacinia congue felis in faucibus.
                        </p>
                    </Media.Body>
                </Media>
            </Container>
        );
    }
}