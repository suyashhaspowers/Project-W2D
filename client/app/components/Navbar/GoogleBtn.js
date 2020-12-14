import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {getFromStorage, setInStorage, deleteFromStorage} from '../utils/storage'
import { Redirect } from 'react-router-dom'

const CLIENT_ID = '87191282385-3k22vem13mmsb2so2h941qm5r1i4kp8e.apps.googleusercontent.com';


class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      token: '',
      redirectHome: false,
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('project-w2d');
    if (obj && obj.token) {
        // Verify the token to see if user is logged in
        const { token } = obj;
        fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                this.setState({
                    isLoggedIn: true,
                    token: token,
                });
                console.log("logged-in");
            }
        });
    }
    console.log("not-logged-in");
}

  login (response) {
    // Making API call to sign-in api. if user exists, session is created. If not, account is created and session is created.
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": response.profileObj.email,
            "googleId": response.googleId,
        }),
    }
    fetch('/api/account/signin', options)
    .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.success) {
                // Set the session token in storage and update state
                setInStorage('project-w2d', { token: json.token });
                this.setState(state => ({
                  isLoggedIn: true,
                  token: json.token,
                }));
            }
        });
  }

  logout (response) {
    // API call to logout api. Delete token from storage
    const obj = getFromStorage('project-w2d');
    if (obj && obj.token) {
      fetch('/api/account/logout?token=' + obj.token)
      .then (res => res.json())
      .then (json => {
        if (json.success) {
          deleteFromStorage('project-w2d');
        }
      });
    }
    this.setState(state => ({
        isLoggedIn: false,
        redirectHome: true,
        token: '',
    }));
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    console.log(this.state);

    let redirect;

    if (this.state.redirectHome) {
      redirect = (<Redirect to='/' />);
    }

    return (
    <div>
      { this.state.isLoggedIn ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
      {redirect}
    </div>
    )
  }
}

export default GoogleBtn;