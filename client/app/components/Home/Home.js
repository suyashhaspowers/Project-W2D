import React, { Component } from 'react';
import FullNavbar from '../Navbar/Navbar'
import FullJumbotron from './Jumbotron'
import About from './About'
import Container from 'react-bootstrap/Container'
import TryNow from './TryNow'
import Footer from '../Footer/Footer'


class Home extends Component {

    // fetch('/api/counters')
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState({
    //       counters: json
    //     });
    //   });

    // fetch('/api/counters', { method: 'POST' })
    //   .then(res => res.json())
    //   .then(json => {
    //     let data = this.state.counters;
    //     data.push(json);

    //     this.setState({
    //       counters: data
    //     });
    //   });

    // fetch(`/api/counters/${id}/increment`, { method: 'PUT' })
    //   .then(res => res.json())
    //   .then(json => {
    //     this._modifyCounter(index, json);
    //   });

  render() {
    return (
      <div id="wrapper">
        <FullNavbar/>
        <FullJumbotron/>
        <About/>
        <Container><hr/></Container>
        <About/>
        <TryNow/>
        <Footer/>
      </div>
    );
  }
}

export default Home;
