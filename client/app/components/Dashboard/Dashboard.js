import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {Container, Spinner, CardDeck} from 'react-bootstrap'
import FullNavbar from '../Navbar/Navbar'
import {getFromStorage} from '../utils/storage'
import StatisticCard from './StatisticCard'
import Footer from '../Footer/Footer'


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            user: '',
            loggedInAttempt: false,
            loggedIn: false,
            userDataLoaded: false,
            playlistDataLoaded: false,
            totalDonations: 0,
            totalPlaylists: 0,
        }
    }

    componentDidMount() {
        const obj = getFromStorage('project-w2d');
        if (obj) {
            const {token} = obj;
            // Verify the token to see if user is logged in
            fetch('/api/account/verify?token=' + token)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    const totalDonations = json.user.totalDonations;
                    const totalPlaylists = json.user.playlists.length;
                    this.setState({
                        loggedIn: true,
                        token: token,
                        loggedInAttempt: true,
                        user: json.user,
                        totalDonations: totalDonations,
                        totalPlaylists: totalPlaylists,
                        userDataLoaded: true,
                    });
                } 
                else {
                    this.setState({
                        loggedInAttempt: true,
                    });
                }
            });
        } else {
            this.setState({
                loggedInAttempt: true,
            });
        }
    }


    render() {

        let dashboardStats;
        let playlistList;

        console.log(this.state)

        if (this.state.loggedIn) {
            if (this.state.userDataLoaded) {
                dashboardStats = (
                    <div id="statCardDeck" className="text-center">
                        <CardDeck>
                            <StatisticCard type="primary" header="Total Donations" text={this.state.totalDonations}/>
                            <StatisticCard type="success" header="Total Playlists" text={this.state.totalPlaylists}/>
                        </CardDeck>
                    </div>
                )
            } else {
                dashboardStats = (
                    <div id="loading" className="text-center">
                        <Spinner animation="border" />
                    </div>
                );
            }

            if (this.state.playlistDataLoaded) {
                // Add playlist cards
            } else {
                playlistList = (
                    <div id="loading" className="text-center">
                        <Spinner animation="border" />
                    </div>
                );
            }
        } 
        
        if(!this.state.loggedIn && this.state.loggedInAttempt) {
            return  <Redirect to='/' />
        }

        return (
        <div id="wrapper">
            <FullNavbar/>
                <Container>
                    {dashboardStats}
                    <hr/>
                    {playlistList}
                </Container>
            <Footer/>
        </div>
        );
    }
}

export default Dashboard;
