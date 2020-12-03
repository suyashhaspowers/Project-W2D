import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export default class TryNow extends Component {
    render() {
        return(
            <div id="try-now" className="bg-success">
                <Container>
                    <h2 className="text-center">Try Sample Playlists</h2>
                    <>
                    <Button variant="primary" size="lg" block>
                        Black Lives Matter Sample Playlist
                    </Button>
                    <Button variant="primary" size="lg" block>
                        Yemen Crisis Sample Playlist
                    </Button>
                    </>
                </Container>
            </div>
        );
    }
}