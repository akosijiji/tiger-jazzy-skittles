import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class UserProfilePage extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getById(id);
    }

    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                    </ol>
                </nav>
                <h2>User Profile</h2>
                { 
                    user && (
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
                        </form>
                    )
                }
            </div>
        );
    }
}

function mapState(state) {
    const { user } = state.users;
    return { user };
}

const actionCreators = {
    getById: userActions.getById
}

const connectedUserProfilePage = connect(mapState, actionCreators)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage };