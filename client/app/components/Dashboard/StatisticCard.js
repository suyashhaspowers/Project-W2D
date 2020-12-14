import React, { Component } from 'react';
import {Card} from 'react-bootstrap'

export default class StatisticCard extends Component {
    render() {
        return (
            <Card bg={this.props.type} text="white" className="mb-2" id="statCard">
            <Card.Header>{this.props.header}</Card.Header>
            <Card.Body>
                <Card.Text>
                <h2>{this.props.text}</h2>
                </Card.Text>
            </Card.Body>
            </Card>
        )
    }
}