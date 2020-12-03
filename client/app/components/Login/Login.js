import React, { Component } from 'react';
import Footer from '../Footer/Footer'
import FullNavbar from '../Navbar/Navbar'

export default class Login extends Component {
    render () {
        return (
            <div id="wrapper">
                <FullNavbar/>
                <Footer/>
            </div>
        );
    }
}