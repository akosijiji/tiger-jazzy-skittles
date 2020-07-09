import React from 'react';
import { connect } from 'react-redux';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '',
                firstName: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).firstName : '',
                lastName: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).lastName : '',
                username: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username: '',
                password: '',
                email: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : '',
                twitter: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).twitter : '',
                github: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).github : '',
            },
        };
    }

    render() {
        const { user } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Profile</li>
                    </ol>
                </nav>
                <h2>My Profile</h2>
                <form name="form">
                    <div className={'form-group'}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} readOnly />
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} readOnly />
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username} readOnly />
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={user.email} readOnly />
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="github">Github</label>
                        <input type="text" className="form-control" name="github" value={user.github} readOnly />
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="twitter">Twitter</label>
                        <input type="text" className="form-control" name="twitter" value={user.twitter} readOnly />
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} readOnly />
                    </div>
                    <div className="form-group">
                        <a href="/edit-profile" className="btn btn-primary">Update Profile</a>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    return null;
}

const actionCreators = {}

const connectedProfilePage = connect(mapState, actionCreators)(ProfilePage);
export { connectedProfilePage as ProfilePage };