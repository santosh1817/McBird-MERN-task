import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  // tokens are sending to server
  componentDidMount() {
    axios
      .get('http://localhost:3005/users/account', {
        headers: {
          'x-auth': localStorage.getItem('token')
        }
      })
      .then(response => {
        const user = response.data;
        this.setState({ user });
      });
  }

  render() {
    return (
      <div>
        <h2>Welcome {this.state.user.username}</h2>
        <h3>Email-{this.state.user.email}</h3>
        <h3>First Name-{this.state.user.firstName}</h3>
        <h3>Last Name-{this.state.user.lastName}</h3>
        <h3>Phone Number-{this.state.user.phoneNumber}</h3>
        <br />

        <Link to={`/users/edit/${this.state.user._id}`}>
          <button>
            <h1>edit user details</h1>
          </button>{' '}
        </Link>
      </div>
    );
  }
}
export default Account;
